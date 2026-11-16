import { StarFilled } from '@ant-design/icons'
import { Button, Card, Col, Row, Tag, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import './prices.css'

const { Title, Paragraph, Text } = Typography

const PRICE_SECTIONS = [
  {
    id: 'open',
    titleKey: 'openClasses',
    descriptionKey: 'openStyles',
    plans: [
      { id: 'open-single', nameKey: 'openSingle', price: 70 },
      { id: 'open-four', nameKey: 'openFour', price: 210 },
      { id: 'open-eight', nameKey: 'openEight', price: 320 },
      { id: 'open-full-pass', nameKey: 'openFullPass', price: 380, best: true },
    ],
  },
  {
    id: 'kids',
    titleKey: 'kids',
    plans: [
      { id: 'mini-kids', nameKey: 'miniKids', detailKey: 'weekly40', price: 160 },
      { id: 'kids', nameKey: 'kids', detailKey: 'weekly60', price: 180 },
      { id: 'jazz-minis', nameKey: 'jazzMinis', detailKey: 'weekly60', price: 180 },
      { id: 'street-dance', nameKey: 'streetDance', detailKey: 'weekly60', price: 180 },
      { id: 'kids-acrobatics', nameKey: 'kidsAcrobatics', detailKey: 'twiceWeekly', price: 280 },
    ],
  },
  {
    id: 'closed',
    titleKey: 'closedGroups',
    descriptionKey: 'closedDuration',
    plans: [
      { id: 'supa-fly', nameKey: 'supaFly', extraKey: 'withAcrobatics', detailKey: 'threeTimesWeekly', price: 340, fullPassPrice: 400 },
      { id: 'jazzowki', nameKey: 'jazzowki', extraKey: 'withBalletAndAcrobatics', detailKey: 'fourTimesWeekly', price: 420 },
      { id: 'waack-on-point', nameKey: 'waackOnPoint', detailKey: 'twiceWeekly', price: 280, fullPassPrice: 320 },
      { id: 'k-point', nameKey: 'kPoint', detailKey: 'regularAndOpen', price: 240 },
    ],
  },
]

function PriceCard({ plan, formatPrice, t }) {
  return (
    <Card
      className={`price-card ${plan.best ? 'is-best' : ''}`}
      variant="outlined"
      title={(
        <div className="price-card-title">
          {plan.best && (
            <Tag color="gold" icon={<StarFilled />}>
              {t('prices.bestOffer')}
            </Tag>
          )}
          <span>{t(`prices.plans.${plan.nameKey}`)}</span>
        </div>
      )}
    >
      <div className="price-card-content">
        <div className="price-details">
          {plan.extraKey && <div>{t(`prices.details.${plan.extraKey}`)}</div>}
          {plan.detailKey && <div>{t(`prices.details.${plan.detailKey}`)}</div>}
        </div>
        <div className="price-value">{formatPrice(plan.price)}</div>
        {plan.fullPassPrice && (
          <div className="price-full-pass">
            <span>{t('prices.fullPass')}</span>
            <strong>{formatPrice(plan.fullPassPrice)}</strong>
          </div>
        )}
      </div>
    </Card>
  )
}

export default function Prices() {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'pl'
  const formatPrice = (price) => new Intl.NumberFormat(language === 'pl' ? 'pl-PL' : 'en-GB', {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 0,
  }).format(price)

  return (
    <div className="prices-wrap">
      <div className="prices-container">
        <Title level={1} className="prices-title">{t('prices.title')}</Title>

        {PRICE_SECTIONS.map((section) => (
          <section className="pricing-section" key={section.id}>
            <Title level={2} className="pricing-section-title">
              {t(`prices.sections.${section.titleKey}`)}
            </Title>
            {section.descriptionKey && (
              <Paragraph className="pricing-section-description">
                {t(`prices.sections.${section.descriptionKey}`)}
              </Paragraph>
            )}
            <Row gutter={[16, 16]}>
              {section.plans.map((plan) => (
                <Col xs={24} sm={12} lg={6} key={plan.id}>
                  <PriceCard plan={plan} formatPrice={formatPrice} t={t} />
                </Col>
              ))}
            </Row>
          </section>
        ))}

        <Paragraph className="price-validity-note">{t('prices.validityNote')}</Paragraph>

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
