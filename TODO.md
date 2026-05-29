# TODO - Fix leadership page (Infinite Icons)

- [x] 1) Replace conflicting leadership CSS block(s) in `assets/stylesheet/style.css` with a single consistent implementation that matches `leadership.html` classes.

  - Ensure `.grain`, `.reveal` and IntersectionObserver work.
  - Define missing classes: `.hero-side`, `.stat`, `.vision-block`, `.quote-card`, `.quote`, `.quote-footer`, `.checklist`, `.check`, `.btn-row`, `.cat`, `.emoji`, `.name`, `.sub`.
  - Fix luxury theme: `.hero-wrap` and cards must not be plain white.
  - Ensure variables come from `assets/stylesheet/master.css` (no need to duplicate).

- [ ] 2) Verify `leadership.html` has only one `#footer-placeholder` and that grain markup exists.
- [ ] 3) Ensure navbar/footer fetch paths work in the deployed context (keep relative `components/*`).
- [ ] 4) Manual check: open `leadership.html` and scroll to confirm `.reveal` animations trigger.

