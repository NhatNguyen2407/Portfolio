# Portfolio typography

I use **Kajiro** for the large headings and **Manrope** for body text, navigation, and controls. The font definitions and size adjustments are in `public/assets/typography.css`.

## Kajiro

I chose Kajiro for its tall, condensed letterforms. It gives the main title and section headings a consistent style without needing much decoration.

- File: `public/assets/kajiro.woff`, converted from the TTF in my `kajiro.rar` archive.
- CSS family: `Portfolio Display`.
- Homepage headings use `data-type-role="display"`.
- Heading sizes are adjusted for desktop and mobile because Kajiro is much narrower than the previous font.

The original archive did not include a license document. This repository does not include or establish a webfont license for Kajiro; its usage and redistribution terms still apply.

## Manrope

Manrope keeps the smaller text readable alongside the condensed headings.

- File: `public/assets/manrope.woff`.
- CSS family: `Portfolio Sans`.
- License: `public/assets/manrope-license.txt`.

## Advercase

I also considered Advercase for the body text. The copy I have is a Demo version with restrictions on promotional use and redistribution, so I haven't included it in the site. Manrope remains the body font.

## Earlier fonts

The asset folder also contains Anton and URW Base35 fonts from earlier design iterations. Their license files remain alongside them. The active typography is defined in `typography.css`, which loads after `style.css` and `moon.css`.
