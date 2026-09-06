import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scheduleImagesModuleId = 'virtual:schedule-images'
const resolvedScheduleImagesModuleId = `\0${scheduleImagesModuleId}`
const supportedImageExtension = /\.(avif|gif|jpe?g|png|webp)$/i

function scheduleImagesPlugin() {
  const projectDirectory = path.dirname(fileURLToPath(import.meta.url))
  const assetsDirectory = path.resolve(projectDirectory, 'public/assets')
  const isScheduleImage = (filePath) => {
    const fileName = path.basename(filePath)

    return path.dirname(path.resolve(filePath)) === assetsDirectory
      && fileName.toLowerCase().startsWith('grafik')
      && supportedImageExtension.test(fileName)
  }

  const loadScheduleImages = () => readdirSync(assetsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isScheduleImage(path.join(assetsDirectory, entry.name)))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true, sensitivity: 'base' }))
    .map((fileName) => `/assets/${encodeURIComponent(fileName)}`)

  return {
    name: 'dance-point-schedule-images',
    resolveId(id) {
      return id === scheduleImagesModuleId ? resolvedScheduleImagesModuleId : null
    },
    load(id) {
      if (id !== resolvedScheduleImagesModuleId) return null

      return `export default ${JSON.stringify(loadScheduleImages())}`
    },
    configureServer(server) {
      server.watcher.add(assetsDirectory)

      const reloadScheduleImages = (filePath) => {
        if (!isScheduleImage(filePath)) return

        const module = server.moduleGraph.getModuleById(resolvedScheduleImagesModuleId)
        if (module) server.moduleGraph.invalidateModule(module)
        server.ws.send({ type: 'full-reload' })
      }

      server.watcher.on('add', reloadScheduleImages)
      server.watcher.on('unlink', reloadScheduleImages)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), scheduleImagesPlugin()],
})
