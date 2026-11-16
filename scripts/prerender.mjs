import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { PUBLIC_ROUTE_CONFIG } from '../src/routeConfig.js'
import {
  DEFAULT_LANGUAGE,
  DEFAULT_OG_IMAGE,
  DEFAULT_ROBOTS,
  getCanonicalUrl,
  getSeoContent,
} from '../src/seo/seoConfig.js'
import { verifyPrerender } from './verify-prerender.mjs'

const projectDirectory = process.cwd()
const distDirectory = path.join(projectDirectory, 'dist')
const serverDirectory = path.join(projectDirectory, '.prerender')
const serverEntry = path.join(serverDirectory, 'entry-server.js')

// Vite's browser bundle is production code. Set this before importing the
// temporary renderer so React and Ant Design generate matching markup/classes.
process.env.NODE_ENV = 'production'

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')

function seoHead(pathname) {
  const content = getSeoContent(pathname, DEFAULT_LANGUAGE)
  if (!content) throw new Error(`Missing Polish SEO content for ${pathname}`)

  const canonical = getCanonicalUrl(pathname)
  const title = escapeHtml(content.title)
  const description = escapeHtml(content.description)
  const url = escapeHtml(canonical)
  const image = escapeHtml(DEFAULT_OG_IMAGE)

  return `<!-- route-seo:start -->
    <meta name="description" content="${description}" />
    <meta name="robots" content="${DEFAULT_ROBOTS}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="DANCE POINT" />
    <meta property="og:locale" content="pl_PL" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:alt" content="Logo DANCE POINT" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    <meta name="twitter:image:alt" content="Logo DANCE POINT" />
    <title>${title}</title>
    <!-- route-seo:end -->`
}

function pageAssets(manifest, pathname) {
  const route = PUBLIC_ROUTE_CONFIG.find(route => route.path === pathname)
  if (!route?.module) return ''
  if (!manifest[route.module]) throw new Error(`Missing build manifest entry for ${route.module}`)
  const visited = new Set()
  const css = new Set()
  const scripts = new Set()
  function visit(key) {
    if (visited.has(key)) return
    visited.add(key)
    const entry = manifest[key]
    if (!entry) throw new Error(`Missing build manifest dependency: ${key}`)
    scripts.add(entry.file)
    entry.css?.forEach(file => css.add(file))
    entry.imports?.forEach(visit)
  }
  visit(route.module)
  return [
    ...[...css].map(file => `<link rel="stylesheet" href="/${escapeHtml(file)}" />`),
    ...[...scripts].map(file => `<link rel="modulepreload" crossorigin href="/${escapeHtml(file)}" />`),
  ].join('\n    ')
}

function renderDocument(template, pathname, appHtml, styles, assets) {
  const withLanguage = template.replace(/<html\s+lang="[^"]*"/, '<html lang="pl"')
  const withSeo = withLanguage.replace(
    /<!-- route-seo:start -->[\s\S]*?<!-- route-seo:end -->/,
    seoHead(pathname),
  )

  if (withSeo === withLanguage) throw new Error('SEO markers are missing from the Vite HTML template')

  const withAssets = withSeo.replace('<head>', `<head>\n    ${styles}`)
    .replace('</head>', `    ${assets}\n  </head>`)
  const rendered = withAssets.replace(
    '<div id="root"></div>',
    `<div id="root" data-prerendered-path="${escapeHtml(pathname)}">${appHtml}</div>`,
  )

  if (rendered === withAssets) throw new Error('The root mount point is missing from the Vite HTML template')
  return rendered
}

function sitemap(paths) {
  const urls = paths.map((pathname) => `  <url>\n    <loc>${escapeHtml(getCanonicalUrl(pathname))}</loc>\n  </url>`)
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
}

try {
  const template = await readFile(path.join(distDirectory, 'index.html'), 'utf8')
  const manifest = JSON.parse(await readFile(path.join(distDirectory, '.vite/manifest.json'), 'utf8'))
  const { render } = await import(`${pathToFileURL(serverEntry).href}?build=${Date.now()}`)
  const paths = PUBLIC_ROUTE_CONFIG.map(({ path: pathname }) => pathname)

  for (const pathname of paths) {
    const { html: appHtml, styles } = await render(pathname)
    if (!appHtml.trim()) throw new Error(`Static rendering returned no content for ${pathname}`)

    const outputDirectory = pathname === '/'
      ? distDirectory
      : path.join(distDirectory, pathname.slice(1))
    await mkdir(outputDirectory, { recursive: true })
    await writeFile(path.join(outputDirectory, 'index.html'), renderDocument(template, pathname, appHtml, styles, pageAssets(manifest, pathname)), 'utf8')
  }

  await writeFile(path.join(distDirectory, 'sitemap.xml'), sitemap(paths), 'utf8')
  const verifiedPaths = await verifyPrerender()
  console.log(`Prerendered routes (${verifiedPaths.length}):`)
  verifiedPaths.forEach((pathname) => console.log(`  ${pathname}`))
} finally {
  await rm(serverDirectory, { recursive: true, force: true })
}
