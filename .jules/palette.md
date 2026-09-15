## 2025-09-15 - Icon-only Buttons Accessibility
**Learning:** Icon-only buttons across the POS interface lacked accessible ARIA labels and title tooltips, hindering screen reader navigation and touch tooltip support.
**Action:** Always add explicit `aria-label` and `title` attributes to icon-only buttons, ensuring dynamic content uses `escapeAttr()`.
