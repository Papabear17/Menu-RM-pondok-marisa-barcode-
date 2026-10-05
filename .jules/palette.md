## 2025-05-20 - Dynamic Cart Accessibility in POS Template Strings
**Learning:** In this vanilla JS POS application, cart line items are dynamically re-rendered via `renderCart()`. For icon-only buttons (like quantity `+`/`-`) and note inputs inside dynamic lists, `aria-label` attributes must be embedded into JavaScript template literals using escaped item context (e.g. `${escapeAttr(c.nama)}`) so screen readers provide contextual item information.
**Action:** Always embed context-aware `aria-label`s directly in dynamic JS template rendering functions when working with list-item actions.
