# Images Folder (assets/)

This folder is empty because the image files were not included with the project.

## Why are the images missing?

The original project downloaded its photos and icons from Figma links
(see `download-assets.sh`). Those links have expired, so every download
returns a 404 error. No replacement images were downloaded from the
internet, because the project must keep using its own images.

The pages still work without the images. Where a photo is missing you
will see a soft pink or dark background instead, and the text, buttons
and forms all work normally. The portfolio page uses Unsplash links, so
its photos still load when you are online.

## How to add the images back

1. Put the image files in this folder (`assets/`), with exactly the
   names below.
2. Refresh the page — no code changes are needed.
3. Or, if the Figma links are renewed, run this from the project folder:
   `sh download-assets.sh`

## Files this project expects in assets/

Photos (`.png`):
- 11c8b.png, 32705.png, 5059a.png, b8f9e.png, e211d.png, ef115.png,
  f022b.png, ffd85.png
- builder-hero.png, builder-cta.png
- builder-planning-full.png, builder-planning-partial.png,
  builder-planning-dayof.png, builder-planning-destination.png
- builder-style-traditional.png, builder-style-modern.png,
  builder-style-royal.png, builder-style-garden.png,
  builder-style-luxury.png
- builder-service-decor.png, builder-service-entertainment.png,
  builder-service-haldi.png, builder-service-catering.png,
  builder-service-photography.png, builder-service-venue.png
- builder-experience-intimate.png, builder-experience-classic.png,
  builder-experience-grand.png, builder-experience-royal.png

Icons (`.svg`):
- b7664.svg, a8205.svg, c464f.svg, cb15e.svg, e6e7f.svg

Fonts:
- Svetze.otf, against regular.ttf

## One more missing file

The login and signup pages expect a photo called `wedding.jpg` in the
project root folder (next to `login.html`), not in `assets/`. Add your
own wedding photo with that name to show it on those pages.
