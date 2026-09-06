import { Button, Typography } from 'antd'
import GallerySwiper from '../components/GallerySwiper'
import './schedule.css'
import { useTranslation } from 'react-i18next';

// --- mock images (replace with your assets)
const HERO_IMAGES = [
  '/assets/grafik_1.jpg',
  '/assets/grafik_2.jpeg',
]

export default function ScheduleLight() {
  const { t } = useTranslation();
  
  return (
    <div className="schedule-wrap">
      <div className="schedule-container">
                <Typography.Title level={1} className="page-title">{t('schedule.title')}</Typography.Title>
        <section className="schedule-section schedule-gallery-card schedule-card">
                  <GallerySwiper images={HERO_IMAGES} altPrefix={t('schedule.imageAlt')} />
        </section>
        <div className="schedule-cta-wrap">
          <Button type="primary" size="large" className="schedule-cta-big" href="/contacts?intent=booking">
            {t('common.signUp')}
          </Button>
          <Typography.Text className="schedule-cta-note">{t('schedule.note')}</Typography.Text>
        </div>
      </div>
    </div>
  )
}
