# CSS Customization & Testing Guide

## Part 1: CSS Customization Snippets

### 1. Change Primary Color (Navy Blue)

**Current in `master.css`:**
```css
:root {
  --primary: #051D49;
}
```

**Try these alternatives:**

**Option A: Deeper Navy**
```css
--primary: #0a1628;
```

**Option B: Slate Blue**
```css
--primary: #1e3a5f;
```

**Option C: Charcoal**
```css
--primary: #2c3e50;
```

---

### 2. Change Gold Accent Color

**Current in `master.css`:**
```css
--gold-solid: #d4af37;
```

**Try these alternatives:**

**Option A: Warmer Gold**
```css
--gold-solid: #c9a961;
```

**Option B: Copper Accent**
```css
--gold-solid: #b8860b;
```

**Option C: Rose Gold**
```css
--gold-solid: #d4a574;
```

**Option D: Brighter Gold**
```css
--gold-solid: #ffd700;
```

---

### 3. Adjust Card Border Radius

**Current in `editorial-premium.css`:**
```css
.story-card {
  border-radius: 12px;
}

@media (min-width: 768px) {
  .story-card {
    border-radius: 16px;
  }
}
```

**More rounded (softer feel):**
```css
.story-card {
  border-radius: 20px;
}

@media (min-width: 768px) {
  .story-card {
    border-radius: 24px;
  }
}
```

**Less rounded (modern edge):**
```css
.story-card {
  border-radius: 8px;
}

@media (min-width: 768px) {
  .story-card {
    border-radius: 12px;
  }
}
```

**Square (bold):**
```css
.story-card {
  border-radius: 0;
}
```

---

### 4. Adjust Heading Font Sizes

**Make headlines larger:**
```css
h1 { font-size: clamp(2.2rem, 7vw, 4rem); }
h2 { font-size: clamp(2rem, 5.5vw, 3.5rem); }
h3 { font-size: clamp(1.5rem, 4.5vw, 2.5rem); }
```

**Make headlines smaller (compact):**
```css
h1 { font-size: clamp(1.8rem, 5vw, 3rem); }
h2 { font-size: clamp(1.5rem, 4vw, 2.5rem); }
h3 { font-size: clamp(1.2rem, 3vw, 1.8rem); }
```

---

### 5. Adjust Paragraph Line Height (for readability)

**Current (generous):**
```css
body {
  line-height: 1.75;
}

p {
  line-height: 1.9;
}
```

**More spacious (luxury feel):**
```css
body {
  line-height: 1.85;
}

p {
  line-height: 2;
}
```

**More compact (efficient):**
```css
body {
  line-height: 1.6;
}

p {
  line-height: 1.75;
}
```

---

### 6. Change Card Gap (Spacing Between Cards)

**Current:**
```css
.editorial-grid {
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .editorial-grid {
    gap: 2rem;
  }
}

@media (min-width: 1024px) {
  .editorial-grid {
    gap: 2.5rem;
  }
}
```

**Tighter (compact grid):**
```css
.editorial-grid {
  gap: 1rem;
}

@media (min-width: 640px) {
  .editorial-grid {
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .editorial-grid {
    gap: 2rem;
  }
}
```

**Looser (spacious grid):**
```css
.editorial-grid {
  gap: 2rem;
}

@media (min-width: 640px) {
  .editorial-grid {
    gap: 3rem;
  }
}

@media (min-width: 1024px) {
  .editorial-grid {
    gap: 4rem;
  }
}
```

---

### 7. Change Button Styling

**Current:**
```css
.btn-read {
  background: #d4af37;
  color: #051d49;
}

.btn-read:hover {
  background: #b8860b;
}
```

**Outline style:**
```css
.btn-read {
  background: transparent;
  color: #d4af37;
  border: 2px solid #d4af37;
}

.btn-read:hover {
  background: #d4af37;
  color: #051d49;
}
```

**Darker style:**
```css
.btn-read {
  background: #051d49;
  color: #ffffff;
}

.btn-read:hover {
  background: #0a2540;
  color: #d4af37;
}
```

**Minimal style:**
```css
.btn-read {
  background: transparent;
  color: #051d49;
  border-bottom: 2px solid #d4af37;
  border-radius: 0;
}

.btn-read:hover {
  color: #d4af37;
}
```

---

### 8. Change Hero Image Overlay Opacity

**Current (medium darkness):**
```css
.hero-overlay {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.4)
  );
}
```

**Darker (more text contrast):**
```css
.hero-overlay {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.6)
  );
}
```

**Lighter (more image visible):**
```css
.hero-overlay {
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.25)
  );
}
```

---

### 9. Change Base Font Size

**Current (optimized for readability):**
```css
body {
  font-size: 16px;
}

@media (min-width: 768px) {
  body {
    font-size: 17px;
  }
}
```

**Larger (very accessible):**
```css
body {
  font-size: 17px;
}

@media (min-width: 768px) {
  body {
    font-size: 18px;
  }
}
```

**Smaller (compact):**
```css
body {
  font-size: 15px;
}

@media (min-width: 768px) {
  body {
    font-size: 16px;
  }
}
```

---

### 10. Add Custom Font (Google Fonts)

**Add to `<head>` in both HTML files, BEFORE `editorial-premium.css`:**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Merriweather:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
```

**Then add to `master.css` `:root` section:**

```css
:root {
  --font-display: 'Poppins', system-ui, sans-serif;  /* Headings */
  --font-body: 'Merriweather', Georgia, serif;        /* Body text */
}
```

**Update `editorial-premium.css` (around line 20):**

```css
body {
  font-family: var(--font-body);
  font-size: 16px;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  line-height: 1.2;
}
```

---

## Part 2: Detailed Testing Guide

### Desktop Testing Checklist

#### 1. Responsive Breakpoints

Test at each breakpoint with browser DevTools:

```
Width: 1920px
├─ [ ] Cards display in 3 columns
├─ [ ] Sticky sidebar on detail page
├─ [ ] Large typography is readable
├─ [ ] No overflow or horizontal scroll
└─ [ ] Buttons are easily clickable

Width: 1280px
├─ [ ] Cards display in 3 columns
├─ [ ] Detail layout still optimal
├─ [ ] All text readable
└─ [ ] Images load correctly

Width: 1024px
├─ [ ] Cards display in 2-3 columns
├─ [ ] Sidebar becomes sticky
├─ [ ] Hero section proportional
└─ [ ] No text cutoff

Width: 768px
├─ [ ] Cards display in 2 columns
├─ [ ] Detail page stacks vertically
├─ [ ] Hero text is sized appropriately
├─ [ ] Touch targets are 44px+
└─ [ ] Gap between cards is visible

Width: 640px
├─ [ ] Grid still shows 2 columns
├─ [ ] Image aspect ratio is 4:5
├─ [ ] Hero image fits viewport
└─ [ ] Text is not cramped

Width: 480px
├─ [ ] Cards are single column
├─ [ ] Hero text is large but readable
├─ [ ] Pagination is touch-friendly
└─ [ ] No overflow on any screen

Width: 320px (iPhone SE)
├─ [ ] All content visible
├─ [ ] Text at 16px is readable
├─ [ ] Cards are full-width
├─ [ ] No horizontal scroll
├─ [ ] Buttons are easy to tap
└─ [ ] Images load correctly
```

#### 2. Typography Testing

```
[ ] H1 sizing (hero section)
    - 320px: 2rem minimum
    - 768px: 3-3.5rem
    - 1920px: Fills space well
    
[ ] H2 sizing (collection title)
    - Scales proportionally at all sizes
    - Never too small to read
    - Never breaks awkwardly
    
[ ] Paragraph text (base font)
    - 16px on mobile
    - 17px on desktop
    - Line-height 1.75-1.95
    - No text overflow
    
[ ] Card text (founder name, headline)
    - Scales smoothly
    - Never cuts off mid-word
    - Remains visible on all backgrounds
```

#### 3. Color & Contrast Testing

```
[ ] Text on light backgrounds
    - Use WebAIM contrast checker
    - Navy on white: 12:1 ratio (AAA)
    
[ ] Text on images (overlays)
    - Hero text is readable
    - High enough contrast
    - Use WAVE tool to verify
    
[ ] Gold accents
    - Visible on white
    - Visible on navy
    - Not too bright on mobile
    
[ ] Card overlays
    - Gradient is visible
    - Text contrasts well
    - No text-on-transparent issues
```

#### 4. Interactive Elements Testing

```
[ ] Links & buttons
    - All are at least 44px tall
    - Hover states are visible
    - Focus states show golden outline
    
[ ] Pagination
    - Previous/Next buttons work
    - Page number buttons work
    - Active page is highlighted
    - Disabled states are clear
    
[ ] Cards
    - Hover effect works (lift/shadow)
    - "Read story" link is clickable
    - Links navigate correctly
    - Links open in same tab
```

#### 5. Image Testing

```
[ ] Hero image (article listing)
    - Loads without distortion
    - Aspect ratio is 4:5
    - Object-position works (center 25%)
    - No layout shift
    
[ ] Card backgrounds
    - All visible at all sizes
    - Aspect ratio 4:5
    - Gradient overlay is visible
    - Text is readable over image
    
[ ] Detail image
    - Loads properly
    - Full height on mobile
    - Sticky on desktop
    - Media caption visible
    
[ ] Fallback images
    - Placeholder works if real images fail
    - Color is visible
    - Dimensions are correct
```

---

### Mobile Testing Checklist

#### iOS (iPhone)

```
Safari on iPhone 12/13/14/15:
├─ [ ] Page loads quickly
├─ [ ] Hero image displays fully
├─ [ ] Cards stack vertically
├─ [ ] Can scroll smoothly
├─ [ ] Buttons are easy to tap
├─ [ ] Text is readable (no pinch-zoom needed)
├─ [ ] Images load without lag
├─ [ ] Detail page scrolls smoothly
├─ [ ] Sticky sidebar doesn't stick (on mobile)
├─ [ ] Links don't open weird previews
└─ [ ] Back button works correctly

Landscape mode:
├─ [ ] Content still visible
├─ [ ] No horizontal scroll
├─ [ ] Hero image adjusts
├─ [ ] Cards display properly
└─ [ ] Navigation is accessible
```

#### Android

```
Chrome/Firefox on Android (Pixel 4a, 6, etc):
├─ [ ] Page loads quickly
├─ [ ] Hero image displays fully
├─ [ ] Cards stack vertically
├─ [ ] Can scroll smoothly
├─ [ ] Buttons are easy to tap
├─ [ ] Text is readable
├─ [ ] Images load without lag
├─ [ ] Detail page scrolls smoothly
├─ [ ] Sticky sidebar doesn't stick
├─ [ ] Links work correctly
└─ [ ] Back button works correctly

Landscape mode:
├─ [ ] Content visible
├─ [ ] No horizontal scroll
├─ [ ] Images adjust properly
├─ [ ] Cards display properly
└─ [ ] Navigation works
```

---

### Performance Testing

#### Google PageSpeed Insights
```
Mobile:
├─ [ ] First Contentful Paint < 3s
├─ [ ] Largest Contentful Paint < 4s
├─ [ ] Cumulative Layout Shift < 0.1
├─ [ ] Overall score > 80
└─ [ ] No warnings or errors

Desktop:
├─ [ ] First Contentful Paint < 2s
├─ [ ] Largest Contentful Paint < 2.5s
├─ [ ] Cumulative Layout Shift < 0.1
├─ [ ] Overall score > 90
└─ [ ] No warnings or errors
```

#### WebPageTest (WPT)
```
Mobile Test:
├─ [ ] Fully Loaded < 6s
├─ [ ] Speed Index < 4s
├─ [ ] Time to Interactive < 5s
└─ [ ] Total Image Bytes < 500KB

Desktop Test:
├─ [ ] Fully Loaded < 4s
├─ [ ] Speed Index < 2.5s
├─ [ ] Time to Interactive < 3s
└─ [ ] Total Image Bytes < 300KB
```

---

### Accessibility Testing

#### Keyboard Navigation
```
[ ] Tab through all elements
    - Order makes sense
    - Focus is always visible
    - No keyboard traps
    
[ ] Links
    - Tab to each link
    - Link text is clear
    - Enter opens link
    
[ ] Buttons
    - Tab to each button
    - Spacebar/Enter activates
    - Action is clear
    
[ ] Form fields (if any)
    - Labels are associated
    - Inputs are clearly labeled
    - Tab order is logical
```

#### Screen Reader Testing (NVDA, JAWS, VoiceOver)

```
Page Structure:
[ ] Main landmark is found
[ ] Navigation landmarks exist
[ ] Content landmarks clear
[ ] Page title announced

Links:
[ ] All link text is descriptive
[ ] Links announce destination
[ ] No "click here" links
[ ] Link purpose is clear

Images:
[ ] All images have alt text
[ ] Alt text is descriptive
[ ] No redundant "image" text
[ ] Decorative images skipped

Headings:
[ ] Heading structure is logical
[ ] H1 is page title
[ ] No skipped heading levels
[ ] Headings announce correctly

Buttons:
[ ] Button purpose is clear
[ ] Button text is announced
[ ] Button states announced
[ ] Actions are obvious
```

#### WCAG Compliance
```
Using axe DevTools or WAVE:
[ ] No errors (must-fix)
[ ] No contrast issues
[ ] No missing labels
[ ] No missing alt text
[ ] Heading structure is correct
[ ] Form labels are present
[ ] No color-only information
[ ] Interactive elements are labeled
```

---

### Browser Compatibility Testing

```
Chrome 90+:
├─ [ ] All features work
├─ [ ] CSS Grid works
├─ [ ] Flex works
└─ [ ] Animations smooth

Safari 14+:
├─ [ ] All features work
├─ [ ] No webkit issues
├─ [ ] Scrolling smooth
└─ [ ] Images display correctly

Firefox 88+:
├─ [ ] All features work
├─ [ ] Colors accurate
├─ [ ] Shadows render correctly
└─ [ ] Forms work

Edge 90+:
├─ [ ] All features work
├─ [ ] Chrome compatibility
├─ [ ] No rendering issues
└─ [ ] Performance acceptable
```

---

### Animation Testing

```
AOS (Animate On Scroll):
├─ [ ] Elements animate on scroll
├─ [ ] Animations are smooth
├─ [ ] No layout shift during animation
├─ [ ] Animation delay works
└─ [ ] Disabled on mobile (per settings)

Card Hover:
├─ [ ] Hover effect works on desktop
├─ [ ] No hover on mobile (touch)
├─ [ ] Card lifts up smoothly
├─ [ ] Shadow updates correctly
└─ [ ] Text remains readable

Pagination:
├─ [ ] Page transition is smooth
├─ [ ] No jank or stuttering
├─ [ ] Scroll animation works
└─ [ ] Buttons animate on click
```

---

### Edge Cases to Test

```
[ ] Very small screen (320px portrait)
[ ] Very large screen (4K / 3840px)
[ ] Landscape on phone
[ ] Low internet (slow 3G)
[ ] High zoom level (200%)
[ ] Zoomed out (75%)
[ ] Very long founder names
[ ] Very short founder names
[ ] Missing images
[ ] Missing data
[ ] Malformed cards.json
[ ] Multiple page loads
[ ] Back/forward navigation
[ ] Same card viewed twice
```

---

## Part 3: Quick Reference Commands

### Browser DevTools Shortcuts

```
Windows/Linux:
├─ F12 = Open DevTools
├─ Ctrl+Shift+M = Toggle mobile view
├─ Ctrl+Shift+C = Inspect element
├─ Ctrl+U = View page source
└─ Ctrl+Shift+K = Open console

Mac:
├─ Cmd+Option+I = Open DevTools
├─ Cmd+Shift+M = Toggle mobile view
├─ Cmd+Option+C = Inspect element
├─ Cmd+Option+U = View source
└─ Cmd+Option+K = Open console
```

### Testing Tools

```
Free Tools:
├─ Google PageSpeed: pagespeed.web.dev
├─ WAVE: wave.webaim.org
├─ axe DevTools: deque.com/axe/devtools
├─ WebAIM Contrast: webaim.org/resources/contrastchecker
├─ WebPageTest: webpagetest.org
├─ Lighthouse: Built into Chrome DevTools
└─ Validator: validator.w3.org

Paid Tools:
├─ JAWS Screen Reader
├─ Axe Pro
├─ Siteimprove
└─ Deque axe ProAPI
```

---

## Summary

### Testing Priority
1. **Mobile responsiveness** (320px - 1024px)
2. **Accessibility** (keyboard, screen reader)
3. **Performance** (PageSpeed, WPT)
4. **Cross-browser** (Chrome, Safari, Firefox)
5. **Edge cases** (zoom, missing data)

### Success Criteria
- ✓ Mobile: All content visible, no horizontal scroll
- ✓ Accessibility: Keyboard navigation works, screen readers OK
- ✓ Performance: PageSpeed > 80, no CLS
- ✓ Browsers: All modern browsers work
- ✓ Edge cases: Graceful handling of errors

**When in doubt, test on a real device.** Emulators are good, but nothing beats actual iPhone/Android.
