# Palette Journal - RM. Pondok Marisa POS

## 2025-05-10 - Dynamic ARIA Labels for Table Action Buttons
**Learning:** Icon-only buttons inside dynamic table rows (like Edit/Delete product buttons) present severe accessibility barriers for screen reader users unless labeled with item-specific contexts.
**Action:** Always include item context in `aria-label` and `title` attributes when rendering dynamic row actions (e.g., `aria-label="Edit menu ${nama}"`).
