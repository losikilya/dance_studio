import { useEffect } from 'react'
import { Typography, Button } from 'antd'
import { InstagramOutlined } from '@ant-design/icons'
import './instagram-embed.css'

const { Title } = Typography

export default function InstagramEmbeds({
  urls = [],                         // массив прямых ссылок на посты/риилсы
  title = 'Latest from Instagram',
  instaUrl = 'https://instagram.com/yourstudio'
}) {
  useEffect(() => {
    const ID = 'instagram-embed-js'
    const runProcess = () => window.instgrm?.Embeds?.process?.()

    // подключаем скрипт один раз
    if (!document.getElementById(ID)) {
      const s = document.createElement('script')
      s.id = ID
      s.src = 'https://www.instagram.com/embed.js'
      s.async = true
      s.onload = runProcess
      document.body.appendChild(s)
    } else {
      runProcess()
    }
  }, [urls])

  return (
    <section className="ig-embed-wrap">
      <div className="container">
        <div className="ig-embed-head">
          <Title level={3} style={{ margin: 0 }}>{title}</Title>
          <Button
            type="default"
            icon={<InstagramOutlined />}
            href={instaUrl}
            target="_blank"
            rel="noreferrer"
          >
            Follow us
          </Button>
        </div>

        <div className="ig-embed-grid">
          {urls.map((u) => (
            <div className="ig-embed-cell" key={u}>
              {/* ВАЖНО: именно такой блок + data-instgrm-* */}
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={u}
                data-instgrm-version="14"
                data-instgrm-captioned
              />
              {/* Фолбэк на случай блокировщиков: простой линк */}
              <noscript><a href={u} target="_blank" rel="noreferrer">{u}</a></noscript>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
