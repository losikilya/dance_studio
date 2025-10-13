// src/pages/Rent.jsx
import { Typography, Row, Col, Card, Space, Button, Tag, Divider } from 'antd'
import {
  EnvironmentOutlined, WifiOutlined, CoffeeOutlined, SoundOutlined,
  LockOutlined, CarOutlined, DatabaseOutlined, ThunderboltOutlined
} from '@ant-design/icons'
import GallerySwiper from '../components/GallerySwiper'
import './rent.css'

const { Title, Paragraph, Text } = Typography

// --- mock images (replace with your assets)
const HERO_IMAGES = [
  'src/assets/hall1.jpg',
  'src/assets/hall2.jpg',
  'src/assets/hall3.jpg',
]

// amenities block
const AMENITIES = [
  { icon: <EnvironmentOutlined />, label: 'City center' },
  { icon: <DatabaseOutlined />, label: '3 stylish studios' },
  { icon: <ThunderboltOutlined />, label: 'Air conditioning' },
  { icon: <SoundOutlined />, label: 'Pro sound system' },
  { icon: <LockOutlined />, label: 'Personal lockers' },
  { icon: <WifiOutlined />, label: 'Wi-Fi' },
  { icon: <CoffeeOutlined />, label: 'Bar & snacks' },
  { icon: <CarOutlined />, label: 'Parking nearby' },
]

// halls
const HALLS = [
  {
    id: 'small',
    name: 'Small Hall',
    area: 78,
    capacity: 15,
    price: 120, // PLN/hour
    images: [
      'src/assets/hall1.jpg',
    ],
    features: ['Mirrors wall', 'Wood floor', 'Bluetooth audio', 'AC'],
  },
  {
    id: 'medium',
    name: 'Medium Hall',
    area: 133,
    capacity: 25,
    price: 160,
    images: [
      'src/assets/hall2.jpg',
    ],
    features: ['Mirrors wall', 'Wood floor', 'Bluetooth audio', 'AC'],
  },
  {
    id: 'large',
    name: 'Large Hall',
    area: 157,
    capacity: 35,
    price: 190,
    images: [
      'src/assets/hall3.jpg',
    ],
    features: ['Mirrors wall', 'Sprung floor', 'Stage lights', 'AC'],
  },
]

const fmtPLN = (n) =>
  new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 }).format(n)

export default function Rent() {
  const bookStudio = (hallId) => {
    const q = new URLSearchParams({ intent: 'rent', hall: hallId })
    window.location.href = `/contacts?${q.toString()}`
  }

  return (
    <div className="rent-wrap">
      <div className="container">
        <Title level={2} className="rent-title">Studio Rental</Title>

        {/* 1) Gallery */}
        <section className="section card">
          <GallerySwiper images={HERO_IMAGES} height={520} autoplay />
        </section>

        {/* 2) Amenities */}
        <section className="section">
          <Title level={3} style={{ textAlign: 'center', marginBottom: 16 }}>Why rent at DANCE POINT</Title>
          <Row gutter={[16, 16]} className="amenities">
            {AMENITIES.map((a) => (
              <Col xs={12} sm={8} md={6} key={a.label}>
                <Card className="amenity-card" bordered>
                  <div className="amenity-icon">{a.icon}</div>
                  <div className="amenity-label">{a.label}</div>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* 3) Halls & prices */}
        <section className="section">
          <Title level={3} style={{ textAlign: 'center', marginBottom: 8 }}>Our Halls</Title>
          <Row gutter={[16, 16]}>
            {HALLS.map((h) => (
              <Col xs={24} md={8} key={h.id}>
                <Card className="hall-card" bordered>
                  <div className="hall-media">
                    <GallerySwiper images={h.images} height={260} />
                  </div>
                  <Space direction="vertical" size={6} style={{ width: '100%', marginTop: 12 }}>
                    <Title level={4} style={{ margin: 0 }}>{h.name}</Title>
                    <div className="hall-meta">
                      <span><strong>Area:</strong> {h.area} m²</span>
                      <span><strong>Capacity:</strong> up to {h.capacity} people</span>
                    </div>
                    <div className="hall-price">{fmtPLN(h.price)} / hour</div>
                    <div className="hall-features">
                      {h.features.map((f) => <Tag key={f}>{f}</Tag>)}
                    </div>
                    <Button type="primary" size="large" block onClick={() => bookStudio(h.id)}>
                      Book this hall
                    </Button>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>

          <Divider />

          <Paragraph type="secondary" style={{ textAlign: 'center' }}>
            For private lessons, rehearsals or events. Night hours and special events may have different rates.
            Please contact the front desk for custom quotes.
          </Paragraph>
        </section>

        {/* Big CTA */}
        <div className="cta-wrap">
          <Button type="primary" size="large" className="cta-big" href="/contacts?intent=rent">
            Book a studio now
          </Button>
        </div>
      </div>
    </div>
  )
}
