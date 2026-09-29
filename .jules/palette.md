## 2026-09-29 - Accessible ARIA Labels for Icon Buttons in POS Admin Views
**Learning:** Icon-only buttons (such as sidebar toggle, modal close buttons, cart action buttons, and edit/delete table actions) lack accessible labels by default, rendering them invisible to screen reader users.
**Action:** Always inspect icon-only `<button>` elements across views and add explicit, descriptive `aria-label` attributes to ensure full screen reader accessibility.
