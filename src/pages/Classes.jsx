import { Button, Collapse, List, Tag, Typography } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DIRECTIONS } from '../content/directions'
import { getTeacherById } from '../content/teachers'
import { getYouTubeVideoId } from '../utils/youtube'
import './classes.css'

const { Title, Paragraph } = Typography
const { Panel } = Collapse

export default function Classes() {
  const [selection, setSelection] = useState({
    categoryKey: DIRECTIONS[0].key,
    videoId: DIRECTIONS[0].videos[0].id,
  })
  const [isMobile, setIsMobile] = useState(false)
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'pl'

  const data = useMemo(() => DIRECTIONS.map((category) => ({
    ...category,
    title: category.label[language],
    videos: category.videos.map((video) => {
      const teacher = video.teacherId ? getTeacherById(video.teacherId) : null

      return {
        ...video,
        title: typeof video.title === 'string' ? video.title : video.title[language],
        teacher: teacher?.name ?? video.teacherName,
        videoUrl: teacher?.videoUrl ?? video.videoUrl,
        description: teacher?.bio[language] ?? video.description?.[language] ?? '',
        level: t('common.beginner'),
      }
    }),
  })), [language, t])

  const selected = useMemo(() => {
    const category = data.find(({ key }) => key === selection.categoryKey) ?? data[0]
    const video = category.videos.find(({ id }) => id === selection.videoId) ?? category.videos[0]
    return { ...video, catKey: category.key, catTitle: category.title }
  }, [data, selection])

  useEffect(() => {
    const mediaQuery = matchMedia('(max-width: 768px)')
    const onChange = () => setIsMobile(mediaQuery.matches)
    onChange()
    mediaQuery.addEventListener('change', onChange)
    return () => mediaQuery.removeEventListener('change', onChange)
  }, [])

  const onPick = (category, video) => {
    setSelection({ categoryKey: category.key, videoId: video.id })
    if (isMobile) {
      document.getElementById('playerTop')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const playerSrc = useMemo(() => {
    const videoId = getYouTubeVideoId(selected.videoUrl)
    if (!videoId) return ''

    const params = new URLSearchParams({ autoplay: '1', rel: '0', modestbranding: '1' })
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
  }, [selected.videoUrl])

  const selectedTitle = (
    <>
      {selected.catTitle} <span className="dot">•</span>{' '}
      {selected.title} <span className="dot">•</span>{' '}
      {selected.teacher}
    </>
  )

  return (
    <div className="directions-wrap">
      <div className="classes-container">
        <Title level={1} className="directions-title">{t('directions.title')}</Title>

        <div className="directions-grid">
          <section id="playerTop" className="classes-player-card classes-card">
            <div className={`classes-video-aspect ytWrap ${selected.isVertical ? 'vertical' : 'horizontal'}`}>
              {playerSrc ? (
                <iframe
                  title={selected.title}
                  src={playerSrc}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="video-unavailable">{t('directions.videoUnavailable')}</div>
              )}
            </div>
          </section>

          {isMobile && (
            <Title level={2} className="mobile-title" style={{ fontSize: 24, lineHeight: 1.3333 }}>
              {selectedTitle}
            </Title>
          )}

          <aside className="playlist classes-card" aria-label={t('directions.playlistLabel')}>
            {isMobile ? (
              <Collapse accordion ghost>
                {data.map((category) => (
                  <Panel header={category.title} key={category.key}>
                    <DirectionList
                      category={category}
                      selectedId={selected.id}
                      onPick={onPick}
                    />
                  </Panel>
                ))}
              </Collapse>
            ) : data.map((category) => (
              <div key={category.key} className="playlist-section">
                <div className="playlist-head">{category.title}</div>
                <DirectionList
                  category={category}
                  selectedId={selected.id}
                  onPick={onPick}
                />
              </div>
            ))}
          </aside>
        </div>

        <section className="desc classes-card">
          {!isMobile && (
            <Title
              level={2}
              style={{
                margin: 0,
                marginBottom: 8,
                fontSize: 24,
                lineHeight: 1.3333,
                background: 'rgba(150,75,75)',
                color: '#fff',
                padding: 12,
              }}
            >
              {selectedTitle}
            </Title>
          )}
          <div className="desc-meta">
            <Tag>{selected.teacher}</Tag>
            <Tag>{t('directions.level')}: {selected.level}</Tag>
          </div>
          <Paragraph style={{ whiteSpace: 'pre-wrap', padding: '0 12px 20px' }}>
            {selected.description}
          </Paragraph>
        </section>

        <div className="classes-cta-wrap">
          <Button
            type="primary"
            size="large"
            className="classes-cta-big"
            href={`/contacts?class=${encodeURIComponent(selected.catKey)}&video=${encodeURIComponent(selected.id)}`}
          >
            {t('common.signUp')}
          </Button>
        </div>
      </div>
    </div>
  )
}

function DirectionList({ category, selectedId, onPick }) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={category.videos}
      renderItem={(video) => (
        <List.Item
          className={`playlist-item ${selectedId === video.id ? 'is-active' : ''}`}
          onClick={() => onPick(category, video)}
        >
          <List.Item.Meta
            title={<span className="playlist-title">{video.title}</span>}
            description={<span className="playlist-meta">{video.teacher}</span>}
          />
        </List.Item>
      )}
    />
  )
}
