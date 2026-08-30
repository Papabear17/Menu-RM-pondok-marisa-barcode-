## 2025-05-18 - Missing ARIA Labels on Dynamic Table Action & Modal Close Buttons
**Learning:** Icon-only action buttons rendered dynamically (e.g. edit/delete buttons in data tables) and static modal close buttons often lack accessible labels, rendering them unannounced or opaque to screen readers. Adding descriptive `aria-label` attributes (with dynamic item context where applicable) ensures assistive technologies provide clear action feedback.
**Action:** Always audit icon-only buttons in table templates and modal headers across HTML files to include descriptive `aria-label` attributes.
