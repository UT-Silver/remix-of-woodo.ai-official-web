

# Change "Portfolio" nav link to "Build"

Update the navbar link label from "Portfolio" to "Build". The route `/portfolio` stays the same.

## Changes

**`src/components/Navbar.tsx`** — Change the label in the `navLinks` array from `"Portfolio"` to `"Build"`.

**`src/components/Footer.tsx`** — Check if Footer also references "Portfolio" and update accordingly.

**`src/pages/Portfolio.tsx`** — Update the page header subtitle from "Portfolio" to "Build" if desired.

