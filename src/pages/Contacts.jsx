import { Typography, Row, Col, Card, Form, Input, Button, Space, Tag } from 'antd'
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  InstagramOutlined,
  FacebookFilled,
  WhatsAppOutlined,
} from '@ant-design/icons'
import './contacts.css'

const { Title, Paragraph, Text, Link: AntLink } = Typography

// — Заполни эти данные своими
const STUDIO = {
  name: 'DANCE POINT',
  phones: ['+48 697 250 988', '+48 511 279 323'],
  email: 'hello@dancepoint.pl',
  instagram: 'https://instagram.com/yourstudio',
  facebook: 'https://facebook.com/yourstudio',
  whatsapp: 'https://wa.me/48697250988', // в формате wa.me/<PL_phone>
  hours: [
    { label: 'Mon – Fri', value: '16:00 – 22:00' },
    { label: 'Sat', value: '10:00 – 18:00' },
    { label: 'Sun', value: 'Closed' },
  ],
  addressLines: ['ul. Podgórna 15, 2nd floor', 'Stare Miasto, 61-828 Poznań, Poland'],
  mapsQuery: 'ul.+Podgórna+15,+Poznań,+Poland',
}

function MapEmbed({ query }) {
  const src = `https://www.google.com/maps?q=${query}&output=embed`
  return (
    <div className="map-embed">
      <iframe
        title="DANCE POINT on Google Maps"
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  )
}

export default function Contacts() {
  const onFinish = async (values) => {
    // временно: Formspree или ваш API
    await fetch('https://formspree.io/f/xxxxxx', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
  }

  return (
    <div className="contacts-wrap">
      <div className="container">
        <Title level={2} className="contacts-title">Contacts</Title>

        <Row gutter={[16, 16]} align="stretch">
          {/* LEFT: Info */}
          <Col xs={24} md={10}>
            <Card className="card info-card" bordered>
              <Title level={4} style={{ marginTop: 0 }}>{STUDIO.name}</Title>

              <Space direction="vertical" size={12} style={{ width: '100%' }}>
                <div className="info-row">
                  <PhoneOutlined />
                  <div>
                    {STUDIO.phones.map(p => (
                      <div key={p}><a href={`tel:${p.replace(/\s+/g, '')}`}>{p}</a></div>
                    ))}
                  </div>
                </div>

                <div className="info-row">
                  <MailOutlined />
                  <a href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>
                </div>

                <div className="info-row">
                  <EnvironmentOutlined />
                  <div>
                    {STUDIO.addressLines.map((l, i) => <div key={i}>{l}</div>)}
                  </div>
                </div>

                <div className="info-row">
                  <ClockCircleOutlined />
                  <div className="hours">
                    {STUDIO.hours.map(h => (
                      <div key={h.label}><Text strong>{h.label}:</Text> {h.value}</div>
                    ))}
                  </div>
                </div>

                <div className="socials">
                  <a aria-label="Instagram" href={STUDIO.instagram} target="_blank" rel="noreferrer" className="social-btn">
                    <InstagramOutlined />
                  </a>
                  <a aria-label="WhatsApp" href={STUDIO.whatsapp} target="_blank" rel="noreferrer" className="social-btn">
                    <WhatsAppOutlined />
                  </a>
                  <a aria-label="Facebook" href={STUDIO.facebook} target="_blank" rel="noreferrer" className="social-btn">
                    <FacebookFilled />
                  </a>
                </div>
              </Space>
            </Card>
          </Col>

          {/* RIGHT: Form */}
          <Col xs={24} md={14}>
            <Card className="card form-card" bordered>
              <Title level={4} style={{ marginTop: 0 }}>Write to us</Title>
              <Paragraph type="secondary" style={{ marginTop: -6 }}>
                Have a question about classes, rental or events? Send us a message — we’ll get back ASAP.
              </Paragraph>

              <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
                <Row gutter={12}>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
                      <Input placeholder="Your name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Email" name="email" rules={[{ type: 'email', required: true }]}>
                      <Input placeholder="you@example.com" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={12}>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Phone (optional)" name="phone">
                      <Input placeholder="+48 ..." />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Topic" name="topic">
                      <Input placeholder="Classes / Rental / Other" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item label="Message" name="message" rules={[{ required: true, message: 'Please enter your message' }]}>
                  <Input.TextArea placeholder="How can we help?" rows={6} />
                </Form.Item>

                <Space size={12} style={{ width: '100%', justifyContent: 'flex-end' }}>
                  <Button htmlType="reset">Clear</Button>
                  <Button type="primary" htmlType="submit">Send</Button>
                </Space>
              </Form>
            </Card>
          </Col>
        </Row>

        {/* MAP */}
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} md={10}>
            <Card className="card" bordered>
              <Title level={4} style={{ marginTop: 0 }}>How to find us</Title>
              <Paragraph>
                We’re located in the very center of Poznań, Old Town area. Use the entrance at <Text strong>ul. Podgórna 15</Text> and go to the 2nd floor.
              </Paragraph>
              <Space wrap>
                <Tag color="default">Tram: Pl. Wolności</Tag>
                <Tag color="default">Parking: street & lots nearby</Tag>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={14}>
            <Card className="card map-card" bordered>
              <MapEmbed query={STUDIO.mapsQuery} />
            </Card>
          </Col>
        </Row>

        {/* BIG CTA */}
        <div className="cta-wrap">
          <Button
            type="primary"
            size="large"
            className="cta-big"
            href="/contacts?intent=booking"
          >
            Book a trial class
          </Button>
          <Text className="cta-note">Prefer WhatsApp? <AntLink href={STUDIO.whatsapp} target="_blank">Message us</AntLink>.</Text>
        </div>
      </div>
    </div>
  )
}
