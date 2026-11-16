# Static route prerendering and SEO

## Previous limitation

The site was delivered as one Vite SPA document. Every direct request initially received the Home metadata and an empty `#root`; `SiteSeo` replaced metadata only after React mounted. Crawlers that do not run JavaScript therefore could not see route-specific metadata or page content.

## Chosen approach

The application remains a React 19 + Vite 7 SPA using React Router 7 in declarative mode. The build creates a temporary Vite SSR bundle and uses React Router's `StaticRouter` with React's `renderToString` to generate HTML. This is build-time rendering only: the SSR bundle is deleted after generation and no Node server or Netlify Function is deployed.

React Router framework mode also supports prerendering, but adopting it would require converting the existing declarative routes into route modules and changing the build/runtime structure. The small static-render pass retains the current architecture while using React Router's official server-safe router.

## Build pipeline

`npm run build` performs these steps:

1. Vite builds the normal browser assets into `dist`.
2. Vite builds the temporary `src/entry-server.jsx` renderer into `.prerender`.
3. `scripts/prerender.mjs` renders every public route in Polish and writes its `index.html`.
4. The script generates `dist/sitemap.xml` from the same route configuration.
5. `scripts/verify-prerender.mjs` validates every page and both sitemap copies. Any missing or invalid route fails the build.
6. The temporary server bundle is removed and the generated route list is printed.

No browser automation or Chromium dependency is involved.

## Generated routes

- `/`
- `/teachers`
- `/directions`
- `/schedule`
- `/prices`
- `/rent`
- `/contacts`
- `/documents`

`/admin` is not public and is not generated. `/classes` is not a page; Netlify returns a real 301 redirect to `/directions`.

## Client hydration and i18n

Generated roots carry a `data-prerendered-path` marker. On a matching direct request, `src/main.jsx` uses React 19's `hydrateRoot`; unknown routes served through the SPA fallback use `createRoot` so Home prerendered markup is not incorrectly hydrated at another URL.

Polish is loaded for the initial hydration render so it exactly matches the generated markup. If the visitor previously selected English, the saved preference is applied in a post-hydration React effect. Client navigation and the existing language switch continue to use the browser i18n backend and `SiteSeo` continues to update metadata after navigation.

## Browser-only behavior

Browser APIs are not executed during the render pass. Responsive `matchMedia` setup already runs in an effect, while document downloads, scrolling, navigation, modals, drawers, and image measurements only run from effects or event handlers. The current schedule implementation uses an Ant Design carousel rather than FullCalendar, so no `ClientOnly` wrapper is necessary.

## Adding a public route

1. Add one entry to `PUBLIC_ROUTE_CONFIG` in `src/routeConfig.js`.
2. Add its component under the matching route `id` in `src/routes.jsx`.
3. Add Polish and English metadata under the route path in `src/seo/seoConfig.js`.
4. Update `public/sitemap.xml` to match the route order.
5. Run `npm run build` and `npm run lint`.

The route config is consumed by client routing, prerendering, sitemap generation, and build verification. Verification rejects missing components at render time, missing SEO records, extra SEO routes, missing output files, and sitemap drift.

## SEO metadata

`src/seo/seoConfig.js` remains the metadata source of truth. The prerender script reads it directly and always builds canonical URLs from `https://www.dancepointlubon.pl`. Each static document contains its title, description, robots directive, canonical, Open Graph data, Twitter Card data, H1, and rendered page content before JavaScript runs.

## Netlify behavior

Netlify serves existing static files such as `/teachers/index.html` normally. Redirect rules remain ordered with the forced `/classes` 301 first and the `/* -> /index.html` 200 SPA fallback second. There is no runtime SSR service.

## Known limitations

- Only the default Polish URL version is prerendered because the application has no language-specific URLs.
- Unknown paths use the Home document as the Netlify SPA fallback, then mount the unmatched client route without hydrating that Home markup.
- Client-side navigation still updates head metadata in `SiteSeo` after React renders; build-time metadata applies to direct requests for configured public routes.
