## 2025-05-18 - Icon-Only Buttons Accessibility in Static Templates
**Learning:** Icon-only buttons rendered dynamically (e.g. edit/delete product or category rows) or statically in modals lack default screen-reader text. Injecting `aria-label` with dynamic context (e.g. `escapeAttr(p.nama)`) and native `title` attributes improves both screen reader accessibility and desktop hover tooltips.
**Action:** Always ensure icon-only buttons include descriptive `aria-label` and `title` attributes with properly escaped dynamic values.
