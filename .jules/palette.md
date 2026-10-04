## 2026-10-04 - ARIA Labels for Dynamic Table Action Icons
**Learning:** Dynamic table rows rendered with template literals often miss accessible labels for icon-only action buttons. Escaping item properties (e.g. `escapeAttr(p.nama)`) when constructing `aria-label` string values ensures both accessibility and safety against injection.
**Action:** Always include item context in dynamic row action button `aria-label` attributes using proper HTML attribute escaping.
