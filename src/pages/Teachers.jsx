// src/pages/Teachers.jsx
import { Typography, Button, Divider, Row, Col, Space } from 'antd'
import './teachers.css'
import { useState } from 'react'
import VideoModal from '../components/VideoModal'

const TEACHERS = [
  {
    id: 'doma',
    name: 'Dominika Lubawy',
    title: 'Waacking',
    cover: "/assets/Doma.jpg",
    videoId: 'CyUHRIfff_0',
    classes: [
      { name: 'Waacking', level: 'begginers', times: 'СР — 20:00, СБ — 15:00' },
      { name: 'AFRO', level: 'pro', times: 'СР — 21:00, СБ — 14:00' },
    ],
    ctas: {
      signupHref: '/contacts?teacher=yulia',
    },
  },
  {
    id: 'nikola',
    name: 'Nikola Makowska',
    title: 'Jazz',
    cover: '/assets/nikola.jpg',
    videoId: 'c3RPBn4_KJo',
    classes: [{ name: 'Jazz', level: 'begginers', times: 'ПН/ЧТ — 18:00' }],
    ctas: {
      signupHref: '/contacts?teacher=kris',
    },
  },
]

export default function Teachers() {
    const [video, setVideo] = useState({ open: false, id: null })

  const openVideo = (id) => setVideo({ open: true, id })
  const closeVideo = () => setVideo({ open: false, id: null })
  return (
    <div className="teachers-wrap">
      <div className="container">
        <Typography.Title level={2} className="teachers-title">TEACHERS</Typography.Title>

        <Space direction="vertical" size={56} style={{ width: '100%' }}>
          {TEACHERS.map((t, idx) => (
            <Row
              key={t.id}
              gutter={[24, 24]}
              align="middle"
              className={`teacher-row ${idx % 2 === 1 ? 'reverse-desktop' : ''}`}
              wrap
            >
              {/* media */}
              <Col xs={24} md={12} className="teacher-media">
                <div className="teacher-cover">
                  <img src={t.cover} alt={t.name} loading="lazy" />
                  {/* бренд-оверлей */}
                  <div className="brand-overlay">
                    <span>DANCE</span>
                    <span>POINT</span>
                  </div>
                  <div className="teacher-caption">
                    {t.name}<br/>{t.title}
                  </div>
                </div>
              </Col>

              {/* расписание */}
              <Col xs={24} md={12} className={`shedule-description-${idx % 2 === 0 ? 'start' : 'end'}`}>
                <Typography.Title level={3} className="schedule-title">
                  SCHEDULE
                </Typography.Title>

                <Space direction="vertical" size={20} className="schedule-list">
                  {t.classes.map((c) => (
                    <div key={c.name} className="schedule-item">
                      <a className="schedule-class">{c.name}</a>
                      <div className="schedule-level">{c.level}</div>
                      <div className="schedule-time">{c.times}</div>
                    </div>
                  ))}
                </Space>

                <Divider style={{ margin: '24px 0' }} />

                <Space wrap size={12}>
                  <Button type="primary" size="large" href={t.ctas.signupHref}>
                    Sign up
                  </Button>
                  <Button size="large" onClick={() => openVideo(t.videoId)}>
                    Watch Video
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
