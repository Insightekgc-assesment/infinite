## Plan

### Information gathered
- Existing `components/navbar.html` + `assets/stylesheet/navbar.css` + `assets/script/navbar.js` use Bootstrap-conflicting class/ids (e.g., `navbar`, `nav-link`, `dropdown`, `dropdown-menu`, `overlay`, `close-btn`, `mobile-menu`, `sidebar`).
- `index.html` now includes Bootstrap CSS globally, so these generic class names are breaking layout/dropdown styles.

### Update plan (file-level)
1. **components/navbar.html**
   - Rewrite markup to contain **only** unique `ii-` prefixed classes/ids.
   - Implement desktop dropdown triggers (hover via JS) and mobile accordion (click via JS).
   - Provide sticky top wrapper + CTA “Get Featured”.
   - Keep accessibility attributes (`aria-label`, `aria-expanded`, `role=menu`).

2. **assets/stylesheet/navbar.css**
   - Replace with new CSS implementing:
     - Premium dark glassmorphism sidebar
     - Green brand color `#3F6745`
     - Hover underline animation on links
     - Animated hamburger
     - Animated sliding mobile sidebar / full-screen on mobile
     - Responsive breakpoints: 1200/992/768/576/380
     - Scroll effect class (e.g. `ii-nav--scrolled`)

3. **assets/script/navbar.js**
   - Replace with new vanilla JS:
     - Scroll effect toggle
     - Desktop dropdown open/close on mouse enter/leave
     - Mobile accordion open/close (only one at a time)
     - Sidebar open/close with overlay + ESC
     - Ensure it binds even when HTML is injected after fetch.

4. **Safety checks**
   - Ensure component uses no Bootstrap-conflicting strings: `navbar`, `nav-link`, `dropdown`, `dropdown-menu`, `overlay`, `container`, `btn`, `active`, etc.
   - Ensure JS selectors match the new ids/classes.

### Followup steps
- Reload `index.html` and verify:
  - Desktop: dropdown opens on hover.
  - Mobile: accordion expands/collapses.
  - Close button has white icon only (no bg/border) per earlier requirement.
- If Bootstrap still affects layout unexpectedly, further namespace any remaining selectors.
