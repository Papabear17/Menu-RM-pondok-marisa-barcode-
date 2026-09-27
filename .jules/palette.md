# Palette Journal - RM. Pondok Marisa POS

## 2025-05-18 - Missing ARIA Labels in Dynamic Tables and Icon Buttons
**Learning:** In static HTML POS apps using dynamic JS templating (e.g., `produk.html`), table action buttons (edit, delete) and modal header close buttons frequently lack ARIA labels and title tooltips, hindering screen reader navigation and sight-assisted hover discovery.
**Action:** Always inspect JS template strings producing action buttons and ensure `aria-label` and `title` attributes are embedded with escaped dynamic properties (e.g. `p.nama`).
