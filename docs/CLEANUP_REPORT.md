# Отчёт о безопасной очистке DANCE POINT

Дата: 2026-08-06  
Основание: `docs/PROJECT_AUDIT.md`  
Цель: удалить только доказанно неиспользуемый/экспериментальный код и устранить опасные CSS-конфликты без редизайна и изменения активных routes.

## Результат

- Все восемь активных routes сохранены.
- Decap CMS, Netlify config, PDF, uploads, schedule images, Instagram/social code и GallerySwiper не удалялись.
- Production build и ESLint проходят.
- Точные глобальные имена `.card`, `.section`, `.container`, `.cta-wrap`, `.cta-big`, `.video-aspect` больше не используются в `src`.
- Значения, которые фактически выигрывали в прежнем CSS cascade, перенесены в единые grouped selectors с page-specific именами. Это сохраняет текущие border/padding/shadow/CTA/mobile значения.

## Удалённые файлы

| Файл | Доказательство неиспользования |
|---|---|
| `src/pages/Schedule.jsx` | Импортировался в `App.jsx`, но binding не использовался; `/schedule` маршрутизирован на `ScheduleLight`; собственный `schedule.css` также импортируется активной страницей |
| `src/App.css` | Не имел ни одного import; содержал стандартные Vite demo selectors |
| `src/components/header.css` | Не имел import; его классы не попадали в bundle |
| `public/vite.svg` | Не имел ссылок/imports |
| `public/assets/header_logo.jpg` | Не имел ссылок/imports |
| `public/assets/main.jpg` | Упоминался только в удалённом JSX-комментарии, активных ссылок не было |

Не удалялись `netlify.toml`, `public/admin/*`, `public/uploads`, `netlify/functions`, PDF-файлы, schedule/gallery assets и компоненты modal/gallery.

## Удалённые зависимости

Runtime:

- `@fullcalendar/core`;
- `@fullcalendar/interaction`;
- `@fullcalendar/react`;
- `@fullcalendar/timegrid`;
- `@netlify/blobs`.

FullCalendar packages использовались только удалённым `Schedule.jsx`. `@netlify/blobs` не имел imports, а `netlify/functions` не содержит implementation.

Dev dependencies, которые отсутствовали в `eslint.config.js`, scripts и других config:

- `eslint-config-prettier`;
- `eslint-plugin-import`;
- `eslint-plugin-react`;
- `prettier`.

`npm uninstall` удалил из `node_modules` 186 пакетов с учётом их транзитивных зависимостей. `@ant-design/icons@5.6.1` не является новой библиотекой: он уже был установлен через Ant Design. Его добавили в direct dependencies, поскольку active source импортирует пакет напрямую.

## Удалённый код и imports

- `src/App.jsx`: unused import `Schedule`, no-op expression `i18n.changeLanguage`, `console.log(locale)` и закомментированные Content styles.
- `src/pages/Home.jsx`: unused `Card`, закомментированные paragraph/image/fallback fragments.
- `src/pages/Classes.jsx`: unused `Divider` и закомментированный heading.
- `src/pages/Teachers.jsx`: закомментированный overlay markup.
- CSS: удалены закомментированные declarations/blocks и selectors, относившиеся только к FullCalendar/Vite demo/удалённому markup.
- `HeaderNav`: удалены неработавшие `brand`/`brand__img` class names вместе с неимпортируемым stylesheet; inline layout и image остаются прежними.

## Переименованные CSS-классы

### Containers

| Было | Стало |
|---|---|
| `.container` в Header | `.header-container` |
| `.container` в Home | `.home-container` |
| `.container.classes` | `.classes-container` |
| `.container` в Schedule | `.schedule-container` |
| `.container` в Teachers | `.teachers-container` |
| `.container` в Prices | `.prices-container` |
| `.container` в Rent | `.rental-container` |
| `.container` в Documents | `.documents-container` |
| `.container` в Contacts | `.contacts-container` |

Все перечисленные selectors группируются в `src/styles.css`. Прежнее mobile `padding:0 !important`, которое случайно приходило из `schedule.css`, сохранено явно для этого же списка, чтобы очистка не изменила внешний вид.

### Cards и sections

| Было | Стало |
|---|---|
| `.card` в Classes | `.classes-card` |
| `.card` в ScheduleLight | `.schedule-card` |
| `.card` в Prices | `.prices-card` |
| `.card` в Rent | `.rental-card` |
| `.card` в Documents | `.documents-card` |
| `.card` в Contacts | `.contacts-card` |
| `.section` в Home | `.home-section` |
| `.section` в ScheduleLight | `.schedule-section` |
| `.section` в Rent | `.rental-section` |

Specific variants сохранены как `.classes-player-card.classes-card`, `.playlist.classes-card`, `.desc.classes-card`, `.schedule-gallery-card.schedule-card` и `.rental-gallery-card.rental-card`.

### CTA и video aspect

| Было | Стало |
|---|---|
| `.cta-wrap` | `.classes-cta-wrap`, `.schedule-cta-wrap`, `.prices-cta-wrap`, `.rental-cta-wrap`, `.contacts-cta-wrap` |
| `.cta-big` | `.classes-cta-big`, `.schedule-cta-big`, `.prices-cta-big`, `.rental-cta-big`, `.contacts-cta-big` |
| `.cta-note` | `.schedule-cta-note`, `.prices-cta-note`, `.contacts-cta-note` |
| Classes `.video-aspect` | `.classes-video-aspect` |
| Modal `.video-aspect` | `.video-modal-aspect` |

CTA selectors сгруппированы в одном месте. Для video сохранён прежний desktop radius и mobile `border-radius:0 !important`, ранее возникавший из-за глобального collision.

## Проверки

| Проверка | Результат |
|---|---|
| `npm ls --depth=0` | Успешно; direct dependencies разрешены |
| `npm run lint` | Успешно, 0 ошибок |
| `npm run build` | Успешно, Vite 7.1.9, 3119 modules |
| Build CSS | 11.39 kB, gzip 2.95 kB; до очистки 13.30 kB / 3.49 kB |
| Build JS | 1,129.13 kB, gzip 359.95 kB; warning >500 kB остаётся |
| Broken imports | Build прошёл; удалённых modules/assets в imports нет |
| Routes | `/`, `/classes`, `/schedule`, `/teachers`, `/prices`, `/rent`, `/documents`, `/contacts` вернули HTTP 200 через Vite Preview; каждый response содержит root и module entry |
| Визуальная/browser-console проверка | Не выполнена: встроенный браузерный инструмент был недоступен из-за sandbox metadata до открытия страницы |

## Потенциально опасные места, оставленные без изменений

- `public/admin/index.html`, `public/admin/config.yml`, `public/uploads`, `netlify.toml` и пустой `netlify/functions`: сохранены целиком из-за CMS/Netlify scope.
- `ScheduleLight.jsx`, `schedule.css`, `grafik_1.jpg`, `grafik_2.jpeg` и `GallerySwiper`: это активный `/schedule`.
- `Documents.jsx`, `PdfViewerModal.jsx` и все PDF: активный `/documents`.
- GallerySwiper, hall photos, teacher photos, YouTube video modal и social/Instagram links: имеют активные consumers.
- `home.mp4` и крупные JPEG: очень тяжёлые, но их оптимизация изменила бы assets/качество и выходит за безопасную cleanup-задачу.
- Contact Formspree placeholder, mock prices/addresses/social URLs: функционально опасны, но изменение требует подтверждённых business данных/backend.
- Decap collections пока не подключены к frontend; их удаление запрещено и могло бы разрушить планируемый CMS flow.
- Глобальные `.ant-tag`, `.ant-list-item-meta-*`, Ant menu/button overrides оставлены: они влияют на текущий вид, а точную визуальную эквивалентность без browser baseline доказать нельзя.
- Ant Design deprecated props, i18n debug/state, 404 route и eager route imports оставлены: это отдельные исправления поведения/архитектуры.
- Build warning о JS чанке 1.13 MB оставлен; route-level lazy loading изменяет загрузочное поведение и не относится к удалению мёртвого кода.

