# Настройка Decap CMS

## Что настроено в репозитории

Админка находится в `public/admin` и после Vite build публикуется как `/admin/`.

- Decap CMS закреплён на версии `3.12.2` без диапазона версий.
- Netlify Identity Widget загружается до Decap CMS.
- Backend: `git-gateway`.
- Целевая ветка: `main`.
- Publish mode: `simple`, то есть CMS пишет непосредственно в `main`.
- Медиа сохраняются в репозитории в `public/uploads`.
- Публичный префикс медиа: `/uploads`.
- Имена медиа приводятся к безопасному ASCII-виду с дефисом вместо недопустимых символов.
- Используется только встроенная media library Decap CMS. Uploadcare, Cloudinary и другие внешние хранилища не настроены.

Версия `3.12.2` выбрана по [официальному релизу Decap CMS](https://github.com/decaporg/decap-cms/releases/tag/decap-cms%403.12.2). Назначение `media_folder`, `public_folder` и параметров `slug` соответствует [официальным Configuration Options](https://decapcms.org/docs/configuration-options/).

## Файлы и каталоги

```text
public/
  admin/
    index.html
    config.yml
  uploads/
    .gitkeep
src/
  content/
    social.json
    galleries/
      .gitkeep
    documents/
      .gitkeep
```

`social.json` существует заранее, поскольку Decap file collection может работать только с уже существующим файлом в backend-ветке. Это требование описано в [Decap File Collections](https://decapcms.org/docs/collection-file/).

## Обязательные настройки Netlify

В Netlify UI необходимо вручную проверить:

1. В `Project configuration → Build & deploy → Continuous deployment` подключён репозиторий `losikilya/dance_studio`.
2. Production branch — `main`.
3. Build command — `npm run build`.
4. Publish directory — `dist`.
5. Netlify Identity включён.
6. Registration настроен как `Invite only`, если публичная регистрация редакторов не нужна.
7. Нужный пользователь приглашён и подтвердил email.
8. В `Identity → Services → Git Gateway` Git Gateway включён и связан с текущим репозиторием.
9. GitHub access token Git Gateway действителен и принадлежит пользователю с правом записи в репозиторий.
10. Если в Git Gateway заполнено поле Roles, у редактора есть одна из разрешённых ролей.
11. Production deploy содержит актуальные `admin/index.html`, `admin/config.yml` и `uploads/.gitkeep`.
12. В `Build & deploy → Post processing` включены Pretty URLs, чтобы `/admin` обслуживался как `admin/index.html`.

Netlify указывает, что gateway token должен иметь достаточные права на связанный репозиторий. После переноса репозитория, изменения владельца либо перехода public/private Git Gateway может потребовать переподключения. См. [Netlify Git Gateway](https://docs.netlify.com/manage/security/secure-access-to-sites/git-gateway/).

## Обязательные настройки GitHub

В GitHub необходимо вручную проверить:

1. Репозиторий `losikilya/dance_studio` существует, а ветка `main` является актуальной production-веткой.
2. Учётная запись, которой Netlify авторизовал Git Gateway, имеет write-доступ к репозиторию.
3. Токен не истёк, не отозван и разрешён для этого репозитория.
4. Для fine-grained token доступно repository permission `Contents: write`. Это требование GitHub для [Create a blob](https://docs.github.com/en/enterprise-cloud@latest/rest/git/blobs).
5. Если репозиторий принадлежит организации с SSO/SAML, токен авторизован для этой организации.
6. Branch protection и rulesets позволяют выбранной gateway-учётной записи записывать в `main`.
7. Если прямой push в `main` запрещён, нельзя оставлять `publish_mode: simple` без разрешённого bypass. Переход на `editorial_workflow` должен быть отдельным осознанным решением.

## Deploy

1. Закоммитить CMS-файлы вместе с `src/content/social.json` и `.gitkeep`.
2. Отправить commit в GitHub.
3. Дождаться успешного production deploy Netlify.
4. Проверить, что `/admin/` загружает Decap CMS `3.12.2` и `config.yml` без ошибок.
5. Войти приглашённым Identity-пользователем.

## Обязательная post-deploy проверка

Локальная сборка не может подтвердить GitHub credentials и работу Git Gateway. После deploy нужно выполнить полный цикл:

1. Загрузить небольшой JPG с ASCII-именем, например `cms-test.jpg`.
2. Повторить для PNG, WebP и PDF.
3. Для каждого файла проверить commit в GitHub и путь `public/uploads/<file-name>`.
4. Открыть публичный URL `/uploads/<file-name>` после deploy.
5. Создать или изменить запись Galleries и убедиться, что image field сохраняет `/uploads/<file-name>`.
6. Создать запись Documents с PDF и убедиться, что file field сохраняет `/uploads/<file-name>.pdf`.
7. Изменить Social Links и проверить commit файла `src/content/social.json`.
8. Убедиться, что основной React-сайт визуально не изменился.

## Что проверяется локально

Локально можно подтвердить:

- корректность YAML;
- наличие обязательных файлов и каталогов;
- попадание `/admin/index.html`, `/admin/config.yml` и `/uploads/.gitkeep` в `dist`;
- HTTP-ответ `200` для локального `/admin/` и наличие ссылки на фиксированный CMS script;
- успешный Vite build.

Локально нельзя подтвердить:

- Identity login конкретного production-пользователя;
- права gateway token;
- запись blob/tree/commit/ref в GitHub;
- влияние production branch protection;
- появление нового upload URL после Netlify deploy.

Vite preview не применяет правила и Pretty URLs Netlify: локально следует открывать `/admin/` с завершающим слешем. На Netlify `/admin` сопоставляется со статическим `admin/index.html`; отдельный redirect `/admin → /admin/` добавлять не нужно. Netlify предупреждает, что правила для добавления/удаления завершающего слеша могут образовать цикл. См. [Netlify Redirect options: Trailing slash](https://docs.netlify.com/manage/routing/redirects/redirect-options/#trailing-slash).
