# Palette's Journal - Critical UX Learnings

## 2025-05-18 - Modal Dismissibility & Keyboard Navigation in Fast-Paced POS Interfaces
**Learning:** In fast-paced POS touch/keyboard environments, modal dialogues like product variation pickers (`#modalVarian`) must always provide clear, multi-modal dismissibility (explicit close button, backdrop click, and Escape key handling). Without dismissibility, accidental taps or clicks on variant-configured products lock the cashier into selecting and adding a variation to the cart before they can proceed. Furthermore, adding accessible ARIA labels to icon-only control buttons ensures screen reader interoperability without altering compact visual touch targets.
**Action:** When designing or auditing modal dialogs and icon controls in POS workflows, always ensure Escape key dismissal, backdrop dismissal, explicit cancel/close buttons with `aria-label`, and keep keyboard focus flow intuitive.
