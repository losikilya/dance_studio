# DANCE POINT content and i18n update

## Teacher roster

`src/content/teachers.js` is the single source used by the Teachers page. It contains stable IDs, names, image paths, source YouTube URLs, an optional social URL and Polish/English biographies.

The roster now contains the ten teachers from `OPSIY I LINKI DO YT`:

1. Zosia Ostoja-Zagórska
2. Nikola Makowska-Kuciak
3. Aleksandra Kaszubowska
4. Zuzanna Kuźmicka
5. Nikola Perczak
6. Dominika “Doma” Lubawy
7. Jędrek
8. Wiktoria
9. Victoria
10. Maja Oźmińska

Added to the previous Teachers roster:

- Jędrek
- Wiktoria
- Victoria
- Maja Oźmińska

Removed from the Teachers roster because they are absent from the new source document:

- Abad Bolanos
- Jakub Kamiński

Dominika “Doma” Lubawy is treated as the same teacher previously displayed as Dominika Jałoszyńska. Her existing `Doma.jpg` image was retained, while her name, biography and video source were replaced with the supplied data.

The Teachers page no longer contains class names, weekdays, times, schedule headings or schedule CTAs. `/schedule` remains independent and continues to use its existing schedule images.

## Teacher photos requiring replacement

The following new teachers did not have supplied or existing photos. They temporarily use the neutral local `/assets/logo.jpg` image. Each entry has a `TODO: Replace placeholder with actual teacher photo` comment in `src/content/teachers.js`:

- Jędrek
- Wiktoria
- Victoria
- Maja Oźmińska

Do not replace these with photos found through a general internet search. Use owner-approved files, put them in `public/assets`, and update only the corresponding `image` value.

## YouTube URLs

The original source URLs are stored in `src/content/teachers.js`. `src/utils/youtube.js` is the only URL parser and supports:

- `youtube.com/watch?v=...`
- `youtu.be/...`
- `youtube.com/shorts/...`
- existing video IDs and YouTube embed URLs

The existing `VideoModal` remains responsible for playback. Eight teachers have supplied video URLs. Jędrek and Victoria do not have a video URL in the source and therefore do not show a video button.

## Translations

Interface translations are stored in:

- `public/locales/pl/translation.json`
- `public/locales/en/translation.json`

Teacher biographies are stored next to the teacher’s language-neutral data in `src/content/teachers.js` under `bio.pl` and `bio.en`. This prevents two independent teacher arrays from drifting apart.

Polish is the initial language when there is no saved choice. English is the translation fallback. The key `dancepoint-language` in `localStorage` preserves the selected language across reloads. The desktop Header and mobile Drawer use the same controlled language state.

To add a third language:

1. Add its language code to `supportedLngs` in `src/i18n.js`.
2. Create `public/locales/<code>/translation.json` with the same key structure.
3. Add `bio.<code>` for every teacher and localized direction content where applicable.
4. Add the language to the Header selector; a two-state Ant Design `Switch` should be replaced with a select/menu when there are more than two languages.
5. Add the language’s title and description entries to `src/seo/seoConfig.js` and update the locale mapping in `src/seo/SiteSeo.jsx`.
6. Verify `document.documentElement.lang`, Ant Design locale and date locale.

## Maintaining teachers

To add or change a teacher, edit one object in `src/content/teachers.js`:

- keep `id` stable after publication;
- provide the approved `name` and local `image` path;
- add the exact source `videoUrl` only when supplied;
- add complete `bio.pl` and fact-preserving `bio.en` text;
- omit fields whose values are unknown.

To add a teacher social link, add a confirmed `socialUrl` to that teacher. The current card renders it as an external Instagram link with `noopener`/`noreferrer`. If another social platform is added, introduce a `socialType` field and map it to a localized label/icon rather than inferring the platform from untrusted URL text.

Directions data is stored separately in `src/content/directions.js`. Where a direction refers to a current teacher, it reuses that teacher’s name, biography and video rather than copying the content.

## Contacts update

`src/content/studio.js` now contains the confirmed Google Business Profile data:

- name: DANCE POINT LUBOŃ
- address: Sobieskiego 55A, 62-030 Luboń, Poland
- telephone: +48 796 148 125 (`tel:+48796148125`)
- opening hours: Monday–Friday, 16:00–22:00
- coordinates: 52.334546, 16.8761191
- supplied Google Maps place URL

The old Poznań address, two old phone numbers, placeholder email, placeholder Instagram/Facebook links and unconfirmed WhatsApp link were removed. Social buttons are rendered only when `STUDIO.socialLinks` contains confirmed entries.

The placeholder Formspree contact form was removed because no working form backend or public email was supplied. The existing contact-card layout is retained and now presents a direct telephone CTA. A written form should be restored only after a real backend, delivery feedback and privacy handling are available.

The `DanceSchool` JSON-LD in `index.html` now includes the confirmed name, telephone, full postal address, coordinates, map and Monday–Friday opening hours. It intentionally has no email or `sameAs`.

## Unknown or unconfirmed source data

- No approved photos were supplied for Jędrek, Wiktoria, Victoria or Maja Oźmińska.
- No surname was supplied for Jędrek or Wiktoria. The displayed names follow the source exactly.
- The source heading says `Victoria`; her biography identifies her as Victoria Silvero. The displayed heading remains the source heading.
- No video was supplied for Jędrek or Victoria.
- The only confirmed teacher social URL is Dominika “Doma” Lubawy’s Instagram link.
- No confirmed DANCE POINT email, Instagram, Facebook or WhatsApp URL was supplied.
- No replacement business source was supplied for the existing prices, hall specifications or document contents; those pre-existing values were preserved and still require owner verification.
- Schedule information is supplied as existing image assets, so the surrounding interface is translated but text inside those images is not dynamically localizable.
