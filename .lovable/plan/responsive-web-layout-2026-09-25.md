# Responsive web layout

## Goal
Keep Tikyaa’s current colors, typography, imagery, wording, controls, and screen flow unchanged while making the existing experience fit naturally on phones, tablets, and desktop browsers.

## Changes
- Preserve the full-width mobile presentation on small screens.
- Keep the centered app presentation on larger screens, but let it use available desktop height and width more comfortably without clipping.
- Add safe-area spacing for modern phones and improve behavior on short or landscape screens.
- Ensure long text, paired controls, signatures, cards, and overlays shrink or wrap instead of overflowing.
- Keep the existing scroll behavior for content-heavy steps and prevent horizontal page scrolling.

## Verification
- Check the main flow at representative mobile, tablet, desktop, and short-height sizes.
- Confirm there are no overlaps, clipped controls, horizontal scrollbars, or preview errors.
- Confirm the app’s appearance and functionality remain unchanged apart from responsive sizing and spacing.

## Technical details
- Restrict edits to shared layout/responsive classes and CSS media queries where possible.
- Reuse existing design tokens and components; no new visual system, content, or backend work.
