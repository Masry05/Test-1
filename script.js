document.addEventListener('DOMContentLoaded', () => {
    const allPagesCheckbox = document.getElementById('all-pages');
    const pageCheckboxes = document.querySelectorAll('.page-checkbox');
    const rows = document.querySelectorAll('.row');

    // Helper to update the 'All pages' checkbox state based on children
    function updateAllPagesState() {
        const allChecked = Array.from(pageCheckboxes).every(cb => cb.checked);
        const someChecked = Array.from(pageCheckboxes).some(cb => cb.checked);

        allPagesCheckbox.checked = allChecked;

        // Optional: formatting for indeterminate state if desired, but not strictly in image
        // allPagesCheckbox.indeterminate = someChecked && !allChecked;
    }

    // "All Pages" click handler
    allPagesCheckbox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        pageCheckboxes.forEach(cb => {
            cb.checked = isChecked;
        });
    });

    // Individual pages click handler
    pageCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            updateAllPagesState();
        });
    });

    // Row click handler to toggle checkbox when clicking the text/row area
    rows.forEach(row => {
        row.addEventListener('click', (e) => {
            // Prevent triggering twice if clicking:
            // 1. Directly on the checkbox (native behavior)
            // 2. On the label (native behavior via 'for' attribute)
            const target = e.target;
            if (target.type === 'checkbox' || target.className === 'checkmark' || target.tagName === 'LABEL') {
                return;
            }

            const checkbox = row.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                // Dispatch change event manually since setting .checked doesn't trigger it
                checkbox.dispatchEvent(new Event('change'));
            }
        });
    });
});
