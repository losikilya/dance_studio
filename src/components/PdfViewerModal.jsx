import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'

export default function PdfViewerModal({ open, onClose, src, title }) {
  const { t } = useTranslation()
  const fallbackTitle = t('documents.viewerTitle')

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={title || fallbackTitle}
      width={980}
      centered
      styles={{ body: { padding: 0, height: '75vh' } }}
      destroyOnHidden
    >
      {src ? (
        <iframe
          title={title || fallbackTitle}
          src={src}
          style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
        />
      ) : null}
    </Modal>
  )
}
