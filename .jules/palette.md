## 2025-10-22 - Explicit ARIA Labels for Icon-Only POS Action Buttons
**Learning:** Icon-heavy POS interfaces using Tailwind SVG icons without inner text are completely unreadable for screen readers. Adding `aria-label` attributes to action buttons (sidebar toggle, mobile cart, draft modal close) and `for` / `aria-label` associations on form inputs ensures seamless assistive technology support without altering visual CSS layout.
**Action:** Always audit icon-only `<button>` tags and unlabeled inputs when reviewing static Tailwind views for screen reader accessibility.
