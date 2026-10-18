# Palette's Journal - RM. Pondok Marisa POS

## 2025-02-23 - Accessibility Audit on POS Buttons
**Learning:** Icon-only buttons in the main POS interface (`kasir.html`) lacked `aria-label` and `title` attributes, leaving screen reader users without context for key actions such as clearing cart, opening drawer, or adjusting line item quantities.
**Action:** Always inspect icon-only control buttons in interactive POS interfaces and add clear Indonesian `aria-label` and `title` attributes.
