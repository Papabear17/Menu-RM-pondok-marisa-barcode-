# Palette's Journal - Critical UX & Accessibility Learnings

## 2025-08-13 - [POS Accessibility & Micro-UX]
**Learning:** Screen readers and keyboard users struggle to navigate dynamic SPA/static-hybrid POS applications when buttons are icon-only without proper ARIA labels, or when dynamic inputs lack semantic text connections (like labels without `for` attributes).
**Action:** Always provide explicit, translated `aria-label` and `title` attributes on all icon-only buttons, descriptive tags for inputs, and explicit `id` to `for` relationships to elevate the POS merchant experience.
