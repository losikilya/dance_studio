// src/components/GallerySwiper.jsx
import { Carousel } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useRef, useState } from 'react'
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
  const [activeIndex, setActiveIndex] = useState(0)
  const [imageRatios, setImageRatios] = useState({})
  const { t } = useTranslation()
  const isAdaptive = mode === 'adaptive'
  const fixedHeight = typeof height === 'number' ? `${height}px` : height
  const activeImage = images[activeIndex] ?? images[0]
  const activeRatio = imageRatios[activeImage?.src] ?? (activeImage ? activeImage.width / activeImage.height : 16 / 9)

  const rememberImageRatio = (src, image) => {
    if (!isAdaptive || !image.naturalWidth || !image.naturalHeight) return

    const ratio = image.naturalWidth / image.naturalHeight
    setImageRatios((current) => (
      current[src] === ratio ? current : { ...current, [src]: ratio }
    ))
  }

  return (
    <div
      className={`gallery-swiper gallery-swiper--${isAdaptive ? 'adaptive' : 'fixed'}`}
      style={isAdaptive
        ? { '--gallery-aspect-ratio': activeRatio }
        : { '--gallery-height': fixedHeight }}
    >
      <button className="nav prev" aria-label={t('common.previous')} onClick={() => ref.current?.prev()}>
        <LeftOutlined />
      </button>
      <Carousel
        ref={ref}
        dots
        autoplay={autoplay}
        draggable
        swipeToSlide
        lazyLoad="ondemand"
        afterChange={isAdaptive ? setActiveIndex : undefined}
      >
        {images.map((image, i) => (
          <div className="slide" key={image.src}>
            <img
              {...image}
              sizes="(max-width: 1200px) 100vw, 1160px"
              alt={`${altPrefix} – zdjęcie ${i + 1}`}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              decoding="async"
              onLoad={(event) => rememberImageRatio(image.src, event.currentTarget)}
            />
          </div>
        ))}
      </Carousel>
      <button className="nav next" aria-label={t('common.next')} onClick={() => ref.current?.next()}>
        <RightOutlined />
      </button>
    </div>
  )
}
