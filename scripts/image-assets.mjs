import { createHash } from 'node:crypto'
import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { normalizePath } from 'vite'
import { TEACHERS } from '../src/content/teachers.js'

// Original uploads stay intact. Both browser and SSR builds use the same
// content-addressed WebP variants, cached locally between builds.
export function imageAssetsPlugin() {
  const collections = {
    'virtual:schedule-images': { prefix: 'grafik', widths: [960, 1600, 2400], quality: 88 },
    'virtual:rental-images': { prefix: 'zala', widths: [640, 1280, 1920], quality: 80 },
    'virtual:teacher-images': { widths: [480, 960, 1200], quality: 82, square: true },
  }
  const modules = new Map(Object.keys(collections).map(id => [id, `\0${id}`]))
  const images = new Map()
  const servedFiles = new Map()
  let root
  let isSsr
  let isDev

  function invalidateAssets(server, file) {
    if (!normalizePath(file).startsWith(`${normalizePath(path.join(root, 'public/assets'))}/`)) return
    images.clear()
    for (const id of modules.values()) {
      const module = server.moduleGraph.getModuleById(id)
      if (module) server.moduleGraph.invalidateModule(module)
    }
    server.ws.send({ type: 'full-reload' })
  }

  async function optimize(fileName, options) {
    const key = `${fileName}:${JSON.stringify(options)}`
    if (images.has(key)) return images.get(key)

    const result = (async () => {
      const input = await readFile(path.join(root, 'public/assets', fileName))
      const metadata = await sharp(input).autoOrient().metadata()
      const sourceWidth = metadata.autoOrient?.width ?? metadata.width
      const sourceHeight = metadata.autoOrient?.height ?? metadata.height
      const maxWidth = options.square ? Math.min(sourceWidth, sourceHeight) : sourceWidth
      const widths = [...new Set(options.widths.map(width => Math.min(width, maxWidth)))]
      const variants = []

      for (const width of widths) {
        const hash = createHash('sha256').update(input)
          .update(JSON.stringify({ width, options, sharp: sharp.versions.sharp, vips: sharp.versions.vips }))
          .digest('hex').slice(0, 12)
        const outputName = `${path.parse(fileName).name}-${width}-${hash}.webp`
        const cacheFile = path.join(root, '.cache/images', outputName)
        let buffer
        try {
          buffer = await readFile(cacheFile)
        } catch (error) {
          if (error.code !== 'ENOENT') throw error
          buffer = await sharp(input).autoOrient()
            .resize({ width, ...(options.square ? { height: width, fit: 'cover' } : {}), withoutEnlargement: true })
            .webp({ quality: options.quality, effort: 4 }).toBuffer()
          await mkdir(path.dirname(cacheFile), { recursive: true })
          await writeFile(cacheFile, buffer)
        }
        const outputPath = `media/${outputName}`
        servedFiles.set(`/${outputPath}`, buffer)
        if (!isSsr) this.emitFile({ type: 'asset', fileName: outputPath, source: buffer })
        variants.push({ src: `/${outputPath}`, width })
      }

      const fallback = variants[Math.min(1, variants.length - 1)]
      return {
        src: fallback.src,
        srcSet: variants.map(variant => `${variant.src} ${variant.width}w`).join(', '),
        width: options.square ? maxWidth : sourceWidth,
        height: options.square ? maxWidth : sourceHeight,
      }
    })()
    images.set(key, result)
    return result
  }

  return {
    name: 'dance-point-responsive-images',
    configResolved(config) {
      root = config.root
      isSsr = Boolean(config.build.ssr) || config.command === 'serve'
      isDev = config.command === 'serve'
    },
    resolveId(id) { return modules.get(id) ?? null },
    async load(id) {
      const moduleId = [...modules].find(([, resolved]) => resolved === id)?.[0]
      if (!moduleId) return null
      const options = collections[moduleId]
      const assets = path.join(root, 'public/assets')

      if (moduleId === 'virtual:teacher-images') {
        const result = {}
        for (const teacher of TEACHERS) {
          if (!isDev) this.addWatchFile(path.join(root, 'public', teacher.image))
          result[teacher.image] = await optimize.call(this, path.basename(teacher.image), options)
        }
        return `export default ${JSON.stringify(result)}`
      }

      const files = (await readdir(assets))
        .filter(file => file.toLowerCase().startsWith(options.prefix) && /\.(avif|gif|jpe?g|png|webp)$/i.test(file))
        .sort((left, right) => left.localeCompare(right, undefined, { numeric: true, sensitivity: 'base' }))
      const result = []
      for (const file of files) {
        if (!isDev) this.addWatchFile(path.join(assets, file))
        result.push(await optimize.call(this, file, options))
      }
      return `export default ${JSON.stringify(result)}`
    },
    configureServer(server) {
      const assets = path.join(root, 'public/assets')
      server.watcher.add(assets)
      server.watcher.on('add', file => invalidateAssets(server, file))
      server.watcher.on('unlink', file => invalidateAssets(server, file))
      server.middlewares.use((request, response, next) => {
        const buffer = servedFiles.get(request.url?.split('?')[0])
        if (!buffer) return next()
        response.setHeader('Content-Type', 'image/webp')
        response.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
        response.end(buffer)
      })
    },
    handleHotUpdate(context) {
      invalidateAssets(context.server, context.file)
    },
  }
}
