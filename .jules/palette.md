# Palette's Journal - RM. Pondok Marisa POS

## 2025-10-07 - Icon-Only Action Buttons in Data Tables
**Learning:** Icon-only buttons used for item actions (edit/delete) and modal controls in table views lack accessible names (`aria-label`), making them inaccessible to screen reader users.
**Action:** Always include dynamic `aria-label`s reflecting the specific item name for table row actions and clear labels for modal triggers/close buttons.
