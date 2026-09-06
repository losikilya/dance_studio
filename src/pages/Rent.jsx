import {
  CarOutlined,
  CoffeeOutlined,
  DatabaseOutlined,
  EnvironmentOutlined,
  LockOutlined,
  SoundOutlined,
  ThunderboltOutlined,
  WifiOutlined,
} from '@ant-design/icons'
import { Button, Card, Col, Divider, Row, Space, Tag, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import GallerySwiper from '../components/GallerySwiper'
import './rent.css'

const { Title, Paragraph } = Typography

const HERO_IMAGES = ['/assets/hall1.jpg', '/assets/hall2.jpg', '/assets/hall3.jpg']

const AMENITIES = [
  { icon: <EnvironmentOutlined />, key: 'cityCenter' },
  { icon: <DatabaseOutlined />, key: 'studios' },
  { icon: <ThunderboltOutlined />, key: 'airConditioning' },
  { icon: <SoundOutlined />, key: 'soundSystem' },
  { icon: <LockOutlined />, key: 'lockers' },
  { icon: <WifiOutlined />, key: 'wifi' },
  { icon: <CoffeeOutlined />, key: 'bar' },
  { icon: <CarOutlined />, key: 'parking' },
]

const HALLS = [
  {
    id: 'small',
    area: 78,
    capacity: 15,
    price: 120,
    images: ['/assets/hall1.jpg'],
    features: ['mirrors', 'woodFloor', 'bluetooth', 'ac'],
  },
  {
    id: 'medium',
    area: 133,
    capacity: 25,
    price: 160,
    images: ['/assets/hall2.jpg'],
    features: ['mirrors', 'woodFloor', 'bluetooth', 'ac'],
  },
  {
    id: 'large',
    area: 157,
    capacity: 35,
    price: 190,
    images: ['/assets/hall3.jpg'],
    features: ['mirrors', 'sprungFloor', 'stageLights', 'ac'],
  },
]

export default function Rent() {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'pl'

  const bookStudio = (hallId) => {
    const query = new URLSearchParams({ intent: 'rent', hall: hallId })
    window.location.href = `/contacts?${query.toString()}`
  }

  const formatPrice = (price) => new Intl.NumberFormat(language === 'pl' ? 'pl-PL' : 'en-GB', {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 0,
  }).format(price)

  return (
    <div className="rent-wrap">
      <div className="rental-container">
        <Title level={1} className="rent-title">{t('rent.title')}</Title>

        <section className="rental-section rental-gallery-card rental-card">
          <GallerySwiper images={HERO_IMAGES} height={520} autoplay altPrefix={t('rent.galleryAlt')} />
        </section>

        <section className="rental-section">
          <Title level={2} style={{ textAlign: 'center', marginBottom: 16, fontSize: 24, lineHeight: 1.3333 }}>
            {t('rent.whyTitle')}
          </Title>
          <Row className="amenities">
            {AMENITIES.map((amenity) => (
              <Col xs={12} sm={8} md={6} key={amenity.key}>
                <Card className="amenity-card" bordered>
                  <div className="amenity-icon">{amenity.icon}</div>
                  <div className="amenity-label">{t(`rent.amenities.${amenity.key}`)}</div>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section className="rental-section">
          <Title level={2} style={{ textAlign: 'center', marginBottom: 8, fontSize: 24, lineHeight: 1.3333 }}>
            {t('rent.hallsTitle')}
          </Title>
          <Row gutter={[16, 16]}>
            {HALLS.map((hall) => {
              const hallName = t(`rent.halls.${hall.id}`)
              return (
                <Col xs={24} md={8} key={hall.id}>
                  <Card className="hall-card" bordered>
                    <div className="hall-media">
                      <GallerySwiper images={hall.images} height={260} altPrefix={`${hallName} — DANCE POINT`} />
                    </div>
                    <Space direction="vertical" size={6} style={{ width: '100%', marginTop: 12 }}>
                      <Title level={3} style={{ margin: 0, fontSize: 20, lineHeight: 1.4 }}>{hallName}</Title>
                      <div className="hall-meta">
                        <span><strong>{t('rent.area')}:</strong> {hall.area} m²</span>
                        <span><strong>{t('rent.capacity')}:</strong> {t('rent.upToPeople', { count: hall.capacity })}</span>
                      </div>
                      <div className="hall-price">{formatPrice(hall.price)} / {t('rent.perHour')}</div>
                      <div className="hall-features">
                        {hall.features.map((feature) => <Tag key={feature}>{t(`rent.features.${feature}`)}</Tag>)}
                      </div>
                      <Button type="primary" size="large" block onClick={() => bookStudio(hall.id)}>
                        {t('rent.bookHall')}
                      </Button>
                    </Space>
                  </Card>
                </Col>
              )
            })}
          </Row>

          <Divider />

          <Paragraph type="secondary" style={{ textAlign: 'center' }}>
            {t('rent.description')}
          </Paragraph>
        </section>

        <div className="rental-cta-wrap">
          <Button type="primary" size="large" className="rental-cta-big" href="/contacts?intent=rent">
            {t('rent.cta')}
          </Button>
        </div>
      </div>
    </div>
  )
}
