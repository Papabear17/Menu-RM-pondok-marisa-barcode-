## 2025-05-18 - Accessible Icon Buttons in POS Interface
**Learning:** Icon-only buttons used in POS touch interfaces (such as mobile drawer toggles, modal close buttons, cart quantity modifiers, and action triggers) often lack text labels and require `aria-label` and `title` attributes for screen reader accessibility and mouse hover hints.
**Action:** Always verify all icon-only `<button>` elements have explicit `aria-label` and `title` attributes across HTML pages and dynamically generated template strings.
