## 2026-10-13 - Icon-only Buttons Missing Accessibility Labels
**Learning:** Icon-only SVG buttons in this static POS app lack both `aria-label` and `title` attributes, making them inaccessible to screen readers and lacking desktop hover hints.
**Action:** Always provide paired `aria-label` and `title` attributes for icon-only action buttons across POS views while preserving CRLF line endings in HTML files.
