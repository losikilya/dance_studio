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
import { Button, Card, Col, Row, Typography } from 'antd'
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

const RENTAL_PRICES = [
  { id: 'individualLesson', memberPrice: 30, standardPrice: 40 },
  { id: 'groupLesson', memberPrice: 80, standardPrice: 100 },
]

export default function Rent() {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'pl'
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
          <Title level={2} className="rental-section-title">
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

        <section className="rental-section rental-pricing-section">
          <Title level={2} className="rental-section-title">
            {t('rent.pricingTitle')}
          </Title>

          <Card className="rental-price-card" bordered>
            <div className="rental-price-table-wrap">
              <table className="rental-price-table">
                <thead>
                  <tr>
                    <th scope="col">{t('rent.service')}</th>
                    <th scope="col">{t('rent.members')}</th>
                    <th scope="col">{t('rent.others')}</th>
                  </tr>
                </thead>
                <tbody>
                  {RENTAL_PRICES.map((price) => (
                    <tr key={price.id}>
                      <th scope="row">{t(`rent.services.${price.id}`)}</th>
                      <td>{formatPrice(price.memberPrice)}</td>
                      <td>{formatPrice(price.standardPrice)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="recording-price-card" bordered>
            <Title level={3}>{t('rent.services.recordingRental')}</Title>
            <div className="recording-price">{formatPrice(130)}</div>
          </Card>

          <Paragraph className="rental-individual-note">
            {t('rent.individualTerms')}
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
