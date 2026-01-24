import { useEffect, useState } from 'react'
import { Card, Skeleton, Button, Typography } from 'antd'
import { InstagramOutlined, PlayCircleOutlined } from '@ant-design/icons'
import './instagram.css'

const { Title } = Typography

export default function InstagramFeed({ limit = 3, instaUrl = 'https://www.instagram.com/loss.sick/' }) {
  const [items, setItems] = useState(null)     // null = loading, [] = empty
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch(`/api/instagram?limit=${limit}`)
      .then(r => r.json())
      .then(data => {
        if (!cancelled) setItems(Array.isArray(data.items) ? data.items : [])
      })
      .catch(() => !cancelled && setError(true))
    return () => { cancelled = true }
  }, [limit])

  const fallback = [
    // на случай ошибки API – покажем статические посты (замени ссылками на свои картинки/посты)
    { id: 'f1', media_type: 'IMAGE', media_url: '/assets/Doma.jpg', permalink: instaUrl },
    { id: 'f2', media_type: 'IMAGE', media_url: '/assets/Doma.jpg', permalink: instaUrl },
    { id: 'f3', media_type: 'IMAGE', media_url: '/assets/Doma.jpg', permalink: instaUrl },
  ]

  const data = error ? fallback : (items ?? [])

  return (
    <section className="ig-wrap">
      <div className="container">
        <div className="ig-head">
          <Title level={3} style={{ margin: 0 }}>Latest from Instagram</Title>
          <Button type="default" icon={<InstagramOutlined />} href={instaUrl} target="_blank" rel="noreferrer">
            Follow us
          </Button>
        </div>

        <div className="ig-grid">
          {items === null && !error
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card className="ig-card" key={`sk${i}`}>
                  <Skeleton.Image active className="ig-skel" />
                </Card>
              ))
            : data.slice(0, limit).map(post => {
                const isVideo = post.media_type === 'VIDEO' || post.media_type === 'REEL'
                const thumb = post.thumbnail_url || post.media_url
                return (
                  <a
                    className="ig-card"
                    key={post.id}
                    href={post.permalink}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open Instagram post"
                  >
                    <img src={thumb} alt={post.caption || 'Instagram post'} loading="lazy" />
                    {isVideo && (
                      <span className="ig-play">
                        <PlayCircleOutlined />
                      </span>
                    )}
                  </a>
                )
              })}
        </div>
      </div>
    </section>
  )
}
