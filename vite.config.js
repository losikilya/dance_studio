import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const supportedImageExtension = /\.(avif|gif|jpe?g|png|webp)$/i
const imageCollections = [
  { moduleId: 'virtual:schedule-images', prefix: 'grafik' },
  { moduleId: 'virtual:rental-images', prefix: 'zala' },
].map((collection) => ({
  ...collection,
  resolvedModuleId: `\0${collection.moduleId}`,
}))

function contentImagesPlugin() {
  const projectDirectory = path.dirname(fileURLToPath(import.meta.url))
  const assetsDirectory = path.resolve(projectDirectory, 'public/assets')
  const isCollectionImage = (filePath, prefix) => {
    const fileName = path.basename(filePath)

    return path.dirname(path.resolve(filePath)) === assetsDirectory
      && fileName.toLowerCase().startsWith(prefix)
      && supportedImageExtension.test(fileName)
  }

  const loadImages = (prefix) => readdirSync(assetsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isCollectionImage(path.join(assetsDirectory, entry.name), prefix))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true, sensitivity: 'base' }))
    .map((fileName) => `/assets/${encodeURIComponent(fileName)}`)

  return {
    name: 'dance-point-content-images',
    resolveId(id) {
      return imageCollections.find((collection) => collection.moduleId === id)?.resolvedModuleId ?? null
    },
    load(id) {
      const collection = imageCollections.find(({ resolvedModuleId }) => resolvedModuleId === id)
      if (!collection) return null

      return `export default ${JSON.stringify(loadImages(collection.prefix))}`
    },
    configureServer(server) {
      server.watcher.add(assetsDirectory)

      const reloadContentImages = (filePath) => {
        const collection = imageCollections.find(({ prefix }) => isCollectionImage(filePath, prefix))
        if (!collection) return

        const module = server.moduleGraph.getModuleById(collection.resolvedModuleId)
        if (module) server.moduleGraph.invalidateModule(module)
        server.ws.send({ type: 'full-reload' })
      }

      server.watcher.on('add', reloadContentImages)
      server.watcher.on('unlink', reloadContentImages)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), contentImagesPlugin()],
})
