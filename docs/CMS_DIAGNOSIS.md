# Диагностика Decap CMS и Netlify Git Gateway

Дата проверки: 8 августа 2026 года.

## Область и ограничения проверки

Диагностика выполнена без изменения production-кода и конфигурации. Проверены локальные файлы проекта, структура репозитория и официальные спецификации Decap CMS, Netlify Git Gateway и GitHub REST API.

Из локального репозитория нельзя достоверно увидеть:

- фактически связанный с сайтом репозиторий в Netlify;
- production branch, выбранную в Netlify UI;
- текущий GitHub access token Git Gateway и его права;
- роли конкретного Netlify Identity пользователя;
- правила защиты веток и rulesets на GitHub;
- тело ответа проблемного production-запроса;
- точную версию скрипта, в которую CDN разрешил диапазон `^3.1.9` в момент загрузки страницы.

Поэтому главный вывод ниже является обоснованной гипотезой. Для окончательного диагноза необходимо тело ответа из DevTools Network.

## Краткий вывод

Наиболее вероятная причина постоянного `400 Bad Request` при загрузке любого медиафайла — устаревшая, отозванная или недостаточно привилегированная GitHub-авторизация внутри Git Gateway либо устаревшая связь Git Gateway с репозиторием `losikilya/dance_studio`.

Почему это наиболее вероятно:

1. Netlify Identity и Git Gateway отвечают за разные уровни доступа. Успешный вход через Identity подтверждает личность пользователя, но не подтверждает, что GitHub access token, которым Git Gateway пишет в репозиторий, всё ещё действителен и имеет право записи.
2. Netlify прямо указывает, что gateway-токен должен принадлежать пользователю с достаточными правами на связанный репозиторий. После смены владельца репозитория или перехода public/private связь может потребовать переподключения. См. [Netlify Git Gateway: Setup and settings](https://docs.netlify.com/manage/security/secure-access-to-sites/git-gateway/).
3. Проблемный путь `/.netlify/git/github/git/blobs` проксируется Git Gateway в GitHub Git Database API для связанного репозитория. Для `Create a blob` GitHub требует repository permission `Contents: write`. См. [GitHub REST API: Create a blob](https://docs.github.com/en/enterprise-cloud@latest/rest/git/blobs).
4. Сбой происходит на создании blob — до добавления пути файла в tree, создания commit и обновления ветки. Поэтому `media_folder`, `public_folder` и branch protection не являются первыми кандидатами именно для этого запроса.
5. Локальный `config.yml` синтаксически валиден, `backend.name` корректен, а `backend.branch: main` совпадает с текущей локальной веткой.

Если маленький файл с простым ASCII-именем загружается, а большой или конкретный файл — нет, приоритет гипотез меняется: сначала следует проверять размер, фактическое содержимое request body и конкретную версию Decap CMS.

## Результаты проверки по пунктам

### 1. `public/admin/index.html`

Файл существует и находится в ожидаемом для Vite статическом каталоге.

- Identity Widget подключён на строке 15.
- Decap CMS подключён на строке 16.
- оба скрипта имеют `defer`;
- обработчик `DOMContentLoaded` только подписывает неавторизованного пользователя на reload после login;
- нестандартного `CMS.init()`, кастомного backend или перехвата upload нет.

Критической ошибки порядка загрузки не найдено. `defer`-скрипты исполняются в порядке документа, поэтому Identity Widget загружается до Decap CMS. Официальные примеры также подключают Identity Widget перед CMS; Decap документирует загрузку CMS через `defer`. См. [Decap: Choosing a Backend](https://decapcms.org/docs/choosing-a-backend/) и [Decap: Custom Mount Element](https://decapcms.org/docs/custom-mounting/).

Рекомендация после устранения инцидента: упростить комментарии и обработчик login только отдельным рефакторингом с browser-проверкой. Для исправления текущего `400` это не требуется.

### 2. Версия Decap CMS

В HTML указана не фиксированная версия, а CDN-диапазон:

```html
https://unpkg.com/decap-cms@^3.1.9/dist/decap-cms.js
```

Это означает совместимую версию `>=3.1.9 <4.0.0`, которую выбирает CDN. Точную production-версию по репозиторию определить нельзя.

Риски:

- разные моменты загрузки и CDN-кеши могут дать разные 3.x-релизы;
- невозможно однозначно сопоставить ошибку с конкретным релизом Decap CMS;
- обновление в пределах диапазона может произойти без коммита в проекте.

Для точной версии в DevTools нужно открыть запрос `decap-cms.js` и записать финальный URL после redirect и релевантные response headers. Фиксировать версию следует только после воспроизведения и теста; само по себе pinning не доказывает исправление Git Gateway.

### 3. `public/admin/config.yml`: YAML и backend

Файл успешно разобран YAML-парсером. Ошибок отступов, дубликатов ключей верхнего уровня и некорректного inline YAML не обнаружено.

Текущие ключевые значения:

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: public/uploads
public_folder: /uploads
```

`backend.name: git-gateway` соответствует официальной конфигурации [Decap Git Gateway backend](https://decapcms.org/docs/git-gateway-backend/). Ветка `main` существует локально и совпадает с текущей checkout-веткой. Git remote указывает на `git@github.com:losikilya/dance_studio.git`.

В `netlify.toml` production branch не задаётся. Фактическую production branch необходимо сверить вручную в Netlify UI. Локально подтвердить, что Netlify связан именно с этим remote и веткой `main`, невозможно.

### 4. `media_folder` и `public_folder`

Текущая пара корректна для Vite:

- `media_folder: public/uploads` — repository-relative путь, куда Decap должен закоммитить файл;
- `public_folder: /uploads` — URL после копирования содержимого `public` в корень `dist`.

Именно такие разные назначения этих параметров описывает [Decap Configuration Options](https://decapcms.org/docs/configuration-options/) и [Decap Configure CMS](https://decapcms.org/docs/configure-decap-cms/).

`public/uploads/.gitkeep` существует, пуст и отслеживается Git. Каталог, таким образом, существует в ветке репозитория.

Эта пара путей не является вероятной причиной сбоя `Create a blob`: Git blob создаётся из содержимого до того, как blob SHA добавляется в tree под `public/uploads/<filename>`.

### 5. Collections и существование целевых файлов

Найдена отдельная подтверждённая ошибка конфигурации:

- file collection ссылается на `src/content/social.json`;
- файла `src/content/social.json` нет;
- каталога `src/content` сейчас нет;
- также нет каталогов `src/content/galleries` и `src/content/documents`.

Для file collection целевой файл обязан заранее существовать в backend-ветке и содержать валидное значение. Для JSON минимальным валидным содержимым может быть `{}`. Это прямое требование [Decap File Collections](https://decapcms.org/docs/collection-file/).

Отсутствующие folder collection-каталоги менее критичны: при `create: true` CMS может создать новый entry и соответствующий путь при первом успешном commit. Их следует создать/проверить в рамках настройки контентной модели, но они не объясняют отказ GitHub на этапе создания медиа-blob.

Рекомендуемое отдельное действие после подтверждения: создать и закоммитить `src/content/social.json` с валидной структурой, ожидаемой сайтом, либо удалить collection только если будет доказано, что она не нужна. В рамках этой диагностики ничего не создавалось.

### 6. `publish_mode`

`publish_mode` отсутствует. По документации это эквивалентно `simple`: сохранение идёт прямо в ветку из `backend.branch`. Допустимые значения — `simple`, `editorial_workflow` и пустое значение, равное `simple`. См. [Decap Configuration Options: Publish Mode](https://decapcms.org/docs/configuration-options/) и [Decap Editorial Workflows](https://decapcms.org/docs/editorial-workflows/).

Текущая настройка совместима с Git Gateway. Включение `editorial_workflow` не является исправлением `POST .../git/blobs`: workflow меняет ветки/PR после создания blob. Не следует менять publish mode до выяснения правил защиты `main` и желаемого редакционного процесса.

Если `main` запрещает прямые записи, `simple` может позже упасть на обновлении ref даже после исправления blob. Тогда нужно осознанно выбрать одно из решений:

- разрешить gateway-учётной записи прямую запись в `main`;
- корректно настроить bypass для нужной учётной записи/интеграции;
- перейти на `editorial_workflow` и проверить создание веток и pull requests.

### 7. `media_library` и Uploadcare

Глобального блока `media_library` нет. `uploadcare` не настроен, его public key и внешний storage не используются. Следовательно, ошибочного Uploadcare provider block, способного перенаправить upload, не обнаружено.

В поле PDF присутствует:

```yaml
media_library: { allow_multiple: false }
```

Это не Uploadcare-блок, но такая вложенность `allow_multiple` не показана в текущем официальном формате. В документации `allow_multiple` описан как option самого file/image widget, а provider-specific параметры помещаются в `media_library.config`. См. [Decap File Widget](https://decapcms.org/docs/widgets/file/) и [Decap Image Widget](https://decapcms.org/docs/widgets/image/).

Безопасная нормализация после подтверждения выглядела бы так:

```yaml
- label: File (PDF)
  name: file
  widget: file
  allow_multiple: false
```

Вероятнее всего текущий вложенный ключ игнорируется. Он не выглядит причиной `400` на Git blob, поскольку запрос до Git Gateway уже отправляется.

### 8. `netlify.toml`

Файл синтаксически прост и не содержит CMS/Git Gateway overrides:

- build command: `npm run build`;
- publish directory: `dist`;
- Node.js 20;
- SPA fallback `/* -> /index.html` со статусом 200;
- functions directory: `netlify/functions`.

Redirect не должен перехватывать служебный `/.netlify/git/...`: это системный endpoint Netlify. Нестандартных headers, proxy redirects или edge functions для него нет.

### 9. Ветка Netlify и защита GitHub

Подтверждено локально:

- текущая ветка: `main`;
- `backend.branch`: `main`;
- remote: `losikilya/dance_studio`.

Не подтверждено:

- production branch проекта Netlify;
- linked repository в настройках Git Gateway;
- наличие `main` в production remote в точности с тем же регистром;
- branch protection/rulesets;
- права gateway token.

Branch protection может запрещать прямой commit из режима `simple`: обязательные pull requests, status checks, signed commits или ограничения push описаны в [GitHub Protected Branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches).

Однако это маловероятная непосредственная причина именно `POST /git/blobs`. Blob не привязан к ветке; защита ветки обычно проявится позже при создании/обновлении ref. Проверить protection всё равно необходимо, чтобы после устранения первой ошибки не получить следующую.

### 10. Ограничения имени, типа и размера файла

GitHub `Create a blob` принимает `content` и `encoding` (`utf-8` либо `base64`), требует `Contents: write` и документирует blobs до 100 MB. Официальные upstream-статусы для этого endpoint: `201`, `403`, `404`, `409`, `422`; `400` в этом списке не указан. См. [GitHub REST API: Git blobs](https://docs.github.com/en/enterprise-cloud@latest/rest/git/blobs).

Из этого следуют два важных вывода:

1. `400` может быть сформирован или нормализован прокси-слоем Netlify, поэтому response body важнее одного status code.
2. Ограничение GitHub в 100 MB не гарантирует, что весь путь browser → Netlify Git Gateway → GitHub принимает request body такого размера. В официальной Netlify-документации на Git Gateway отдельный допустимый размер upload для этого proxy не указан.

Для binary media Decap передаёт base64. Base64 увеличивает request body примерно на треть относительно исходного файла, не считая JSON-обёртки. Поэтому диагностический тест должен начинаться с файла существенно меньше любых лимитов.

Имя файла влияет на будущий tree path, но не входит в обязательные параметры GitHub `Create a blob`; поэтому необычное имя менее вероятно как причина отказа именно на этом endpoint. Всё равно следует выполнить контрольный тест:

- имя `cms-test.jpg` или `cms-test.pdf`;
- только ASCII, без пробелов, кириллицы, диакритики, `#`, `?`, `%`, `+`;
- размер, например, 10–100 KB;
- валидное содержимое, соответствующее расширению.

Image widget официально принимает `jpg`, `jpeg`, `webp`, `gif`, `png`, `bmp`, `tiff`, `svg`. File widget предназначен для произвольных файлов и позволяет задать `media_library.config.max_file_size`. См. [Decap Widgets](https://decapcms.org/docs/widgets/) и [Decap File Widget](https://decapcms.org/docs/widgets/file/).

## Что нужно из Network Response для точного диагноза

Для одного неуспешного `POST /.netlify/git/github/git/blobs` нужно сохранить HAR либо предоставить следующие данные.

### Response

- полный response body как JSON или text;
- поля `message`, `error`, `status`, `errors`, `documentation_url`, если они есть;
- HTTP status и status text;
- response headers `content-type`, `content-length`, `x-nf-request-id` и другие request-id headers;
- время запроса с часовым поясом.

`x-nf-request-id` особенно полезен для сопоставления запроса в Netlify support/logs.

### Request

- финальный Request URL и Origin;
- Request Method;
- request headers `content-type` и `content-length`, если видны;
- структура Request Payload: наличие непустого `content` и значение `encoding`;
- длина base64-строки или оценка decoded size;
- имя, расширение, MIME type и исходный размер файла.

Не передавать:

- `Authorization` header;
- Identity JWT;
- cookies;
- access token;
- полный base64-контент пользовательского файла.

Достаточно заменить длинное `content` на `<redacted, N characters>`.

### Сравнительные наблюдения

Нужны ответы на три вопроса:

1. Падает ли маленький ASCII-файл 10–100 KB?
2. Удаётся ли сохранить текстовое изменение entry без нового media?
3. Падают ли все Identity-пользователи или только один?

Интерпретация:

- падают все файлы и все пользователи — в первую очередь gateway token/repository link;
- падает только один пользователь — Identity role/JWT/пользовательская сессия;
- падают только большие файлы — payload/size limit;
- падают только отдельные имена — path normalization/filename;
- media загружается, но publish entry падает позже — branch protection, missing content target или схема collection.

## Минимальный безопасный `config.yml`

Ниже — минимальная конфигурация для текущей модели, а не патч, применённый к проекту. Она сохраняет Git Gateway, `main`, Vite-пути и простой publish mode. Перед её применением `src/content/social.json` должен существовать в `main` и содержать как минимум `{}`.

```yaml
backend:
  name: git-gateway
  branch: main

site_url: https://shiny-tartufo-3eee17.netlify.app
display_url: https://shiny-tartufo-3eee17.netlify.app

publish_mode: simple

media_folder: public/uploads
public_folder: /uploads

collections:
  - name: settings
    label: Site Settings
    files:
      - name: social
        label: Social Links
        file: src/content/social.json
        fields:
          - { label: Instagram, name: instagram, widget: string, required: false }
          - { label: WhatsApp, name: whatsapp, widget: string, required: false }
          - { label: Facebook, name: facebook, widget: string, required: false }

  - name: gallery
    label: Galleries
    folder: src/content/galleries
    create: true
    slug: "{{slug}}"
    fields:
      - { label: Title, name: title, widget: string }
      - label: Images
        name: images
        widget: list
        field: { label: Image, name: src, widget: image }

  - name: documents
    label: Documents
    folder: src/content/documents
    create: true
    slug: "{{slug}}"
    fields:
      - { label: Title, name: title, widget: string }
      - { label: File (PDF), name: file, widget: file, allow_multiple: false }
      - { label: Tags, name: tags, widget: list, required: false }
      - { label: Description, name: description, widget: text, required: false }
      - { label: Updated At, name: updatedAt, widget: datetime, format: YYYY-MM-DD, time_format: false }
```

Что намеренно не добавлено:

- `media_library.name: uploadcare`;
- GitHub `repo` или OAuth credentials в клиентский файл;
- `editorial_workflow`;
- новые библиотеки;
- нестандартный proxy/backend.

Опциональный `max_file_size` следует добавлять только после определения фактического допустимого лимита и бизнес-требований. Он является клиентским ограничителем, а не исправлением gateway token.

## Что проверить вручную в Netlify

1. **Site repository.** В `Project configuration → Build & deploy → Continuous deployment` убедиться, что сайт связан с `losikilya/dance_studio`, а не с fork/старым репозиторием.
2. **Production branch.** Убедиться, что production branch — `main`, и она совпадает с `backend.branch`.
3. **Git Gateway repository.** В `Project configuration → Identity → Services → Git Gateway` проверить отображаемый linked repository. Netlify указывает, что этот repository определяется connected repository и напрямую не редактируется; при неправильной связи сначала исправляется site repository. См. [Netlify Git Gateway](https://docs.netlify.com/manage/security/secure-access-to-sites/git-gateway/).
4. **GitHub access token.** Проверить владельца токена, срок действия, revocation и наличие write-доступа к текущему repository. Для GitHub blob нужен `Contents: write`.
5. **Reconnect history.** Если repository переименовывался, переносился между owners/organizations или менял public/private, переподключить Git Gateway официальным способом и создать новую авторизацию.
6. **Identity roles.** Если в Git Gateway заполнено поле Roles, у пользователя должна быть хотя бы одна совпадающая роль. Для изоляции проблемы записать текущие роли, но не ослаблять доступ без согласования.
7. **Deploy freshness.** Убедиться, что production deploy содержит текущие `public/admin/index.html` и `config.yml`, а не старую сборку.
8. **Request ID.** Сохранить `x-nf-request-id` проблемного запроса; при необходимости передать Netlify support вместе со временем запроса.

Netlify сейчас помечает Git Gateway как deprecated и сообщает, что существующие конфигурации продолжают работать, но получают security fixes без обычных bug fixes. Это не повод менять архитектуру в рамках аварийного исправления, но это эксплуатационный риск, который стоит вынести в отдельный будущий migration plan. См. [Netlify Git Gateway deprecation notice](https://docs.netlify.com/manage/security/secure-access-to-sites/git-gateway/).

## Что проверить вручную в GitHub

1. Репозиторий `losikilya/dance_studio` существует и доступен владельцу gateway token.
2. У этой учётной записи есть write/maintain/admin access, достаточный для записи Contents.
3. Fine-grained PAT, GitHub App installation либо legacy token, используемый Netlify, имеет доступ именно к этому repository и не истёк.
4. Organization SSO/SAML, если используется, авторизует токен для организации.
5. Ветка `main` существует в remote.
6. Branch protection и rulesets не запрещают прямой push в `main` для режима `simple`.
7. Если требуются signed commits, обязательный PR или status checks, решить это отдельно: разрешённый bypass либо `editorial_workflow` после теста.
8. В audit log организации, если доступен, проверить denied/revoked token events в момент `x-nf-request-id`.

## Пошаговый план исправления

### Этап 1. Зафиксировать точную ошибку без изменений

1. Очистить Network panel, включить Preserve log.
2. Загрузить маленький валидный файл с ASCII-именем.
3. Сохранить response body, безопасные headers, `x-nf-request-id`, payload metadata и точную версию Decap script.
4. Повторить с обычным проблемным файлом и сравнить размер/имя/response.
5. Проверить сохранение entry без нового media.

Критерий выхода: понятно, проблема общая или зависит от файла.

### Этап 2. Проверить связь Netlify ↔ GitHub

1. Сверить connected repository и production branch в Netlify.
2. Сверить repository Git Gateway.
3. Проверить токен/учётную запись и `Contents: write`.
4. Проверить Identity Roles.
5. Если Netlify/GitHub подтверждает stale или revoked credential, переподключить Git Gateway и выдать новый минимально достаточный токен.

Критерий выхода: маленький upload получает `201` через gateway и появляется как commit/tree update.

### Этап 3. Проверить ветку и workflow

1. Проверить protection/rulesets `main`.
2. Попробовать публикацию тестового entry.
3. Если blob создаётся, но ref update запрещён, выбрать согласованный способ: bypass для gateway либо `editorial_workflow`.
4. Не менять workflow только ради маскировки ошибки blob.

Критерий выхода: полный цикл upload → save → commit/deploy успешен.

### Этап 4. Исправить подтверждённые локальные дефекты CMS

1. Создать валидный `src/content/social.json` в `main` согласно ожидаемой сайтом структуре.
2. Проверить создание/чтение `src/content/galleries` и `src/content/documents`.
3. Перенести `allow_multiple: false` на уровень file widget.
4. Явно оставить `publish_mode: simple`, если прямые записи разрешены, либо включить workflow только по принятому решению.
5. После воспроизведения на известной версии рассмотреть pinning Decap CMS на точный проверенный 3.x-релиз.

Критерий выхода: CMS загружает все collections без 404/parse errors.

### Этап 5. Регрессионная проверка

1. PNG/JPEG малого размера.
2. PDF малого размера.
3. Файл с кириллическим именем и файл с пробелом — только после успешного ASCII-контроля.
4. Файл около принятого продуктового лимита.
5. Создание gallery entry и document entry.
6. Изменение Social Links.
7. Проверка нового production deploy и URL `/uploads/<file>`.

## Приоритет гипотез

| Приоритет | Гипотеза | Почему | Как подтвердить |
|---|---|---|---|
| 1 | Stale/revoked/insufficient Git Gateway GitHub token или старая repository link | Identity работает независимо; Create Blob требует `Contents: write` | Response body, linked repo, token owner/permissions, reconnect history |
| 2 | Ограничение размера или некорректный request body | Вероятно, если сбой зависит от файла; base64 увеличивает payload | Маленький ASCII-файл, `content-length`, payload `encoding/content` |
| 3 | Ошибка/регрессия конкретной динамически загруженной Decap 3.x-версии | Версия не закреплена | Финальный CDN URL, повтор на зафиксированной версии в staging |
| 4 | Identity role/session | Вероятно, только если проблема у части пользователей | Сравнение пользователей, Roles, новый login/JWT |
| 5 | Branch protection | Может блокировать прямой publish, но обычно позже Create Blob | GitHub rules, успешный blob и неуспешный ref update |
| 6 | `media_folder`/`public_folder` | Значения корректны и path появляется после blob | Успешный blob, ошибка tree/commit с path |
| 7 | Missing `social.json` | Реальный дефект file collection, но не причина media blob POST | Ошибка загрузки settings collection, отдельный 404 |
| 8 | Вложенный `allow_multiple` | Недокументированный/вероятно игнорируемый option, не backend auth | Исправить отдельно после главной причины |

## Итог

Локальная CMS-конфигурация содержит два исправимых дефекта — отсутствующий target file `src/content/social.json` и недокументированное размещение `allow_multiple`. При этом `backend`, branch, media paths, script order, YAML, `.gitkeep` и отсутствие Uploadcare не дают объяснения отказу именно на `POST .../git/blobs`.

Первое действие для точного диагноза — получить response body и `x-nf-request-id`. Если контрольный маленький файл также падает, наиболее безопасный следующий шаг — проверить и при необходимости восстановить Git Gateway connection/token для правильного GitHub repository с правом `Contents: write`, не меняя CMS-архитектуру.
