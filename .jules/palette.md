# Palette's Journal - Critical Learnings

## 2025-10-24 - Accessibility Enhancements for Icon-Only Buttons in POS Interface
**Learning:** Icon-only buttons (such as cart clearing, mobile drawer toggles, and modal close buttons) without ARIA labels prevent screen readers from announcing button functions to visually impaired users.
**Action:** Always provide explicit `aria-label` and `title` attributes on icon-only interactive controls.
