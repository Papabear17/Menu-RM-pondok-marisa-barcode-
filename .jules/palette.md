# Palette's Journal - Critical Learnings

## 2025-05-18 - Accessible Icon-Only Buttons in POS Tables
**Learning:** Icon-only action buttons in tabular interfaces (e.g. edit/delete product buttons) lack text context for screen reader users and tooltip context for mouse users. Adding explicit `aria-label` and `title` attributes improves accessibility and clarity.
**Action:** Always include both `aria-label` and `title` on icon-only buttons in table rows and modals.
