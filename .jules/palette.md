## 2025-05-18 - Accessibility on Icon-Only Buttons
**Learning:** Icon-only buttons without inner text (such as cart toggles, quantity increment/decrement, and modal close buttons) need clear `aria-label` and `title` attributes so screen readers and mouse hover users have immediate feedback on the button's action.
**Action:** Always inspect icon-only `<button>` tags in static HTML pages and add descriptive `aria-label` and `title` attributes.
