import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
} from '@ant-design/icons'
import { Button, Card, Col, Row, Space, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { STUDIO } from '../content/studio'
import './contacts.css'

const { Title, Paragraph, Text } = Typography

function MapEmbed({ latitude, longitude, title }) {
  const src = `https://www.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`

  return (
    <div className="map-embed">
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}

export default function Contacts() {
  const { t } = useTranslation()
  const { latitude, longitude } = STUDIO.coordinates

  return (
    <div className="contacts-wrap">
      <div className="contacts-container">
        <Title level={1} className="contacts-title">{t('contacts.title')}</Title>

        <Row gutter={[16, 16]} align="stretch">
          <Col xs={24} md={10}>
            <Card className="contacts-card info-card" bordered>
              <Title level={2} style={{ marginTop: 0, fontSize: 20, lineHeight: 1.4 }}>
                {STUDIO.name}
              </Title>

              <Space direction="vertical" size={12} style={{ width: '100%' }}>
                <div className="info-row">
                  <PhoneOutlined />
                  <div>
                    <Text strong>{t('contacts.phone')}</Text>
                    <div><a href={STUDIO.phone.href}>{STUDIO.phone.display}</a></div>
                  </div>
                </div>

                <div className="info-row">
                  <EnvironmentOutlined />
                  <div>
                    <Text strong>{t('contacts.address')}</Text>
                    <address className="studio-address">
                      <a href={STUDIO.googleMapsUrl} target="_blank" rel="noreferrer noopener">
                        {STUDIO.address.street}<br />
                        {STUDIO.address.postalCode} {STUDIO.address.city}<br />
                        {t('contacts.country')}
                      </a>
                    </address>
                  </div>
                </div>

                <div className="info-row">
                  <ClockCircleOutlined />
                  <div className="hours">
                    <Text strong>{t('contacts.openingHours')}</Text>
                    {STUDIO.openingHours.map((hours) => (
                      <div key={hours.dayKey}>
                        {t(`common.days.${hours.dayKey}`)}: {hours.opens}–{hours.closes}
                      </div>
                    ))}
                  </div>
                </div>

                {STUDIO.socialLinks.length > 0 && (
                  <div className="socials">
                    {STUDIO.socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="social-btn"
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                )}
              </Space>
            </Card>
          </Col>

          <Col xs={24} md={14}>
            <Card className="contacts-card form-card" bordered>
              <Title level={2} style={{ marginTop: 0, fontSize: 20, lineHeight: 1.4 }}>
                {t('contacts.writeToUs')}
              </Title>
              <Paragraph type="secondary">{t('contacts.contactPrompt')}</Paragraph>
              <Button type="primary" size="large" href={STUDIO.phone.href}>
                {t('contacts.callUs')}
              </Button>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} md={10}>
            <Card className="contacts-card" bordered>
              <Title level={2} style={{ marginTop: 0, fontSize: 20, lineHeight: 1.4 }}>
                {t('contacts.howToFindUs')}
              </Title>
              <Paragraph>{t('contacts.locationDescription')}</Paragraph>
              <Button
                href={STUDIO.googleMapsUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                {t('contacts.openInMaps')}
              </Button>
            </Card>
          </Col>
          <Col xs={24} md={14}>
            <Card className="contacts-card map-card" bordered>
              <MapEmbed
                latitude={latitude}
                longitude={longitude}
                title={t('contacts.mapTitle')}
              />
            </Card>
          </Col>
        </Row>

        <div className="contacts-cta-wrap">
          <Button
            type="primary"
            size="large"
            className="contacts-cta-big"
            href={STUDIO.phone.href}
          >
            {t('contacts.bookTrial')}
          </Button>
          <Text className="contacts-cta-note">{t('contacts.bookingNote')}</Text>
        </div>
      </div>
    </div>
  )
}
