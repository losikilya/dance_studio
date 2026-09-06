// src/components/GallerySwiper.jsx
import { Carousel } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import './gallerySwiper.css'

export default function GallerySwiper({
  images = [],
  mode = 'fixed',
  height = 420,
  autoplay = false,
  altPrefix = 'DANCE POINT',
}) {
  const ref = useRef(null)
  const { t } = useTranslation()
  const isAdaptive = mode === 'adaptive'
  const fixedHeight = typeof height === 'number' ? `${height}px` : height

  return (
    <div
      className={`gallery-swiper gallery-swiper--${isAdaptive ? 'adaptive' : 'fixed'}`}
      style={isAdaptive ? undefined : { '--gallery-height': fixedHeight }}
    >
      <button className="nav prev" aria-label={t('common.previous')} onClick={() => ref.current?.prev()}>
        <LeftOutlined />
      </button>
      <Carousel ref={ref} dots autoplay={autoplay} draggable swipeToSlide adaptiveHeight={isAdaptive}>
        {images.map((src, i) => (
          <div className="slide" key={src}>
            <img src={src} alt={`${altPrefix} – zdjęcie ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </Carousel>
      <button className="nav next" aria-label={t('common.next')} onClick={() => ref.current?.next()}>
        <RightOutlined />
      </button>
    </div>
  )
}
