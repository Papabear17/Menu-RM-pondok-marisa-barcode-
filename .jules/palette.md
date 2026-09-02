## 2026-09-02 - Icon-only button accessibility in vanilla HTML views
**Learning:** Icon-only buttons in vanilla HTML templates without proper `aria-label` or `title` attributes prevent screen readers from announcing button context and leave desktop users without visual hover cues.
**Action:** Always ensure icon-only buttons include descriptive `aria-label` and `title` attributes, utilizing dynamic variables (e.g. `${escapeAttr(p.nama)}`) where applicable.
