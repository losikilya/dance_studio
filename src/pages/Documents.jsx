import { DownloadOutlined, EyeOutlined, FilePdfOutlined } from '@ant-design/icons'
import { Button, Card, List, Space, Tag, Typography } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PdfViewerModal from '../components/PdfViewerModal'
import './documents.css'

import rentalPdf from '/assets/docs/doc3.pdf'
import rulesPdf from '/assets/docs/doc1.pdf'

const { Title, Text } = Typography

const DOCUMENTS = [
  { id: 'rules', file: rulesPdf, language: 'EN', titleKey: 'rulesTitle', descriptionKey: 'rulesDescription', tagKey: 'policyTag', updatedAt: '2025-09-01' },
  { id: 'rental', file: rentalPdf, language: 'EN', titleKey: 'rentalTitle', descriptionKey: 'rentalDescription', tagKey: 'rentalTag', updatedAt: '2025-08-20' },
]

export default function Documents() {
  const [viewer, setViewer] = useState({ open: false, src: null, title: '' })
  const { t } = useTranslation()

  const openViewer = (document) => setViewer({
    open: true,
    src: document.file,
    title: t(`documents.${document.titleKey}`),
  })
  const closeViewer = () => setViewer({ open: false, src: null, title: '' })

  const download = (file, name) => {
    const anchor = window.document.createElement('a')
    anchor.href = file
    anchor.download = name || 'document.pdf'
    window.document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
  }

  return (
    <div className="docs-wrap">
      <div className="documents-container">
        <Title level={1} className="docs-title">{t('documents.title')}</Title>

        <Card className="documents-card">
          <List
            itemLayout="horizontal"
            dataSource={DOCUMENTS}
            renderItem={(document) => (
              <List.Item
                actions={[
                  <Button key="view" icon={<EyeOutlined />} onClick={() => openViewer(document)}>
                    {t('common.view')}
                  </Button>,
                  <Button key="download" icon={<DownloadOutlined />} onClick={() => download(document.file, `${document.id}.pdf`)}>
                    {t('common.download')}
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<div className="pdf-avatar"><FilePdfOutlined /></div>}
                  title={(
                    <Space direction="horizontal" wrap size={8}>
                      <span className="doc-title">{t(`documents.${document.titleKey}`)}</span>
                      <Space size={6} wrap>
                        <Tag>{document.language}</Tag>
                        <Tag>{t(`documents.${document.tagKey}`)}</Tag>
                      </Space>
                    </Space>
                  )}
                  description={(
                    <div className="doc-desc">
                      <Text type="secondary">{t(`documents.${document.descriptionKey}`)}</Text>
                      <div className="doc-updated">{t('common.updated')}: {document.updatedAt}</div>
                    </div>
                  )}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>

      <PdfViewerModal open={viewer.open} onClose={closeViewer} src={viewer.src} title={viewer.title} />
    </div>
  )
}
