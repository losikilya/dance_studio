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
      <div className="container">
                <Typography.Title level={2} className="page-title">{t('schedule.title')}</Typography.Title>
        <section className="section card">
                  <GallerySwiper images={HERO_IMAGES}/>
        </section>
        <div className="cta-wrap">
          <Button type="primary" size="large" className="cta-big" href="/contacts?intent=booking">
            {t('signup')}
          </Button>
          <Typography.Text className="cta-note">{t('schedule.note')}</Typography.Text>
        </div>
      </div>
    </div>
  )
}
