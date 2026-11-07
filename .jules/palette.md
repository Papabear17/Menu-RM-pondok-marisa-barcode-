# Palette's Journal - Critical Learnings

## 2026-11-07 - Accessible Modal Dismissal Pattern for POS Overlays
**Learning:** In keyboard- and quick-touch-driven POS systems (such as `kasir.html`), product selection modals without an explicit cancel/close button or `Escape` key listener trap users into completing a selection or reloading the page if clicked unintentionally. Adding `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, an accessible close button (`aria-label`), backdrop dismissal, and a global `Escape` key handler ensures standard a11y compliance and fluid cashier workflows without altering core cart logic.
**Action:** Whenever adding or inspecting modals in this POS suite, ensure the modal has proper dialog ARIA roles, an explicit close button with `aria-label`, click-outside dismiss on backdrop, and registers with the top-level Escape key dismiss handler.
