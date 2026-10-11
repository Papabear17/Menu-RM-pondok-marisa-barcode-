## 2026-10-11 - Variant Modal Dismissibility & ARIA Labels in POS Interface
**Learning:** In modal overlays that require selection before proceeding (such as product variant pickers), omitting a explicit Cancel/Dismiss button forces cashiers into an unwanted workflow state if opened accidentally.
**Action:** Always provide a clear, accessible "Batal" or close button for modal dialogs and ensure icon-only buttons include descriptive `aria-label` attributes.
