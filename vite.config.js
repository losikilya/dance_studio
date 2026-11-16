import { defineConfig, normalizePath } from 'vite'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { imageAssetsPlugin } from './scripts/image-assets.mjs'

function translationResourcesPlugin() {
  const id = 'virtual:translations'
  const resolvedId = `\0${id}`
  let root
  return {
    name: 'dance-point-bundled-translations',
    configResolved(config) { root = config.root },
    resolveId(source) { return source === id ? resolvedId : null },
    async load(source) {
      if (source !== resolvedId) return null
      const resources = {}
      for (const language of ['pl', 'en']) {
        const file = path.join(root, 'public/locales', language, 'translation.json')
        resources[language] = { translation: JSON.parse(await readFile(file, 'utf8')) }
      }
      return `export default ${JSON.stringify(resources)}`
    },
    handleHotUpdate(context) {
      if (!normalizePath(context.file).startsWith(`${normalizePath(path.join(root, 'public/locales'))}/`)) return
      const module = context.server.moduleGraph.getModuleById(resolvedId)
      if (module) context.server.moduleGraph.invalidateModule(module)
      context.server.ws.send({ type: 'full-reload' })
    },
  }
}

export default defineConfig({
  plugins: [react(), imageAssetsPlugin(), translationResourcesPlugin()],
  build: { manifest: true, assetsDir: 'static' },
})
