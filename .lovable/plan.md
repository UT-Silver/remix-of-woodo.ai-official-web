

# Scroll-Driven Dark Mode Transition on Portfolio Page

## What we're building
When scrolling down to the "Crafting Wall Street Standard Investment Reports" section, the entire page background smoothly transitions from light to dark (#1a1a1a). Scrolling back up reverses the transition. The navbar also adapts its colors. All existing section background colors remain unchanged — this is an overarching page-level transition.

## How it works

1. **Trigger element**: A zero-height invisible `<div>` placed just before the Investment Reports section acts as an IntersectionObserver trigger.

2. **State-driven class**: Portfolio component uses `useState` + `useEffect` with IntersectionObserver. When the trigger enters the viewport, a `portfolio-dark` class is added to `document.documentElement`. When scrolling back up, it's removed.

3. **CSS transitions on `<html>`**: Add CSS rules so `html.portfolio-dark` changes `background-color` to `#1a1a1a` with a `0.5s linear` transition. This creates the smooth full-page background shift.

4. **Navbar awareness**: Navbar already tracks scroll position. We'll add a check for the `portfolio-dark` class on `<html>` (via a scroll listener or MutationObserver) so when dark mode is active, the navbar switches to dark-background styling (white text, dark backdrop).

5. **Cleanup**: The `portfolio-dark` class is removed on component unmount (navigating away from Portfolio page).

## File changes

### `src/index.css`
Add transition and dark-mode rules:
```css
html {
  transition: background-color 0.5s linear;
}
html.portfolio-dark {
  background-color: #1a1a1a;
}
```

### `src/pages/Portfolio.tsx`
- Add a `useRef` for the trigger div and `useEffect` with IntersectionObserver
- Insert a zero-height trigger `<div ref={triggerRef}>` between the AI Value Chain section and the Investment Reports section
- On intersect → `document.documentElement.classList.add('portfolio-dark')`; on leave (scrolling up) → remove it
- Cleanup on unmount: always remove the class
- Remove the inline `backgroundColor: "#1a1a1a"` from the Investment Reports section (the html background handles it now), or keep it as a fallback — either works since both are dark

### `src/components/Navbar.tsx`
- Add state `darkMode` that listens for the `portfolio-dark` class on `<html>` via a MutationObserver on `documentElement.classList`
- When `darkMode` is true and we're on `/portfolio`, apply dark navbar styling: dark translucent background, white text for links, white hamburger lines
- The existing `heroMode` logic stays untouched — `darkMode` is an additional condition for the Portfolio page only

## Key details
- IntersectionObserver `threshold: 0`, `rootMargin: '-80px 0px 0px 0px'` (accounts for navbar height)
- The trigger fires when the dark section's top reaches the navbar bottom
- Sections that are already dark (Investment Reports, Demo Day) keep their own backgrounds — they just blend seamlessly with the html background
- The "Coming soon" grid section between them will need its background changed from `bg-cool-gray` to transparent (or conditional) so the dark html background shows through when in dark mode

