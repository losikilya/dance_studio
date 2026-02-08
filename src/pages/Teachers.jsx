// src/pages/Teachers.jsx
import { Typography, Button, Divider, Row, Col, Space } from 'antd'
import './teachers.css'
import { useState } from 'react'
import VideoModal from '../components/VideoModal'
import { useTranslation } from 'react-i18next'

const TEACHERS = [
  {
    id: 'doma',
    name: 'Dominika Jałoszyńska',
    title: 'Waacking',
    cover: "/assets/Doma.jpg",
    videoId: 'i6W1-KUK8rU',
    classes: [
      { name: 'Waacking', level: 'begginers', times: 'WT — 17:00' },
      { name: 'Waacking', level: 'intermediate', times: 'WT — 18:15' },
      { name: 'Waacking', level: 'pro - close groupe', times: 'WT — 19:30' },
    ],
    ctas: {
      signupHref: '/contacts?teacher=doma',
    },
  },
  {
    id: 'nikola',
    name: 'Nikola Makowska',
    title: 'Jazz',
    cover: '/assets/nikola.jpg',
    videoId: 'ejusLcbAVnI',
    classes: [{ name: 'Jazz', level: '9-12 lat - close groupe', times: 'SR — 17:00, PIA — 18:15' },
      { name: 'Jazz Minis', level: '6-8 lat - kids', times: 'PIA — 17:00' },
      { name: 'Jazz', level: 'open', times: 'SR — 19:30' }
    ],
    ctas: {
      signupHref: '/contacts?teacher=nikola',
    },
  },
  {
    id: 'abad',
    name: 'ABAD BOLANOS',
    title: 'Salsa',
    cover: "/assets/abad.jpg",
    videoId: 'Vy8moBcKVIM',
    classes: [
      { name: 'Latin Mix Solo', level: 'open', times: 'PON — 18:15' },
      { name: 'Salsa w parach', level: 'open', times: 'PON — 19:30' },
    ],
    ctas: {
      signupHref: '/contacts?teacher=abad',
    },
  },
  {
    id: 'kuba',
    name: 'JAKUB KAMIŃSKI',
    title: 'Hip-Hop',
    cover: "/assets/kuba.jpg",
    videoId: 'YvtNQb6TAKg',
    classes: [
      { name: 'SUPA FLY', level: '12-16 lat - close groupe', times: 'CZW — 18:15' },
      { name: 'HIP-HOP', level: 'open', times: 'CZW — 19:30' },
    ],
    ctas: {
      signupHref: '/contacts?teacher=kuba',
    },
  },
  {
    id: 'nikola_p',
    name: 'NIKOLA PERCZAK',
    title: 'K-POP',
    cover: "/assets/nikola_p.jpg",
    videoId: '4Wywqv5V2bg',
    classes: [
      { name: 'K-POP', level: '10-13 lat', times: 'WT — 17:00' },
      { name: 'K-POP', level: '14+ lat', times: 'WT — 18:15' },
    ],
    ctas: {
      signupHref: '/contacts?teacher=nikola_p',
    },
  },
  {
    id: 'ola',
    name: 'ALEKSANDRA KASZUBOWSKA',
    title: 'High Heels',
    cover: "/assets/ola.jpg",
    videoId: 'Vy8moBcKVIM',
    classes: [
      { name: 'High Heels', level: 'begginers', times: 'SR — 18:15' },
      { name: 'High Heels', level: 'intermediate', times: 'SR — 19:30' },
    ],
    ctas: {
      signupHref: '/contacts?teacher=ola',
    },
  },
  {
    id: 'zosia',
    name: 'ZOSIA OSTOJA-ZAGÓRSKA',
    title: 'Choreografia',
    cover: "/assets/zosia.jpg",
    videoId: 'VsPyLYny654',
    classes: [
      { name: 'SUPA FLY', level: '12-16 lat', times: 'PON — 18:15' },
      { name: 'Choreografia', level: 'open', times: 'PON — 19:30' },
    ],
    ctas: {
      signupHref: '/contacts?teacher=zosia',
    },
  },
  {
    id: 'zuza',
    name: 'ZUZANNA KUŹMICKA',
    title: 'Kids',
    cover: "/assets/zuza.jpg",
    videoId: '0CoK85rbbIk',
    classes: [
      { name: 'MINI KIDS', level: '4-5 lat', times: 'SR — 17:00' },
      { name: 'KIDSY', level: '6-8 lat', times: 'SR — 18:15' },
    ],
    ctas: {
      signupHref: '/contacts?teacher=zuza',
    },
  },
]

export default function Teachers() {
    const [video, setVideo] = useState({ open: false, id: null })
      const { t } = useTranslation();
    

  const openVideo = (id) => setVideo({ open: true, id })
  const closeVideo = () => setVideo({ open: false, id: null })
  return (
    <div className="teachers-wrap">
      <div className="container">
        <Typography.Title level={2} className="teachers-title">{t('teachers.title')}</Typography.Title>

        <Space direction="vertical" size={20} style={{ width: '100%' }}>
          {TEACHERS.map((teacher, idx) => (
            <Row
              key={teacher.id}
              gutter={[24, 24]}
              align="middle"
              className={`teacher-row ${idx % 2 === 1 ? 'reverse-desktop' : ''}`}
              wrap
            >
              {/* media */}
              <Col xs={24} md={12} className="teacher-media">
                <div className="teacher-cover">
                  <img src={teacher.cover} alt={teacher.name} loading="lazy" />
                  {/* бренд-оверлей */}
                  <div className="brand-overlay">
                    <span>DANCE</span>
                    <span>POINT</span>
                  </div>
                  <div className="teacher-caption">
                    {teacher.name}<br/>{teacher.title}
                  </div>
                </div>
              </Col>

              {/* расписание */}
              <Col xs={24} md={12} className={`shedule-description-${idx % 2 === 0 ? 'start' : 'end'}`}>
                <Typography.Title level={3} className="schedule-title">
                  {t('teachers.subtitle')}
                </Typography.Title>

                <Space direction="vertical" size={20} className="schedule-list">
                  {teacher.classes.map((c) => (
                    <div key={c.name} className="schedule-item">
                      <a className="schedule-class">{c.name}</a>
                      <div className="schedule-level">{c.level}</div>
                      <div className="schedule-time">{c.times}</div>
                    </div>
                  ))}
                </Space>

                <Divider style={{ margin: '24px 0' }} />

                <Space wrap size={12}>
                  <Button type="primary" size="large" href={teacher.ctas.signupHref}>
                    {t('signup')}
                  </Button>
                  <Button size="large" onClick={() => openVideo(teacher.videoId)}>
                    {t('video')}
                  </Button>
                </Space>
              </Col>
            </Row>
          ))}
        </Space>
      </div>

        <VideoModal open={video.open} videoId={video.id} onClose={closeVideo} />
    </div>
  )
}
