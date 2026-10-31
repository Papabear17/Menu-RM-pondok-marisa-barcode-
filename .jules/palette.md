# Palette's Journal - Critical UX Learnings

## 2025-05-14 - POS Cash Payment Quick Denominations
**Learning:** Cashier interfaces in high-throughput restaurant POS environments experience significant input friction when requiring manual keyboard entry for cash tendered amounts. Providing quick-denomination chips (exact amount and common bill sizes like 10k, 20k, 50k, 100k) directly beneath the cash input with `aria-label`s reduces checkout steps to a single tap, eliminates numerical typo risks, and ensures immediate visual feedback on calculated change.
**Action:** In payment/checkout modals, always offer one-tap exact amount ("Uang Pas") and standard denomination chips alongside manual numeric input.
