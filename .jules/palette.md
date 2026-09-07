## 2026-09-07 - Icon-Only Action Buttons Accessibility Pattern in Static POS Interface
**Learning:** Icon-only buttons in dense Point-of-Sale interfaces (such as cart controls, mobile drawer toggles, and bill draft list triggers) lack text labels and are unannounced for screen readers unless explicitly marked with `aria-label` and `title` attributes.
**Action:** Always pair icon-only controls in dynamic/static POS HTML views with concise, descriptive `aria-label` and matching `title` attributes to ensure keyboard accessibility and hover context for screen reader and pointer users.
