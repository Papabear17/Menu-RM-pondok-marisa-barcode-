# Palette's Journal - Critical Learnings Only

## 2026-06-14 - Destructive Cart Actions on POS Touchscreens
**Learning:** In fast-paced Point of Sale (POS) environments, destructive actions like clearing an active order cart must never be triggered by an accidental single tap or click on an unlabelled icon button. Separating manual user clear triggers (`clearCartPrompt`) from automated lifecycle resets (`clearCart` upon checkout or saving draft) prevents catastrophic order loss while preserving seamless automated checkout flow.
**Action:** When adding confirmation dialogs or alerts to transactional interfaces, verify that automated transaction completions (e.g., checkout/print/save) continue calling programmatic resets without interrupting the user flow with unnecessary confirmation prompts.
