// src/components/GallerySwiper.jsx
import { Carousel } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { useRef } from 'react'
import './gallerySwiper.css'

export default function GallerySwiper({ images = [], height, autoplay = false }) {
  const ref = useRef(null)

  return (
    <div className="gallery-swiper" style={ height ? { '--h': `${height}px` } : {}}>
      <button className="nav prev" aria-label="Previous" onClick={() => ref.current?.prev()}>
        <LeftOutlined />
      </button>
      <Carousel ref={ref} dots autoplay={autoplay} draggable swipeToSlide>
        {images.map((src, i) => (
          <div className="slide" key={i}>
            <img src={src} alt={`gallery ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </Carousel>
      <button className="nav next" aria-label="Next" onClick={() => ref.current?.next()}>
        <RightOutlined />
      </button>
    </div>
  )
}
