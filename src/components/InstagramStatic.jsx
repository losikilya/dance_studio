import { Typography, Button } from 'antd'
import { InstagramOutlined, PlayCircleOutlined } from '@ant-design/icons'
import './instagram.css'

const { Title } = Typography

/**
 * posts: [{ id, href, img, isVideo? }]
 * instaUrl: ссылка на профиль
 */
export default function InstagramStatic({
  posts = [],
  instaUrl = 'https://www.instagram.com/dance_point_lubon/'
}) {
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
          {posts.slice(0, 3).map(p => (
            <a
              key={p.id}
              className="ig-card"
              href={p.href}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Instagram post"
            >
                {p.img}
              {/* <img src={p.img} alt="Instagram post" loading="lazy" /> */}
              {p.isVideo && (
                <span className="ig-play"><PlayCircleOutlined /></span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
