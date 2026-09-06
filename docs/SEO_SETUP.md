# SEO setup for DANCE POINT

Production origin: `https://www.dancepointlubon.pl`

## Implemented metadata

The initial Polish homepage metadata is present directly in `index.html`, so it is available before React starts:

- `<title>` and meta description;
- `robots` with indexing enabled and extended preview directives;
- a single absolute canonical URL on the production domain;
- `viewport` and brand `theme-color`;
- Open Graph type, site name, locale, title, description, URL, image and image alt;
- Twitter Card type, title, description, image and image alt;
- a JPEG favicon declaration matching the actual file type.

`src/seo/SiteSeo.jsx` updates the title, description, canonical, robots, Open Graph and Twitter metadata on React Router navigation and language changes. It uses the fixed production origin rather than `window.location.origin`; consequently, a Netlify preview hostname cannot leak into canonical or `og:url` values. Unknown application paths receive `noindex, nofollow`.

No head-management dependency was added. The project did not contain an existing solution, and the current metadata requirements are handled by the small local component.

## Page titles and descriptions

Polish is the default and priority language. When the user switches the application to English, the English metadata from `src/seo/seoConfig.js` is used.

| Route | Polish title | Polish description |
| --- | --- | --- |
| `/` | Szkoła tańca w Luboniu \| DANCE POINT | DANCE POINT to szkoła tańca w Luboniu dla dzieci, młodzieży i dorosłych. Poznaj style, instruktorów, grafik zajęć i umów lekcję próbną. |
| `/teachers` | Instruktorzy tańca w Luboniu \| DANCE POINT | Poznaj instruktorów DANCE POINT w Luboniu i prowadzone przez nich zajęcia: waacking, jazz, hip-hop, high heels, K-pop, salsa i zajęcia dla dzieci. |
| `/directions` | Style i zajęcia taneczne w Luboniu \| DANCE POINT | Sprawdź style taneczne w DANCE POINT Luboń: waacking, choreografia, jazz, hip-hop, high heels, K-pop, salsa i zajęcia dla dzieci. |
| `/schedule` | Grafik zajęć tanecznych \| DANCE POINT Luboń | Sprawdź aktualny grafik zajęć tanecznych DANCE POINT w Luboniu i wybierz dogodny termin zajęć dla dzieci, młodzieży lub dorosłych. |
| `/prices` | Cennik zajęć tanecznych \| DANCE POINT Luboń | Poznaj ceny zajęć, karnetów i lekcji próbnych w szkole tańca DANCE POINT w Luboniu. Wybierz opcję dopasowaną do swoich potrzeb. |
| `/rent` | Wynajem sali tanecznej \| DANCE POINT Luboń | Wynajmij salę taneczną DANCE POINT w Luboniu na trening, próbę, lekcję prywatną lub wydarzenie. Zobacz sale i dostępne udogodnienia. |
| `/contacts` | Kontakt i lekcja próbna \| DANCE POINT Luboń | Skontaktuj się z DANCE POINT, zapytaj o zajęcia lub wynajem sali i umów lekcję próbną w naszej szkole tańca w Luboniu. |
| `/documents` | Dokumenty i regulaminy \| DANCE POINT Luboń | Dokumenty DANCE POINT: regulaminy, zasady bezpieczeństwa, informacje o cenach oraz warunki wynajmu sali tanecznej. |

| Route | English title | English description |
| --- | --- | --- |
| `/` | Dance School in Luboń \| DANCE POINT | DANCE POINT is a dance school in Luboń for children, teenagers and adults. Explore classes, teachers, the schedule and book a trial lesson. |
| `/teachers` | Dance Teachers in Luboń \| DANCE POINT | Meet the DANCE POINT teachers in Luboń and discover their waacking, jazz, hip-hop, high heels, K-pop, salsa and children’s dance classes. |
| `/directions` | Dance Styles and Classes in Luboń \| DANCE POINT | Explore dance styles at DANCE POINT Luboń, including waacking, choreography, jazz, hip-hop, high heels, K-pop, salsa and children’s classes. |
| `/schedule` | Dance Class Schedule \| DANCE POINT Luboń | Check the DANCE POINT dance class schedule in Luboń and find a convenient class time for children, teenagers or adults. |
| `/prices` | Dance Class Prices \| DANCE POINT Luboń | See prices for dance classes, passes and trial lessons at DANCE POINT in Luboń and choose the option that suits you. |
| `/rent` | Dance Studio Rental \| DANCE POINT Luboń | Rent a DANCE POINT dance studio in Luboń for training, rehearsals, private lessons or events. Explore the halls and amenities. |
| `/contacts` | Contact and Trial Lesson \| DANCE POINT Luboń | Contact DANCE POINT about dance classes or studio rental and book a trial lesson at our dance school in Luboń. |
| `/documents` | Documents and Policies \| DANCE POINT Luboń | DANCE POINT documents, including studio rules, safety information, pricing documents and dance hall rental terms. |

The old `/classes` path redirects permanently to the canonical `/directions` route in Netlify and is also handled by React Router for client-side navigation.

## Sitemap and robots

`public/sitemap.xml` contains the eight canonical public routes listed above. It intentionally excludes `/classes`, `/admin` and preview URLs. No fabricated `lastmod`, `changefreq` or `priority` values are included.

`public/robots.txt` allows public crawling, disallows the `/admin` path and points to:

`https://www.dancepointlubon.pl/sitemap.xml`

The admin HTML also retains its `noindex` directive. `netlify.toml` contains the final `/* -> /index.html` status-200 SPA fallback, after the specific `/classes` redirect, so direct requests to public routes work.

## JSON-LD

`index.html` contains one Schema.org `DanceSchool` entity with:

- the name `DANCE POINT LUBOŃ`;
- the canonical production URL and stable `@id`;
- existing logo/image URLs;
- the confirmed telephone number `+48 796 148 125`;
- the confirmed street address at Sobieskiego 55A, 62-030 Luboń, Poland;
- confirmed geographic coordinates and a Google Maps URL;
- Monday–Friday opening hours from 16:00 to 22:00.

Email and `sameAs` are deliberately not published because no confirmed business email or DANCE POINT social profile URLs were supplied.

## Semantic and accessibility checks

- Each configured public page has exactly one primary `h1`; subsections use logical lower heading levels.
- Existing visual heading sizes were retained while the semantic levels were corrected.
- Content images have contextual alt text; the linked logo identifies the business and location.
- External links opened in a new tab use `rel="noreferrer noopener"`.
- CTA buttons no longer contain nested links, and the class label that had no destination is no longer marked up as an anchor.

## Manual steps after deployment

1. Verify that the custom domain resolves over HTTPS and that both the apex and any Netlify hostname redirect to `https://www.dancepointlubon.pl` without redirect loops.
2. Add and verify the domain property in Google Search Console, preferably with a DNS TXT record.
3. Submit `https://www.dancepointlubon.pl/sitemap.xml` in Search Console and confirm that all eight URLs are discovered without canonical conflicts.
4. Use URL Inspection for `/`, `/directions`, `/schedule`, `/prices` and `/contacts`; run the live test and request indexing after the production deployment is stable.
5. Create or claim the DANCE POINT Google Business Profile. Use the owner-confirmed studio name, category, Luboń address, phone, opening hours and website URL, and keep them consistent with the Contacts page and JSON-LD.
6. Replace and verify the favicon on common devices. Create a dedicated 1200 × 630 px Open Graph image when approved; test the deployed image URL and social previews instead of relying permanently on the square logo fallback.
7. Add Instagram, Facebook or WhatsApp buttons only after the business owner supplies confirmed DANCE POINT URLs. Then add the verified profile URLs to JSON-LD `sameAs`.
8. Add an email address only after the business owner confirms the public mailbox.
9. Run Lighthouse against the production URLs in mobile mode and review the SEO and accessibility reports. Also test rendered metadata with a social sharing debugger.
10. Because this is a client-rendered SPA, inspect Google’s rendered HTML in URL Inspection. If non-Google crawlers or reliable route-specific social previews are important, add build-time prerendering or server-side rendering in a separate, tested deployment change.
