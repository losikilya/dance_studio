// src/components/VideoModal.jsx
import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { getYouTubeVideoId } from '../utils/youtube'
import './videoModal.css'

export default function VideoModal({ open, videoUrl, onClose }) {
  const { t } = useTranslation()
  const videoId = getYouTubeVideoId(videoUrl)
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
      destroyOnHidden
      styles={{ body: { padding: 0 } }}
    >
      <div className="video-modal-aspect">
        {src && (
          <iframe
            title={t('teachers.videoDialogTitle')}
            src={src}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </Modal>
  )
}
