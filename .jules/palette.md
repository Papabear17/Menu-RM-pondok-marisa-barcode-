## 2026-08-10 - [Visual and Audio Accessibility Enhancements in RM. Pondok Marisa Digital Menu]
**Learning:** Replaced `style="display:none;"` with an `.sr-only` class on custom radio buttons. This restores keyboard navigation and screen-reader accessibility for customers without altering the visual design of custom labels/chips. Added focused-visible rings and explicit ARIA labels on dynamic icon-only button components.
**Action:** Always favor `.sr-only` instead of hiding native controls via `display: none` when designing customized semantic/custom interactive controls.
