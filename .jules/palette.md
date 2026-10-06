## 2026-10-06 - Accessible Icon Buttons in POS Tables
**Learning:** In vanilla HTML/JS POS interfaces, dynamic table action buttons (edit/delete) and header icon buttons often lack text labels, making them inaccessible to screen readers. Adding `aria-label` attributes with dynamic entity context (e.g., product names) improves accessibility without altering layout styling.
**Action:** Always include entity-specific `aria-label` attributes when rendering dynamic icon buttons in tables or list views.
