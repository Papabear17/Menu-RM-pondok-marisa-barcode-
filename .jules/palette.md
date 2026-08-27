## 2025-08-27 - [Icon-Only Buttons & Input ARIA Labels]
**Learning:** Icon-only buttons (like modal close icons, table edit/delete actions) and standalone search inputs in POS admin pages lack screen reader context. Using `aria-label` with existing string escaping helpers (like `escapeAttr`) ensures accessible screen reader announcements without breaking template literal execution.
**Action:** Always check icon-only interactive controls across POS admin modals and tables for missing `aria-label`s, ensuring string interpolation uses confirmed in-scope helper functions.
