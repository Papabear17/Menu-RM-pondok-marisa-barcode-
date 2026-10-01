## 2025-05-18 - Accessibility for Tailwind Static Icon Buttons
**Learning:** Icon-only buttons in Tailwind CSS web apps frequently lack explicit `aria-label` attributes and focus-visible keyboard ring indicators, making keyboard navigation and screen reader usage ambiguous.
**Action:** Always add descriptive `aria-label` attributes and standard Tailwind keyboard focus styling (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`) on icon-only interactive controls.
