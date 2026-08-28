## 2025-08-28 - Icon-Only Table Action Buttons Accessibility
**Learning:** Icon-only action buttons in HTML table lists (like edit/delete icons) lack accessible names for screen readers unless `aria-label` is dynamically supplied with specific context (e.g., `aria-label="Edit Menu ${escapeAttr(p.nama)}"`). Adding matching `title` attributes also provides useful native hover tooltips for mouse users.
**Action:** Always inspect icon-only buttons in table templates and add contextual `aria-label` and `title` attributes using safe attribute escaping.
