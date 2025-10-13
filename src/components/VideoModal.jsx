// src/components/VideoModal.jsx
import { Modal } from 'antd'
import './videoModal.css'

export default function VideoModal({ open, videoId, onClose }) {
  // чистим src при закрытии, чтобы стопнуть видео
  const src = open && videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
    : undefined

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={920}
      centered
      destroyOnClose
      bodyStyle={{ padding: 0 }}
    >
      <div className="video-aspect">
        {src && (
          <iframe
            title="Teachers video"
            src={src}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </Modal>
  )
}
