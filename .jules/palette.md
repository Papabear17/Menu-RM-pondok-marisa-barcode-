## 2025-02-25 - Icon-only ARIA Labels & Empty States in POS Grid
**Learning:** Icon-only control buttons (e.g. mobile toggles, close modal, clear cart) lacked screen reader labels, and filtering/searching menu items rendered an unhelpful blank area when no results matched.
**Action:** Always provide descriptive `aria-label` attributes on icon-only buttons and implement clean empty state UI components in data grids when search or category filters return zero items.
