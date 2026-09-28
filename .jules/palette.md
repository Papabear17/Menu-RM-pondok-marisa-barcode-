## 2025-09-28 - Icon-only Buttons Accessibility in Data Tables & Modals
**Learning:** In static HTML/Tailwind web apps with dynamic tables, icon-only action buttons (such as edit, delete, close) lack accessible text for screen readers unless explicitly annotated with `aria-label` and `title`. Using dynamic names in aria-labels (e.g. `Edit Menu ${p.nama}`) provides clear contextual feedback.
**Action:** Always include descriptive `aria-label` and `title` attributes on all icon-only buttons in table rows and modals.
