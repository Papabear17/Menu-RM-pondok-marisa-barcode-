## 2025-09-24 - Dynamic Accessible Labels in POS Product Tables
**Learning:** Dynamic table action buttons rendered via JavaScript `innerHTML` require dynamic interpolation of item names into `aria-label` (e.g., `aria-label="Edit menu ${escapeAttr(p.nama)}"`) rather than static labels to ensure screen reader users can distinguish actions across multiple table rows.
**Action:** Always include item context (e.g., item name) in `aria-label` for repeated table row actions.
