## 2025-02-18 - Accessibility for POS Icon Buttons
**Learning:** Icon-only buttons in vanilla POS interfaces (e.g. cart clear, modal close, quantity adjusters) lack default accessible names, hindering screen reader users and keyboard navigation. Adding concise `aria-label` and `title` attributes improves accessibility without changing the visual layout.
**Action:** Always inspect icon-only `<button>` elements in static POS templates and annotate them with `aria-label` and descriptive `title` attributes.
