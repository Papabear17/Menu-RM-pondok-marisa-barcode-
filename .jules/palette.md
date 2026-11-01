# Palette's Journal - Critical UX Learnings

## 2026-11-01 - Transaction History Modal Accessibility & Escape Dismissal
**Learning:** In transaction history/reporting tables, opening transaction details in an overlay without `role="dialog"` or `aria-labelledby` leaves assistive technologies unaware of the context switch. Furthermore, lack of backdrop click dismissal and `Escape` key listening traps keyboard-focused users inside the modal.
**Action:** When creating modal views for table record inspection, always bind `Escape` keydown listeners, implement backdrop dismissal, and configure `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` linked to the modal title.
