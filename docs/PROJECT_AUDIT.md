# Аудит проекта DANCE POINT

Дата аудита: 2026-08-06  
Область: React 19 + Vite 7, Ant Design 5, маршрутизация, страницы, CSS, FullCalendar, Decap CMS и Netlify.  
Ограничение первичного аудита: на этапе аудита production-код и конфигурация не изменялись; `dist/` был пересоздан штатной проверкой `npm run build` и игнорируется Git. Результаты последующей безопасной очистки отмечены ниже.

## Статус после безопасной очистки — 2026-08-06

Исходные находки ниже сохранены как история аудита. Текущее состояние после очистки:

| Пункт аудита | Статус |
|---|---|
| S1, S2, S3 — конфликты `.card`, `.section`, `.container`, `.cta-*`, `.video-aspect` | **Исправлено:** заменены page-specific именами; итоговые значения прежнего каскада сохранены в одном месте |
| S4, S15 — недоступный FullCalendar | **Исправлено:** выбран активный `ScheduleLight`; экспериментальный `Schedule.jsx`, calendar CSS и четыре FullCalendar-пакета удалены |
| S7 — lint/no-op код | **Частично исправлено:** удалены no-op expression, console log и подтверждённые unused imports; широкое исключение ESLint оставлено для отдельной настройки |
| S11 — прямой import icons | **Исправлено:** `@ant-design/icons` явно объявлен direct dependency |
| Cleanup: Vite template, unused assets/tooling | **Исправлено:** доказанно неиспользуемые файлы и packages удалены; полный список в `docs/CLEANUP_REPORT.md` |
| C1, C2, C3 и остальные Should fix | **Открыто:** намеренно не затрагивались, чтобы не менять внешний вид, контент и production-интеграции |

Проверки после очистки: ESLint — успешно; production build — успешно (`3119` modules, CSS `11.39 kB`, JS `1,129.13 kB`, gzip `359.95 kB`); все восемь routes вернули HTTP 200 через Vite Preview. Визуальная browser-console проверка осталась недоступна из-за ограничения встроенного браузера.

## Краткий итог

Проект собирается и проходит текущий ESLint, но сейчас остаётся прототипом с несколькими production-блокерами:

- контактная форма отправляет данные на заглушку Formspree, поэтому сообщения пользователей фактически не имеют рабочего получателя;
- Decap CMS настроен на отсутствующий `src/content` и его данные вообще не читаются приложением;
- главная страница автоматически загружает видео размером 103.1 MB, а весь `public/assets` занимает 150.8 MB;
- конфликты `.card`, `.section`, `.container`, `.cta-*` и `.video-aspect`, найденные исходным аудитом, устранены безопасной очисткой;
- экспериментальный FullCalendar удалён после подтверждения, что `/schedule` использует `ScheduleLight`;
- большая часть страниц содержит mock/placeholder-контент и не локализована, несмотря на подключённый i18next.

## Выполненные проверки

| Проверка | Результат |
|---|---|
| Состояние Git до отчёта | Чистое; ветка `main` |
| `node_modules` / lockfile | Присутствуют, `package-lock.json` lockfileVersion 3 |
| `npm install` | Не запускался: зависимости уже установлены и `npm ls --depth=0` завершился успешно |
| Локальная среда | Node `v24.10.0`, npm `11.6.1` |
| Netlify environment | В `netlify.toml` задан `NODE_VERSION = "20"` и `TZ = "Europe/Warsaw"` |
| `npm run build` | Успешно, Vite 7.1.9, 3135 transformed modules |
| Размер build-чанка | JS 1,129.79 kB, gzip 360.31 kB; Vite выдал warning о чанке больше 500 kB |
| `npm run lint` | Успешно, 0 ошибок/предупреждений |
| Дополнительный `no-unused-expressions` | Нашёл ошибку `src/App.jsx`: отдельное выражение `i18n.changeLanguage` |
| Browser runtime console | Не проверена: встроенный браузер был заблокирован инфраструктурой sandbox до открытия сайта |

Первый build внутри sandbox не смог прочитать родительский каталог при загрузке `vite.config.js`; повторный запуск той же команды вне файлового sandbox прошёл успешно. Это ограничение среды аудита, а не ошибка проекта.

## Инвентаризация проекта

### Зависимости

Фактически установленные основные runtime-версии:

- React / React DOM `19.2.0`;
- React Router DOM `7.9.4`;
- Vite `7.1.9`;
- Ant Design `5.27.4`;
- dayjs `1.11.19`;
- i18next `25.8.4`, react-i18next `16.5.4`, language detector `8.2.0`, HTTP backend `3.0.2`;
- `@ant-design/icons` `5.6.1` объявлен прямой зависимостью.

Текущая конфигурация использует `@eslint/js`, `eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`, `@vitejs/plugin-react` и Vite. Не подключённые `eslint-config-prettier`, `eslint-plugin-import`, `eslint-plugin-react` и Prettier удалены. `@types/react*` сохранены для подсказок редактора, хотя TypeScript в проекте не используется.

В коде напрямую импортируется `@ant-design/icons`, но пакет отсутствует среди direct dependencies. Сейчас он случайно доступен как транзитивная зависимость `antd@5.27.4` (`@ant-design/icons@5.6.1`).

### Структура

- `src/App.jsx` содержит одновременно ConfigProvider, Router, Layout, locale state и все routes.
- `src/components` содержит HeaderNav, галерею, PDF- и video-modal.
- `src/pages` содержит только восемь активных страниц; альтернативный `Schedule.jsx` удалён.
- `src/styles.css` — глобальные variables/utilities; все page CSS также глобальны.
- `public/assets` — изображения, PDF и видео; `public/locales` — PL/EN переводы.
- `public/admin` — Decap CMS shell и config.
- `public/uploads` существует и содержит `.gitkeep`.
- `netlify/functions` существует, но пуст.
- `src/content` отсутствует.

### Роутинг

| URL | Компонент | Наблюдение |
|---|---|---|
| `/` | `Home` | 103 MB background video |
| `/classes` | `Classes` | YouTube player и hardcoded dataset |
| `/schedule` | `ScheduleLight` | Показывает изображения графика, не FullCalendar |
| `/teachers` | `Teachers` | Hardcoded teachers, YouTube modal |
| `/prices` | `Prices` | Mock price data |
| `/rent` | `Rent` | Mock halls/rates |
| `/documents` | `Documents` | Три hardcoded PDF |
| `/contacts` | `Contacts` | Placeholder form/social data |

Нет wildcard route (`*`) и 404-страницы. Netlify SPA fallback корректно отдаёт `index.html`, но неизвестный URL после этого рендерит только общий layout без содержимого; Header при этом выделяет Home.

### Header, Layout и связи страниц с компонентами

Отдельного reusable `Layout`-компонента нет. `src/App.jsx` сам создаёт `ConfigProvider → AntApp → BrowserRouter → Layout`, встраивает `HeaderNav` в Ant `Header`, routes в `Content` и inline `Footer`. Это работает, но связывает routing, locale state и shell в одном компоненте. `Content` занимает 100% ширины; реальные ограничения ширины задаются повторяющимся классом `.container` внутри pages.

- `HeaderNav` использует Ant Menu/Drawer/Switch/Button и React Router Link.
- `Home` использует HTML video.
- `Classes` содержит собственный YouTube player/playlist.
- `ScheduleLight` и `Rent` используют `GallerySwiper`.
- `Teachers` использует `VideoModal`.
- `Documents` использует `PdfViewerModal`.
- `Prices` содержит локальный `PriceCard`.
- `Contacts` содержит локальный `MapEmbed` и Ant Form.
- `/schedule` использует `ScheduleLight`; галерея расписания и связанные assets сохранены.

## Critical

### C1. Контактная форма не имеет рабочего backend

- **Файл:** `src/pages/Contacts.jsx`
- **Находка:** `onFinish` отправляет персональные данные на `https://formspree.io/f/xxxxxx`. Это placeholder endpoint. Код не проверяет `response.ok`, не показывает отправку, успех или ошибку и не обрабатывает исключения. Пользователь может нажать Send и решить, что сообщение принято, хотя доставка не подтверждена.
- **Связанные placeholders:** `instagram.com/yourstudio`, `facebook.com/yourstudio`; адрес и email также требуют бизнес-подтверждения.
- **Действие:** до публикации подключить реальный Formspree/Netlify Function/CRM endpoint, добавить loading, success/error feedback, anti-spam и проверку ответа. Подтвердить реквизиты и privacy notice.

### C2. Decap CMS не связан с приложением

- **Файлы:** `public/admin/config.yml`, отсутствующий `src/content`, `src/pages/Documents.jsx`, `src/pages/Contacts.jsx`, `src/pages/Rent.jsx`, `src/pages/Teachers.jsx`, `src/pages/ScheduleLight.jsx`
- **Находка:** CMS ожидает `src/content/social.json`, `src/content/galleries` и `src/content/documents`, но каталога `src/content` нет. Все соответствующие данные в UI hardcoded. Даже успешный commit через CMS не изменит сайт.
- **Действие:** сначала определить контентную модель, создать seed content, затем подключить его к страницам через JSON/Markdown import или build-time loader. Только после этого включать редакторам доступ к CMS. Добавить проверку schema/content в build.

### C3. Неприемлемо тяжёлый критический media path

- **Файлы:** `public/assets/home.mp4`, `src/pages/Home.jsx`, крупные JPEG в `public/assets`
- **Находка:** autoplay background video весит `103,142,471` bytes. Суммарный размер `public/assets` — `150,788,425` bytes. Главная страница не задаёт poster или альтернативные источники. Крупнейшие фото: `nikola.jpg` 9.85 MB, `Doma.jpg` 7.81 MB, `zosia.jpg` 7.74 MB, `ola.jpg` 5.18 MB; график — около 5 MB на изображение.
- **Действие:** перекодировать фон в короткие WebM/MP4 варианты с существенно меньшим bitrate и разрешением, добавить poster и mobile/reduced-data strategy. Сгенерировать AVIF/WebP responsive images и ограничить исходные размеры. Установить budget для assets/build.

## Should fix

| ID | Файл(ы) | Находка | Рекомендуемое действие |
|---|---|---|---|
| S1 | `src/styles.css`, все `src/pages/*.css` | Page CSS глобален. Семь файлов определяют `.card`, поэтому итоговый вид зависит от порядка imports, а не от страницы-владельца. | Перейти на CSS Modules или namespace каждого route (`.prices-wrap .card` и т. п.). Оставить один канонический global Card utility либо использовать только Ant Card tokens. |
| S2 | `src/pages/schedule.css` | В `@media (max-width: 768px)` глобальная `.container { padding: 0 !important; }` убирает gutters у Header и всех страниц, потому что CSS расписания загружается глобально. | Ограничить правило `.schedule-wrap .container`/`.schedule-gallery`, убрать `!important`. Проверить 320/375/768 px. |
| S3 | `src/pages/classes.css`, `src/components/videoModal.css` | Оба файла определяют `.video-aspect`; mobile rule Classes также меняет modal. | Переименовать в component-specific классы или CSS Modules; использовать `aspect-ratio` без общего имени. |
| S4 | `src/App.jsx`, `src/pages/Schedule.jsx`, `src/pages/ScheduleLight.jsx` | В App импортируется `Schedule`, но route использует `ScheduleLight`. Требование/ожидание FullCalendar и фактический UI расходятся. | Принять продукт-решение: включить и завершить FullCalendar либо удалить legacy calendar и четыре зависимости. Не держать две конкурирующие реализации. |
| S5 | `src/i18n.js`, `src/App.jsx`, `src/components/HeaderNav.jsx`, большинство pages | `lng: 'pl'` делает detector бессмысленным; Ant locale и i18n ведутся раздельно; два uncontrolled Switch не синхронизированы; `debug: true`; страницы Prices/Rent/Documents/Contacts в основном только EN. | Сделать один language state/source of truth, controlled switch, синхронизировать Ant/dayjs/`<html lang>`, выключать debug в production, вынести все user-facing strings в locales. |
| S6 | `src/components/VideoModal.jsx`, `src/components/PdfViewerModal.jsx`, `src/pages/Classes.jsx`, `src/pages/Prices.jsx`, Cards на pages | В AntD 5.27 используются устаревающие API: `bodyStyle`, `destroyOnClose`, child `Collapse.Panel`, `Card bordered`. Они способны создавать dev-console deprecation warnings. | Перейти на `styles={{ body: ... }}`, `destroyOnHidden`, `Collapse items` и актуальный `variant`. Подтвердить warnings в реальном браузере. |
| S7 | `eslint.config.js`, `src/App.jsx` | `varsIgnorePattern: '^[A-Z_]'` скрывает неиспользуемые React-компоненты/imports. Отдельная строка `i18n.changeLanguage` обнаруживается только дополнительным `no-unused-expressions`. | Убрать слишком широкое исключение; оставить точечный pattern только для намеренно игнорируемых значений. Добавить `no-unused-expressions` и import rules. |
| S8 | `src/App.jsx`, `src/components/HeaderNav.jsx` | Нет 404 route; выбор Home используется и на неизвестном pathname. | Добавить `Route path="*"`, корректную NotFound и точное сопоставление menu keys. |
| S9 | `src/components/HeaderNav.jsx`, `src/components/header.css`, `src/styles.css` | `header.css` не импортируется, поэтому `.brand`/`.brand__img` не применяются. Desktop menu содержит восемь пунктов, switch и CTA, но скрывается только ниже 820 px; `disabledOverflow` не позволяет Menu свернуться. | Подключить/интегрировать нужные стили, определить breakpoint по фактической ширине, разрешить overflow menu или раньше показывать burger. Не маскировать проблему `overflow-x:hidden`. |
| S10 | `src/theme.js`, `src/styles.css`, page CSS | Палитра и radius продублированы между JS tokens, CSS variables и literal colors. `var(--colorBgContainer, #fff)` не связан с Ant tokens, так как Ant `cssVar` mode не включён. | Выбрать единый source of truth: включить Ant CSS vars или экспортировать согласованные CSS vars. Удалить literal-дубли. Передавать числовые token values там, где API ожидает number (`Switch.innerMinMargin`). |
| S11 | `package.json`, imports из `@ant-design/icons` | Direct import опирается на транзитивную зависимость AntD. | Добавить совместимую direct dependency или заменить icons; после решения обновить lockfile и проверить clean `npm ci`. |
| S12 | `src/pages/Prices.jsx`, `src/pages/Rent.jsx`, `src/pages/Documents.jsx`, `src/pages/Contacts.jsx` | В production routes остаются явно mock данные: переменная `formatKZT` форматирует PLN; цены 39,000 PLN выглядят как перенесённые KZT; documents помечены 2025; hall/contact данные и тексты шаблонные. | Провести content review с владельцем бизнеса, вынести подтверждённые данные в CMS/config и добавить дату актуальности. |
| S13 | `src/App.jsx`, `vite.config.js` | Все pages импортируются eagerly. Build выдаёт chunk warning: 1.13 MB minified JS. | Добавить `React.lazy`/route-level code splitting; при необходимости выделить AntD/FullCalendar vendor chunks. Измерить результат, не просто поднять warning limit. |
| S14 | `src/pages/rent.css`, `src/components/gallerySwiper.css`, `src/pages/documents.css`, `src/pages/classes.css` | Fixed gallery heights 520/260 px, отсутствие mobile rules для document list actions и глобальные overrides создают риск crop/overflow. Classes использует JS `matchMedia` для структуры и отдельные CSS breakpoints. | Использовать responsive `aspect-ratio`/`clamp`, явно stack document actions, объединить breakpoint contract, проверить клавиатуру и 320 px. |
| S15 | `src/pages/Schedule.jsx`, `src/pages/schedule.css` | Если FullCalendar будет включён: события строятся для текущей недели в browser timezone; `timeZone` закомментирован; `min-height:860px`, `height:100%` и глобальный `overflow:hidden !important` могут скрыть расписание на mobile/zoom. | Хранить реальные ISO events, определить Warsaw timezone contract, вернуть доступный vertical scroll, задать mobile view (`timeGridDay`/list) и протестировать DST/воскресенье/resize. |
| S16 | `public/admin/index.html`, `public/admin/config.yml`, `netlify.toml` | Admin зависит от внешних CDN scripts; Decap URL использует semver range. Identity/Git Gateway не могут быть подтверждены только репозиторием. | Pin проверенную CMS version, добавить операционный checklist и проверить `/admin`, invite/recovery flow, Git Gateway permissions и commit в `main` на staging. |
| S17 | `index.html`, `src/App.jsx` | `<html lang="en">` конфликтует с default PL; favicon объявлен `image/svg+xml`, хотя файл JPEG; footer пишет `Lubon` без польского диакритического знака. | Исправить MIME, начальный/dynamic lang и подтвердить официальное написание бренда/города. |
| S18 | `src/pages/Prices.jsx`, `src/pages/Rent.jsx`, `src/pages/Teachers.jsx`, `src/pages/Contacts.jsx` | Внутренние CTA используют `href`/`window.location.href`, вызывая full reload. Query params `intent`, `plan`, `hall`, `teacher` страница Contacts не читает. CTA на самой Contacts ведёт на ту же страницу и ничего не меняет. | Использовать router navigation/Link, разобрать search params и prefill формы; удалить бессмысленный self-link. |
| S19 | `netlify.toml`, `package.json`, `package-lock.json` | Локальная проверка выполнена на Node 24, Netlify получает только общий `NODE_VERSION="20"`, а Vite 7 требует достаточно новую minor-версию Node. Окружения не воспроизводимы. | Выбрать одну поддерживаемую версию, совместимую с Vite, зафиксировать её в Netlify и `engines`/`.nvmrc`, затем проверить clean `npm ci && npm run build`. |

## Дублирование CSS — исправлено

Таблица ниже описывает исходный конфликт. После очистки точные глобальные имена удалены; используются `classes-*`, `schedule-*`, `prices-*`, `rental-*`, `documents-*`, `contacts-*`, а containers получили имена владельцев. Мобильное обнуление padding перенесено в единый список page-specific containers, поэтому внешний вид сохранён без скрытой зависимости от `schedule.css`.

| Selector | Где определён | Риск |
|---|---|---|
| `.card` | `styles.css`, `App.css`, `classes.css`, `schedule.css`, `prices.css`, `rent.css`, `documents.css`, `contacts.css` | Разные border, padding и shadow; page CSS изменяет Ant Card и карточки других routes. `App.css` сейчас не импортируется, остальные активны глобально. |
| `.section` | `styles.css`, `rent.css` | Rent добавляет global margin ко всем sections; Schedule дополнительно применяет `.section.card { padding:0 }` ко всем совпадениям. |
| `.cta-wrap` | `classes.css`, `rent.css`, `contacts.css` | Flex/grid и margin меняются каскадом. Стиль Contacts может управлять CTA Schedule/Prices/Rent. |
| `.cta-big` | `classes.css`, `prices.css`, `rent.css`, `contacts.css` | Сейчас декларации похожи, но являются четырьмя независимыми sources of truth. |
| `.video-aspect` | `classes.css`, `videoModal.css` | Player и modal взаимно переопределяют radius/layout; mobile Classes rule затрагивает modal. |
| `.container` | `styles.css`, mobile block `schedule.css` | Schedule снимает padding у всего приложения на ширине до 768 px. |

Дополнительные глобальные утечки: `.ant-tag` в `documents.css`; `.ant-list-item-meta-*` в `classes.css`; `.page-title` и FullCalendar selectors в общем `schedule.css`. Рекомендуемая граница — CSS Module на component/page плюс небольшой осознанный `globals.css` только для reset, variables и layout primitives.

## FullCalendar — исправлено

- Маршрут `/schedule` до и после очистки использует `ScheduleLight`.
- Неиспользуемый `src/pages/Schedule.jsx` удалён вместе с demo events, filters и calendar-only CSS.
- Удалены `@fullcalendar/core`, `@fullcalendar/interaction`, `@fullcalendar/react`, `@fullcalendar/timegrid`.
- `src/pages/schedule.css` теперь содержит только стили активной страницы с изображениями расписания.
- Изображения `grafik_1.jpg`, `grafik_2.jpeg`, `GallerySwiper` и весь активный schedule flow сохранены.

## Decap CMS и Netlify

### Что настроено корректно по структуре

- `/admin/index.html` загружает Netlify Identity Widget и Decap CMS.
- `backend.name: git-gateway`, `branch: main`; текущая Git branch также `main`.
- `netlify.toml` публикует `dist`, запускает `npm run build` и содержит SPA fallback.
- `media_folder: public/uploads` и `public_folder: /uploads` согласованы с Vite: source попадает в Git под `public/uploads`, published URL начинается с `/uploads`.
- `public/uploads/.gitkeep` гарантирует наличие каталога в clone.

### Внешние assumptions, которые обязательно проверить в Netlify UI

1. Site URL `https://shiny-tartufo-3eee17.netlify.app` действительно принадлежит этому проекту и совпадает с production/custom domain.
2. Netlify Identity включён именно для этого site.
3. Git Gateway включён, связан с нужным GitHub repository и может писать в `main`.
4. Registration policy, invitation emails, password recovery и роли редакторов настроены.
5. Invite/recovery ссылки приводят пользователя на страницу, где загружен Identity widget; сейчас widget есть только в `/admin/index.html`.
6. Branch protection допускает Git Gateway flow или используется editorial workflow/отдельная branch strategy.

### Проблемы collections

- `settings/social` указывает на отсутствующий `src/content/social.json`.
- `gallery` и `documents` указывают на отсутствующие folders.
- Frontend не импортирует ни одну из этих collections.
- Documents CMS по умолчанию создаст content entries, но `Documents.jsx` продолжит показывать только три PDF из `/assets/docs`.
- В CMS нет schema для расписания, teachers, prices, halls, контактов и основного контента — именно эти данные сейчас требуют ручного редактирования JSX.

## Runtime warnings и функциональные риски

Подтверждённых browser-console logs нет из-за ограничения browser-инструмента. Статически ожидаются:

- i18next debug logs из-за `debug: true`;
- `console.log(locale)` при смене языка;
- AntD deprecation warnings для Modal/Collapse/Card API, перечисленных в S6;
- возможные network/CORS/HTTP ошибки при отправке формы на Formspree placeholder;
- внешние network failures для Google Fonts, YouTube, Google Maps, Identity CDN и unpkg.

Build не сообщает о missing imports. Windows checkout и Git index используют имя `GallerySwiper.jsx` с корректным регистром для существующих imports, поэтому Linux casing error в текущем commit не подтверждён.

## Cleanup

| Файл/пакет | Вероятно не используется | Рекомендуемое действие |
|---|---|---|
| `src/App.jsx` | Import `Schedule` | Удалять только после решения между Calendar и Light. |
| `src/pages/Home.jsx` | Import `Card` | Удалить после усиления lint. |
| `src/pages/Classes.jsx` | Import `Divider` | Удалить после усиления lint. |
| `src/pages/Schedule.jsx` | Imports `React`, `Card`, `Row`, `Col` | Удалить, если компонент остаётся; весь файл — кандидат после продукт-решения. |
| `src/App.css` | Не импортируется; остаток Vite template (`.logo`, `.read-the-docs`, root demo styles) | Удалить после `rg` и visual baseline. Не импортировать как есть: он ограничит `#root` до 1280 px и добавит padding. |
| `src/components/header.css` | Не импортируется | Либо подключить как нужный Header style, либо перенести правила в module и удалить файл. |
| `public/vite.svg` | Ссылок нет | Удалить после финального asset scan. |
| `public/assets/header_logo.jpg`, `public/assets/main.jpg` | Ссылок в active code нет; `main.jpg` упомянут только в комментарии | Удалить после подтверждения владельца. |
| `@netlify/blobs`, пустой `netlify/functions` | Использования нет | Удалить package/directory либо реализовать планируемую function и документировать назначение. |
| FullCalendar quartet | Используется только недоступным `Schedule.jsx` | Удалить, если выбран `ScheduleLight`; иначе активировать и завершить calendar. |
| `eslint-config-prettier`, `eslint-plugin-import`, `eslint-plugin-react` | Не подключены в ESLint config | Подключить осознанно или удалить. Для React 19 всё ещё полезно настроить JSX/a11y/import rules отдельно. |
| `prettier` | Нет script/config | Добавить проверяемый format workflow или удалить зависимость. |
| `src/styles.css` | `.grid-3`; `.img-cover` используется только в закомментированном JSX | Удалять после визуальной проверки и поиска dynamic usage. |
| Комментарии/mock labels | Много `replace with your assets`, template comments и опечаток `shedule-*`, `begginers`, `groupe` | Исправить/удалить после content approval, сохраняя semantic migration CSS. |

## Optional improvements

| Файл/область | Улучшение |
|---|---|
| `src/main.jsx` | Добавить error boundary/monitoring и осознанно решить, нужен ли `StrictMode`. |
| `package.json` / CI | Добавить `npm ci`, lint и build в CI; затем smoke tests основных routes. |
| Pages | Добавить route-level tests для navigation, locale, form, PDF modal, video modal и schedule. |
| Home/media | Уважать `prefers-reduced-motion`, Save-Data и provide non-video hero. |
| Accessibility | Проверить focus states, Drawer focus, carousel announcements, clickable List.Items, пустые `<a>` без `href`, iframe titles и color contrast. |
| Privacy | Оценить consent/политику для YouTube, Google Maps, Google Fonts, Formspree и Netlify Identity. |
| SEO | Route-specific title/description, canonical, OG data, sitemap и согласованный PL/EN metadata. |
| CMS | Добавить preview styles, content validation, staged/editorial workflow и documented rollback. |

## План безопасной очистки по этапам

1. **Зафиксировать baseline.** Сделать staging deploy; сохранить скриншоты всех routes на 320/375/768/1024/1440 px; записать build size и browser console. Добавить минимальные smoke tests до удаления файлов.
2. **Закрыть production-блокеры.** Подключить реальную форму и реквизиты, оптимизировать homepage video/крупные изображения, подтвердить цены/адреса/соцсети.
3. **Принять решения по архитектуре контента.** Выбрать ScheduleLight или FullCalendar. Утвердить CMS schema, создать `src/content`, подключить entries к UI и проверить полный Git Gateway publish flow на staging.
4. **Изолировать стили без визуального redesign.** Вынести page styles в CSS Modules/namespaces, начиная с `.container` и `.card`; затем `.section`, `.cta-*`, `.video-aspect` и Ant overrides. После каждого route запускать screenshot comparison.
5. **Усилить проверки.** Исправить ESLint blind spot, deprecated Ant APIs, i18n state и 404. Добавить route lazy loading и performance budgets.
6. **Удалять только доказанно мёртвое.** По одному набору: unused imports, Vite template CSS/assets, legacy schedule/dependencies, unused Netlify package/functions, unused tooling. После каждого набора — `npm ci`, lint, build и route smoke test.
7. **Финальная production-валидация.** Проверить Netlify Identity invitation/recovery, CMS commit, uploads URL, SPA deep links, contact delivery, PL/EN, mobile layout, Web Vitals и rollback procedure.
