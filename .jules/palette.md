## 2025-05-10 - Accessible Icon Buttons and Focus Visible Ring Indicators
**Learning:** In static HTML POS apps using icon-only buttons (such as cart clearing, modal closing, or table action buttons), adding clear `aria-label` and `title` attributes alongside `focus-visible:ring-2` provides screen reader support and visible keyboard focus without disrupting visual styling.
**Action:** Always complement icon-only interactive controls with both `aria-label` (for screen readers) and `title` (for native hover tooltips) plus focus-visible utility classes.
