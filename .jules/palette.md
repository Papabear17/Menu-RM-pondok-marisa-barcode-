## 2026-06-14 - Mobile Tailwind Viewport & Accessibility Verification
**Learning:** Icon-only mobile elements (e.g. `lg:hidden`) remain hidden in default desktop Playwright viewports, causing `wait_for_selector` timeouts. Setting explicit mobile viewport dimensions (`viewport={'width': 375, 'height': 812}`) ensures proper element visibility and accessibility verification.
**Action:** Always set an appropriate viewport size in Playwright scripts when inspecting or testing responsive elements.
