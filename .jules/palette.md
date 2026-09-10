# Palette's Journal - UX & Accessibility Learnings

## 2025-05-18 - Accessibility on Icon-Only Buttons
**Learning:** Icon-only action buttons (edit, delete, modal close) in table rows and modals are unannounced for screen reader users and lack tooltips for sighted mouse users.
**Action:** Always add explicit `aria-label` and `title` attributes to all icon-only buttons across the POS UI.
