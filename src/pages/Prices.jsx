import { CheckOutlined, StarFilled } from '@ant-design/icons'
import { Button, Card, Col, Collapse, Divider, List, Row, Segmented, Tag, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './prices.css'

const { Title, Paragraph, Text } = Typography
const { Panel } = Collapse

const PRICING = {
  adult: {
    monthly: [
      { id: 'unlimited', nameKey: 'unlimited', price: 39000, best: true, perks: ['allOpen', 'openPractice', 'eventsPresale'] },
      { id: '12x', nameKey: 'twelve', price: 32000, perks: ['anyGroups', 'freeze'] },
      { id: '8x', nameKey: 'eight', price: 26000, perks: ['anyGroups'] },
      { id: '4x', nameKey: 'four', price: 16000, perks: ['anyGroups'] },
    ],
    dropin: [
      { id: 'dropin', nameKey: 'single', price: 4000, perks: ['oneClass'] },
      { id: 'trial', nameKey: 'trial', price: 2000, accentKey: 'newToStudio', perks: [] },
    ],
  },
  kids: {
    monthly: [
      { id: 'kids-8x', nameKey: 'kidsEight', price: 22000, perks: ['kidsOnly'] },
      { id: 'kids-4x', nameKey: 'kidsFour', price: 13000, perks: ['kidsOnly'] },
    ],
    dropin: [
      { id: 'kids-dropin', nameKey: 'kidsSingle', price: 3000, perks: [] },
    ],
  },
}

const DISCOUNTS = [
  { id: 'student', value: '-10%' },
  { id: 'family', value: '-10%' },
]

const FAQ = ['validity', 'classes', 'transfer']

function PriceCard({ plan, language, onBuy, t }) {
  const formattedPrice = new Intl.NumberFormat(language === 'pl' ? 'pl-PL' : 'en-GB', {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 0,
  }).format(plan.price)

  return (
    <Card
      className={`price-card ${plan.best ? 'is-best' : ''}`}
      bordered
      title={(
        <div className="price-head">
          {plan.best && <Tag color="gold" icon={<StarFilled />}>{t('prices.popular')}</Tag>}
          <span>{t(`prices.plans.${plan.nameKey}`)}</span>
        </div>
      )}
      actions={[
        <Button key="buy" type="primary" size="large" onClick={() => onBuy(plan)}>
          {t('prices.buyPass')}
        </Button>,
      ]}
    >
      <div className="price-value">{formattedPrice}</div>
      {plan.accentKey && <div className="price-accent">{t(`prices.${plan.accentKey}`)}</div>}
      <ul className="price-perks">
        {plan.perks.map((perk) => (
          <li key={perk}><CheckOutlined /> {t(`prices.perks.${perk}`)}</li>
        ))}
      </ul>
    </Card>
  )
}

export default function Prices() {
  const [segment, setSegment] = useState('adult')
  const [type, setType] = useState('monthly')
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'pl'
  const plans = useMemo(() => PRICING[segment][type], [segment, type])

  const handleBuy = (plan) => {
    const params = new URLSearchParams({ plan: plan.id })
    window.location.href = `/contacts?${params.toString()}`
  }

  return (
    <div className="prices-wrap">
      <div className="prices-container">
        <Title level={1} className="prices-title">{t('prices.title')}</Title>

        <div className="switchers">
          <Segmented
            size="large"
            value={segment}
            onChange={setSegment}
            options={[
              { value: 'adult', label: t('prices.adult') },
              { value: 'kids', label: t('prices.kids') },
            ]}
          />
          <Segmented
            size="large"
            value={type}
            onChange={setType}
            options={[
              { value: 'monthly', label: t('prices.monthly') },
              { value: 'dropin', label: t('prices.dropIn') },
            ]}
          />
        </div>

        <Row gutter={[16, 16]}>
          {plans.map((plan) => (
            <Col xs={24} sm={12} lg={6} key={plan.id}>
              <PriceCard plan={plan} language={language} onBuy={handleBuy} t={t} />
            </Col>
          ))}
        </Row>

        <Divider />

        <section className="discounts prices-card">
          <Title level={2} style={{ marginBottom: 8, fontSize: 20, lineHeight: 1.4 }}>
            {t('prices.discountsTitle')}
          </Title>
          <List
            dataSource={DISCOUNTS}
            renderItem={(discount) => (
              <List.Item>
                <List.Item.Meta
                  title={<strong>{t(`prices.discounts.${discount.id}`)}</strong>}
                  description={t(`prices.discounts.${discount.id}Note`)}
                />
                <Tag color="green">{discount.value}</Tag>
              </List.Item>
            )}
          />
        </section>

        <section className="faq prices-card">
          <Title level={2} style={{ marginBottom: 8, fontSize: 20, lineHeight: 1.4 }}>
            {t('prices.faqTitle')}
          </Title>
          <Collapse accordion>
            {FAQ.map((item) => (
              <Panel header={t(`prices.faq.${item}Question`)} key={item}>
                <Paragraph>{t(`prices.faq.${item}Answer`)}</Paragraph>
              </Panel>
            ))}
          </Collapse>
        </section>

        <div className="prices-cta-wrap">
          <Button type="primary" size="large" className="prices-cta-big" href="/contacts?intent=booking">
            {t('prices.cta')}
          </Button>
          <Text className="prices-cta-note">{t('prices.ctaNote')}</Text>
        </div>
      </div>
    </div>
  )
}
