# Palette's Journal - RM. Pondok Marisa POS UX & Accessibility Learnings

## 2025-05-20 - Icon-Only Table Action Buttons
**Learning:** Icon-only action buttons inside dynamic tables (such as edit and delete buttons in `produk.html`) lack text labels for screen readers and default focus rings for keyboard navigation. Adding specific ARIA labels with entity names (e.g., `aria-label="Edit menu Ayam Bakar"`) and visible focus ring styles (`focus-visible:ring-2`) significantly improves screen reader clarity and keyboard accessibility without changing UI layout.
**Action:** Always include `aria-label` with item context and `focus-visible:ring-2` styles when creating or modifying icon-only action buttons.
