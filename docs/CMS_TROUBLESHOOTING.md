# Устранение проблем Decap CMS

## Быстрая карта проверки

| Симптом | Наиболее вероятный слой | Первая проверка |
|---|---|---|
| `/admin` показывает React-сайт или 404 | Deploy/static files | Наличие `dist/admin/index.html`, Pretty URLs и production deploy |
| CMS не загружается | CDN/script/config | Network для `decap-cms@3.12.2` и `config.yml` |
| Нет формы входа | Netlify Identity | Identity включён, widget загружен, пользователь приглашён |
| Вход успешен, чтение content не работает | Git Gateway/repository/branch | Linked repository, `backend.branch: main`, gateway token |
| `POST .../git/blobs` возвращает 400/403 | Gateway token или request payload | Response body, `x-nf-request-id`, `Contents: write` |
| Blob создаётся, но публикация падает позже | Branch protection/ref update | Rulesets, required PR, status checks, signed commits |
| Медиа закоммичено, но URL возвращает 404 | Deploy/public path | Файл в `public/uploads`, новый deploy, URL `/uploads/...` |
| Social Links не открываются | File collection | `src/content/social.json` существует в `main` и содержит валидный JSON |

## Ошибка `Failed to persist media: API_ERROR`

Для запроса `POST /.netlify/git/github/git/blobs` соберите в DevTools Network:

- полный response body;
- status и status text;
- response headers, особенно `x-nf-request-id`;
- время запроса и site URL;
- `content-type` и `content-length`;
- значение `encoding` и факт наличия непустого `content` в payload;
- имя, MIME type и исходный размер файла;
- точный URL загруженного Decap script.

Нельзя публиковать или пересылать:

- `Authorization` header;
- Identity JWT;
- cookies;
- GitHub/Netlify tokens;
- полный base64-контент файла.

Длинное поле `content` замените на `<redacted, N characters>`.

## Контрольный upload

Начните с валидного файла 10–100 KB:

- `cms-test.jpg`;
- только ASCII в имени;
- без пробелов, `#`, `?`, `%` и `+`.

Затем отдельно проверьте PNG, WebP и PDF. Если маленькие файлы работают, а большие нет, сравните `content-length`. GitHub документирует blobs до 100 MB, но Netlify не публикует отдельный гарантированный лимит тела запроса для Git Gateway. Binary upload передаётся как base64 и становится больше исходного файла.

## Если падают все файлы

1. Проверить, что Netlify site связан с правильным GitHub repository.
2. Проверить, что Git Gateway показывает тот же repository.
3. Проверить production branch и `backend.branch` — обе должны быть `main`.
4. Проверить владельца и срок действия gateway token.
5. Проверить право `Contents: write`.
6. Если repository переносился, переименовывался или менял видимость, переподключить Git Gateway.
7. Повторить контрольный upload и сохранить новый `x-nf-request-id`.

Успешный Identity login не доказывает наличие у Git Gateway права записи в GitHub.

## Если проблема только у одного пользователя

1. Выйти из Identity и войти снова, чтобы обновить JWT.
2. Проверить, подтвердил ли пользователь приглашение.
3. Сверить Identity roles пользователя с Roles в настройках Git Gateway.
4. Проверить тот же upload другим разрешённым редактором.

## Если upload проходит, но publish не работает

Проверьте GitHub branch protection и rulesets для `main`:

- required pull request;
- required status checks;
- restricted pushes;
- required signed commits;
- отсутствие bypass у gateway-учётной записи.

Текущий `publish_mode: simple` пишет прямо в `main`. `editorial_workflow` создаёт ветки и pull requests, но его не следует включать как случайный workaround: это изменение редакционного процесса.

## Если публичный файл возвращает 404

1. В GitHub файл должен находиться в `public/uploads`, а не в `uploads` или `dist/uploads`.
2. Netlify должен выполнить новый deploy commit, содержащего файл.
3. В deploy output файл должен быть доступен как `dist/uploads/<name>`.
4. URL должен иметь вид `/uploads/<name>`.
5. Не добавляйте `public` в публичный URL.
6. Проверьте регистр букв в имени файла.

## Если CMS не видит `social.json`

Проверьте:

- файл находится в `src/content/social.json` в remote-ветке `main`;
- JSON валиден;
- файл не пуст;
- `config.yml` ссылается на путь с тем же регистром.

Минимально валидное содержимое:

```json
{
  "instagram": "",
  "whatsapp": "",
  "facebook": ""
}
```

## Кеширование и версия CMS

Админка закреплена на `decap-cms@3.12.2`. В Network URL не должен содержать caret или другую версию. После deploy:

1. выполнить hard reload `/admin/`;
2. проверить response URL CMS script;
3. проверить, что `config.yml` взят из текущего deploy;
4. при подозрении на старый deploy сравнить deploy commit SHA с GitHub.

Не заменяйте фиксированную версию на `latest` или диапазон `^3.x` во время диагностики.

## Данные для поддержки Netlify

Если настройки верны, а gateway продолжает отвечать ошибкой, подготовьте:

- site name и deploy ID;
- время ошибки с часовым поясом;
- `x-nf-request-id`;
- HTTP status и очищенный response body;
- тип и размер контрольного файла;
- linked repository и branch;
- подтверждение, что токен имеет write-доступ;
- подтверждение, что secrets/JWT удалены из HAR.

Git Gateway помечен Netlify как deprecated: существующие сайты продолжают работать, но сервис получает только security fixes. После восстановления текущей интеграции стоит отдельно запланировать миграцию, не смешивая её с аварийным исправлением. См. [Netlify Git Gateway](https://docs.netlify.com/manage/security/secure-access-to-sites/git-gateway/).
