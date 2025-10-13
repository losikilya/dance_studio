import { useMemo, useState, useEffect } from 'react'
import { Typography, List, Button, Divider, Collapse, Tag } from 'antd'
import './classes.css'

const { Title, Paragraph } = Typography
const { Panel } = Collapse

// Данные (подставь свои видеоId и тексты)
const DATA = [
  {
    key: 'waacking',
    title: 'Waacking',
    videos: [
      {
        id: 'g1',
        videoId: 'CyUHRIfff_0',
        title: 'WAACKING (DOMA)',
        dur: '0:45',
        teacher: 'WAACK DOMA',
        level: 'beginers',
        description:
          'WAAAAAAAAAAAAAAAAAAAAACKING - is love (description)',
      },
      {
        id: 'g2',
        videoId: 'xPjhm6fJC_g',
        title: 'WAACKING (DOMA)',
        dur: '0:45',
        teacher: 'WAACK DOMA',
        level: 'beginers',
        description:
          'WAAAAAAAAAAAAAAAAAAAAACKING - is love (description)',
      },
    ],
  },
  {
    key: 'jazz',
    title: 'JAZZ',
    videos: [
      {
        id: 'l1',
        videoId: 'c3RPBn4_KJo',
        title: 'JAZZ (Nikola)',
        dur: '1:23',
        teacher: 'Nikola',
        level: 'beginers',
        description:
          'JAZZZZZZZZZZZZZZZZZZZZZZZZZZZZ ',
      },
    ],
  },
]

// утилита: первый ролик как дефолт
const getDefault = () => {
  const firstCat = DATA[0]
  return { ...firstCat.videos[0], catKey: firstCat.key, catTitle: firstCat.title }
}

export default function Classes() {
  const [selected, setSelected] = useState(getDefault())
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = matchMedia('(max-width: 768px)')
    const onChange = () => setIsMobile(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const onPick = (cat, video) => {
    setSelected({ ...video, catKey: cat.key, catTitle: cat.title })
    // скролл к плееру на мобиле
    if (isMobile) {
      document.getElementById('playerTop')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const playerSrc = useMemo(() => {
    if (!selected?.videoId) return ''
    const params = new URLSearchParams({
      autoplay: '1',
      rel: '0',
      modestbranding: '1',
    })
    return `https://www.youtube.com/embed/${selected.videoId}?${params.toString()}`
  }, [selected])

  return (
    <div className="directions-wrap">
      <div className="container">
        <Title level={2} className="directions-title">Styles</Title>

        <div className="directions-grid">
          {/* Плеер */}
          <section id="playerTop" className="player-card card">
            <div className="video-aspect">
              {playerSrc && (
                <iframe
                  title={selected?.title || 'Video'}
                  src={playerSrc}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </section>

          {/* Плейлист: справа на десктопе, ниже — на мобиле */}
          <aside className="playlist card">
            <Title level={4} style={{ marginBottom: 8 }}>All styles</Title>

            {isMobile ? (
              <Collapse accordion ghost>
                {DATA.map(cat => (
                  <Panel header={cat.title} key={cat.key}>
                    <List
                      itemLayout="horizontal"
                      dataSource={cat.videos}
                      renderItem={v => (
                        <List.Item
                          className={`playlist-item ${selected?.id === v.id ? 'is-active' : ''}`}
                          onClick={() => onPick(cat, v)}
                        >
                          <List.Item.Meta
                            title={<span className="playlist-title">{v.title}</span>}
                            description={<span className="playlist-meta">{v.dur}</span>}
                          />
                        </List.Item>
                      )}
                    />
                  </Panel>
                ))}
              </Collapse>
            ) : (
              <>
                {DATA.map(cat => (
                  <div key={cat.key} className="playlist-section">
                    <div className="playlist-head">{cat.title}</div>
                    <List
                      itemLayout="horizontal"
                      dataSource={cat.videos}
                      renderItem={v => (
                        <List.Item
                          className={`playlist-item ${selected?.id === v.id ? 'is-active' : ''}`}
                          onClick={() => onPick(cat, v)}
                        >
                          <List.Item.Meta
                            title={<span className="playlist-title">{v.title}</span>}
                            description={<span className="playlist-meta">{v.dur}</span>}
                          />
                        </List.Item>
                      )}
                    />
                  </div>
                ))}
              </>
            )}
          </aside>
        </div>

        {/* Описание выбранного видео */}
        <section className="desc card">
          <Title level={3} style={{ marginBottom: 8 }}>
            {selected?.catTitle} <span className="dot">•</span> {selected?.title}
          </Title>
          <div className="desc-meta">
            <Tag>{selected?.teacher}</Tag>
            <Tag>level: {selected?.level}</Tag>
          </div>
          <Paragraph style={{ marginTop: 8 }}>{selected?.description}</Paragraph>
        </section>

        {/* Большая CTA внизу */}
        <div className="cta-wrap">
          <Button
            type="primary"
            size="large"
            className="cta-big"
            href={`/contacts?class=${encodeURIComponent(selected?.catKey || '')}&video=${encodeURIComponent(selected?.id || '')}`}
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  )
}
