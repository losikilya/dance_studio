import { i18nReady, isHydratingPrerender, preferredLanguage } from './i18n'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from "./App.jsx";
import "./styles.css";

await i18nReady

const root = document.getElementById('root')
const app = (
  <App languageAfterHydration={isHydratingPrerender ? preferredLanguage : null} />
)

if (isHydratingPrerender) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
