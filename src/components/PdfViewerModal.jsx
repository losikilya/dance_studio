import { Modal } from 'antd'

export default function PdfViewerModal({ open, onClose, src, title }) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={title || 'Document'}
      width={980}
      centered
      bodyStyle={{ padding: 0, height: '75vh' }}
      destroyOnClose
    >
      {src ? (
        <iframe
          title={title || 'PDF'}
          src={src}
          style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
        />
      ) : null}
    </Modal>
  )
}
