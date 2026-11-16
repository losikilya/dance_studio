import { access, readFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { PUBLIC_ROUTE_CONFIG } from '../src/routeConfig.js'
import {
  DEFAULT_LANGUAGE,
  DEFAULT_ROBOTS,
  SEO_CONTENT,
  getCanonicalUrl,
  getSeoContent,
} from '../src/seo/seoConfig.js'

const projectDirectory = process.cwd()
const distDirectory = path.join(projectDirectory, 'dist')

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')

const outputFileForRoute = (pathname) => pathname === '/'
  ? path.join(distDirectory, 'index.html')
  : path.join(distDirectory, pathname.slice(1), 'index.html')

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function sitemapLocations(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
}

export async function verifyPrerender() {
  const paths = PUBLIC_ROUTE_CONFIG.map(({ path: pathname }) => pathname)
  const expectedUrls = paths.map(getCanonicalUrl)

  assert(new Set(paths).size === paths.length, 'Public route paths must be unique')
  assert(paths.every((pathname) => SEO_CONTENT[pathname]), 'Every public route must have SEO content')
  assert(
    Object.keys(SEO_CONTENT).every((pathname) => paths.includes(pathname)),
    'seoConfig.js contains a route that is not in the public route configuration',
  )

  for (const pathname of paths) {
    const file = outputFileForRoute(pathname)
    const html = await readFile(file, 'utf8')
    const seo = getSeoContent(pathname, DEFAULT_LANGUAGE)
    const canonical = getCanonicalUrl(pathname)
    const escapedTitle = escapeHtml(seo.title)
    const escapedDescription = escapeHtml(seo.description)
    const escapedCanonical = escapeHtml(canonical)

    assert(/<html\s[^>]*lang="pl"/i.test(html), `${pathname}: missing <html lang="pl">`)
    assert(html.includes(`<title>${escapedTitle}</title>`), `${pathname}: incorrect title`)
    assert(html.includes(`name="description" content="${escapedDescription}"`), `${pathname}: incorrect description`)
    assert(html.includes(`name="robots" content="${DEFAULT_ROBOTS}"`), `${pathname}: incorrect robots metadata`)
    assert(html.includes(`rel="canonical" href="${escapedCanonical}"`), `${pathname}: incorrect canonical`)
    assert(html.includes(`property="og:title" content="${escapedTitle}"`), `${pathname}: incorrect og:title`)
    assert(html.includes(`property="og:description" content="${escapedDescription}"`), `${pathname}: incorrect og:description`)
    assert(html.includes(`property="og:url" content="${escapedCanonical}"`), `${pathname}: incorrect og:url`)
    assert(html.includes('name="twitter:card" content="summary"'), `${pathname}: missing Twitter card`)
    assert(html.includes(`name="twitter:title" content="${escapedTitle}"`), `${pathname}: incorrect Twitter title`)
    assert(html.includes(`name="twitter:description" content="${escapedDescription}"`), `${pathname}: incorrect Twitter description`)
    assert(!html.includes('.netlify.app'), `${pathname}: contains a Netlify preview URL`)
    assert(html.includes(`data-prerendered-path="${pathname}"`), `${pathname}: missing hydration route marker`)
    assert(html.includes('data-css-hash='), `${pathname}: missing server-rendered Ant Design styles`)
    assert(!html.includes('class="page-loading"'), `${pathname}: contains a lazy-route fallback instead of page content`)
    assert(!html.includes('Switched to client rendering'), `${pathname}: static rendering failed`)

    // Missing lazy CSS or generated images can pass the SEO checks but break
    // the first paint. Verify every local stylesheet and responsive image.
    const localAssets = new Set([
      ...[...html.matchAll(/<link\b[^>]*href="(\/(?:static|media)\/[^\"]+)"/g)].map(match => match[1]),
      ...[...html.matchAll(/(?:src|srcSet)="(\/media\/[^\"]+)"/g)]
        .flatMap(match => match[1].split(', ').map(candidate => candidate.split(' ')[0])),
    ])
    for (const asset of localAssets) {
      await access(path.join(distDirectory, asset))
    }

    const h1 = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i)
    assert(h1 && h1[0].replace(/<[^>]+>/g, '').trim(), `${pathname}: missing a non-empty H1`)

    const root = html.match(/<div id="root"[^>]*>([\s\S]*)<\/div>\s*<\/body>/i)
    const textContent = root?.[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() ?? ''
    assert(textContent.length >= 100, `${pathname}: prerendered page content is unexpectedly short`)

    if (pathname !== '/') {
      assert(!html.includes('rel="canonical" href="https://www.dancepointlubon.pl"'), `${pathname}: contains the Home canonical`)
    }
  }

  for (const sitemapFile of ['public/sitemap.xml', 'dist/sitemap.xml']) {
    const xml = await readFile(path.join(projectDirectory, sitemapFile), 'utf8')
    const actualUrls = sitemapLocations(xml)
    assert(
      JSON.stringify(actualUrls) === JSON.stringify(expectedUrls),
      `${sitemapFile} does not match the public prerender route list`,
    )
    assert(!xml.includes('/admin') && !xml.includes('/classes') && !xml.includes('.netlify.app'), `${sitemapFile} contains a forbidden URL`)
  }

  const adminHtml = await readFile(path.join(distDirectory, 'admin', 'index.html'), 'utf8')
  assert(!adminHtml.includes('data-prerendered-path'), '/admin must not be prerendered')

  const netlifyConfig = await readFile(path.join(projectDirectory, 'netlify.toml'), 'utf8')
  const classesRedirect = netlifyConfig.indexOf('from = "/classes"')
  const spaFallback = netlifyConfig.indexOf('from = "/*"')
  assert(classesRedirect >= 0 && spaFallback > classesRedirect, 'Netlify redirect ordering is incorrect')
  assert(
    /from = "\/classes"[\s\S]*?to = "\/directions"[\s\S]*?status = 301[\s\S]*?force = true/.test(netlifyConfig.slice(classesRedirect, spaFallback)),
    'Netlify /classes must be a forced 301 redirect to /directions',
  )
  assert(
    /from = "\/\*"[\s\S]*?to = "\/index\.html"[\s\S]*?status = 200/.test(netlifyConfig.slice(spaFallback)),
    'Netlify SPA fallback must rewrite to /index.html with status 200',
  )

  return paths
}

if (import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const paths = await verifyPrerender()
  console.log(`Verified ${paths.length} prerendered routes: ${paths.join(', ')}`)
}
