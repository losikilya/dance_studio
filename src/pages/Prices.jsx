import { useMemo, useState } from 'react'
import { Typography, Segmented, Row, Col, Card, Tag, Button, List, Collapse, Divider } from 'antd'
import { CheckOutlined, StarFilled } from '@ant-design/icons'
import './prices.css'

const { Title, Paragraph, Text } = Typography
const { Panel } = Collapse

// ---- Mock pricing (KZT). Adjust as needed.
const PRICING = {
  adult: {
    monthly: [
      { id: 'unlimited', name: 'Unlimited (30 days)', price: 39000, best: true, perks: ['All open classes', 'Free open practice', 'Priority events presale'] },
      { id: '12x', name: '12 classes / 30 days', price: 32000, perks: ['Any groups', 'Freeze 1 time (3 days)'] },
      { id: '8x', name: '8 classes / 30 days', price: 26000, perks: ['Any groups'] },
      { id: '4x', name: '4 classes / 30 days', price: 16000, perks: ['Any groups'] },
    ],
    dropin: [
      { id: 'dropin', name: 'Single class (drop-in)', price: 4000, perks: ['Valid for 1 class'] },
      { id: 'trial', name: 'Trial class', price: 2000, accent: 'New to the studio' },
    ],
  },
  kids: {
    monthly: [
      { id: 'kids-8x', name: 'Kids 8 classes / 30 days', price: 22000, perks: ['Kids groups only'] },
      { id: 'kids-4x', name: 'Kids 4 classes / 30 days', price: 13000, perks: ['Kids groups only'] },
    ],
    dropin: [{ id: 'kids-dropin', name: 'Kids single class', price: 3000, perks: [] }],
  },
}

const DISCOUNTS = [
  { id: 'student', label: 'Student discount', value: '-10%', note: 'Show valid student ID at the front desk.' },
  { id: 'family', label: 'Family / Siblings', value: '-10%', note: 'When purchasing 2+ passes together.' },
]

const formatKZT = (n) =>
  new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 }).format(n)

function PriceCard({ plan, onBuy }) {
  return (
    <Card
      className={`price-card ${plan.best ? 'is-best' : ''}`}
      bordered
      title={
        <div className="price-head">
          {plan.best && <Tag color="gold" icon={<StarFilled />}>Popular</Tag>}
          <span>{plan.name}</span>
        </div>
      }
      actions={[
        <Button key="buy" type="primary" size="large" onClick={() => onBuy(plan)}>Buy pass</Button>,
      ]}
    >
      <div className="price-value">{formatKZT(plan.price)}</div>
      {plan.accent && <div className="price-accent">{plan.accent}</div>}
      <ul className="price-perks">
        {(plan.perks || []).map((p) => (
          <li key={p}><CheckOutlined /> {p}</li>
        ))}
      </ul>
    </Card>
  )
}

export default function Prices() {
  const [segment, setSegment] = useState('Adult')
  const [type, setType] = useState('Monthly')

  const data = useMemo(() => {
    const key = segment === 'Adult' ? 'adult' : 'kids'
    return {
      monthly: PRICING[key].monthly,
      dropin: PRICING[key].dropin,
    }
  }, [segment])

  const handleBuy = (plan) => {
    const params = new URLSearchParams({ plan: plan.id })
    window.location.href = `/contacts?${params.toString()}`
  }

  return (
    <div className="prices-wrap">
      <div className="container">
        <Title level={2} className="prices-title">Prices & Passes</Title>

        <div className="switchers">
          <Segmented
            size="large"
            value={segment}
            onChange={setSegment}
            options={['Adult', 'Kids']}
          />
          <Segmented
            size="large"
            value={type}
            onChange={setType}
            options={['Monthly', 'Drop-in']}
          />
        </div>

        {/* Monthly or Drop-in grid */}
        {type === 'Monthly' ? (
          <>
            <Row gutter={[16, 16]}>
              {data.monthly.map((p) => (
                <Col xs={24} sm={12} lg={6} key={p.id}>
                  <PriceCard plan={p} onBuy={handleBuy} />
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <Row gutter={[16, 16]}>
            {data.dropin.map((p) => (
              <Col xs={24} sm={12} lg={6} key={p.id}>
                <PriceCard plan={p} onBuy={handleBuy} />
              </Col>
            ))}
          </Row>
        )}

        <Divider />

        {/* Discounts */}
        <section className="discounts card">
          <Title level={4} style={{ marginBottom: 8 }}>Discounts</Title>
          <List
            dataSource={DISCOUNTS}
            renderItem={(d) => (
              <List.Item>
                <List.Item.Meta
                  title={<strong>{d.label}</strong>}
                  description={d.note}
                />
                <Tag color="green">{d.value}</Tag>
              </List.Item>
            )}
          />
        </section>

        {/* Terms / FAQ */}
        <section className="faq card">
          <Title level={4} style={{ marginBottom: 8 }}>Terms & FAQ</Title>
          <Collapse accordion>
            <Panel header="How long is a monthly pass valid?" key="1">
              <Paragraph>30 calendar days from the first visit. You can freeze your pass once for up to 3 days (Unlimited / 12x).</Paragraph>
            </Panel>
            <Panel header="Do passes work across all classes?" key="2">
              <Paragraph>Yes, unless marked as special workshops. Kids passes are valid for kids groups only.</Paragraph>
            </Panel>
            <Panel header="Can I transfer a pass?" key="3">
              <Paragraph>Passes are personal and non-transferable.</Paragraph>
            </Panel>
            <Panel header="Payment methods" key="4">
              <Paragraph>Cash, card, Kaspi QR. Corporate invoices on request.</Paragraph>
            </Panel>
          </Collapse>
        </section>

        {/* Big CTA */}
        <div className="cta-wrap">
          <Button type="primary" size="large" className="cta-big" href="/contacts?intent=booking">
            Book a class now
          </Button>
          <Text className="cta-note">Not sure which pass to choose? Book a trial and we’ll help you pick.</Text>
        </div>
      </div>
    </div>
  )
}
