# Palette Agent Journal - UX & Accessibility Learnings

## 2025-10-17 - Icon-Only Buttons in Data Tables & Modals
**Learning:** Icon-only action buttons (edit, delete, toggle sidebar, close modal) without text or `aria-label` are inaccessible to screen reader users and lack tooltips for keyboard/mouse users.
**Action:** Always provide explicit `aria-label` and `title` attributes on icon-only interactive elements across POS management pages.
