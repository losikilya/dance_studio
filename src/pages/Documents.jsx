import { useState } from 'react'
import { Typography, Card, List, Button, Tag, Space } from 'antd'
import { FilePdfOutlined, EyeOutlined, DownloadOutlined } from '@ant-design/icons'
import PdfViewerModal from '../components/PdfViewerModal'
import './documents.css'

// Примеры: положи свои PDF в src/assets/docs и импортируй
// Vite даст URL строку:
import rulesPdf from '../assets/docs/doc1.pdf'
import pricesPdf from '../assets/docs/doc2.pdf'
import rentalPdf from '../assets/docs/doc3.pdf'

const { Title, Text } = Typography

const DOCS = [
  {
    id: 'rules',
    title: 'Studio Rules & Safety',
    file: rulesPdf,
    tags: ['EN', 'Policy'],
    description: 'General studio rules, safety and conduct policy.',
    updatedAt: '2025-09-01',
  },
  {
    id: 'prices',
    title: 'Prices & Passes (2025)',
    file: pricesPdf,
    tags: ['EN', 'Pricing'],
    description: 'Up-to-date price list for passes and drop-ins.',
    updatedAt: '2025-10-01',
  },
  {
    id: 'rental',
    title: 'Hall Rental Terms',
    file: rentalPdf,
    tags: ['EN', 'Rental'],
    description: 'Terms & conditions for private rental and events.',
    updatedAt: '2025-08-20',
  },
]

export default function Documents() {
  const [viewer, setViewer] = useState({ open: false, src: null, title: '' })

  const openViewer = (doc) => setViewer({ open: true, src: doc.file, title: doc.title })
  const closeViewer = () => setViewer({ open: false, src: null, title: '' })

  const download = (file, name) => {
    const a = document.createElement('a')
    a.href = file
    a.download = name || 'document.pdf'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  return (
    <div className="docs-wrap">
      <div className="container">
        <Title level={2} className="docs-title">Documents</Title>

        <Card className="card">
          <List
            itemLayout="horizontal"
            dataSource={DOCS}
            renderItem={(doc) => (
              <List.Item
                actions={[
                  <Button key="view" icon={<EyeOutlined />} onClick={() => openViewer(doc)}>
                    View
                  </Button>,
                  <Button key="download" icon={<DownloadOutlined />} onClick={() => download(doc.file, `${doc.id}.pdf`)}>
                    Download
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <div className="pdf-avatar">
                      <FilePdfOutlined />
                    </div>
                  }
                  title={
                    <Space direction="horizontal" wrap size={8}>
                      <span className="doc-title">{doc.title}</span>
                      <Space size={6} wrap>
                        {doc.tags.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </Space>
                    </Space>
                  }
                  description={
                    <div className="doc-desc">
                      <Text type="secondary">{doc.description}</Text>
                      <div className="doc-updated">Updated: {doc.updatedAt}</div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </div>

      {/* Modal viewer */}
      <PdfViewerModal open={viewer.open} onClose={closeViewer} src={viewer.src} title={viewer.title} />
    </div>
  )
}
