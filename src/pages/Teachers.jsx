import { InstagramOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Row, Space, Typography } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import VideoModal from '../components/VideoModal'
import { TEACHERS } from '../content/teachers'
import './teachers.css'

export default function Teachers() {
  const [video, setVideo] = useState({ open: false, url: null })
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'pl'

  const openVideo = (url) => setVideo({ open: true, url })
  const closeVideo = () => setVideo({ open: false, url: null })

  return (
    <div className="teachers-wrap">
      <div className="teachers-container">
        <Typography.Title level={1} className="teachers-title">
          {t('teachers.title')}
        </Typography.Title>

        <Space direction="vertical" size={20} style={{ width: '100%' }}>
          {TEACHERS.map((teacher, index) => (
            <Row
              key={teacher.id}
              gutter={[24, 24]}
              align="middle"
              className={`teacher-row ${index % 2 === 1 ? 'reverse-desktop' : ''}`}
              wrap
            >
              <Col xs={24} md={12} className="teacher-media">
                <div className="teacher-cover">
                  <img
                    src={teacher.image}
                    alt={t('teachers.photoAlt', { name: teacher.name })}
                    loading="lazy"
                  />
                  <div className="brand-overlay" aria-hidden="true">
                    <span>{teacher.name.split(' ')[0].toUpperCase()}</span>
                  </div>
                  <div className="teacher-caption">{teacher.name}</div>
                </div>
              </Col>

              <Col xs={24} md={12} className="teacher-description">
                <Typography.Title level={2} className="teacher-name">
                  {teacher.name}
                </Typography.Title>
                <Typography.Paragraph className="teacher-bio">
                  {teacher.bio[language]}
                </Typography.Paragraph>

                {(teacher.videoUrl || teacher.socialUrl) && (
                  <>
                    <Divider style={{ margin: '24px 0' }} />
                    <Space wrap size={12}>
                      {teacher.videoUrl && (
                        <Button size="large" onClick={() => openVideo(teacher.videoUrl)}>
                          {t('teachers.watchVideo')}
                        </Button>
                      )}
                      {teacher.socialUrl && (
                        <Button
                          type="primary"
                          size="large"
                          icon={<InstagramOutlined />}
                          href={teacher.socialUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {t('teachers.instagram')}
                        </Button>
                      )}
                    </Space>
                  </>
                )}
              </Col>
            </Row>
          ))}
        </Space>
      </div>

      <VideoModal open={video.open} videoUrl={video.url} onClose={closeVideo} />
    </div>
  )
}
