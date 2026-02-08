// src/pages/Home.jsx
import { Button, Card, Typography } from 'antd'
import { Link } from 'react-router-dom'
import backgroundVideo from '/assets/home.mp4'
import { useTranslation } from 'react-i18next'
import './home.css'

export default function Home(){
    const { t } = useTranslation();

  return (
    <>
      <section className="section" style={{background:'linear-gradient(180deg,#FFFFFF, var(--bg))', padding: 0, margin: 0}}>
        <div className="container" style={{display:'grid', gap:24, gridTemplateColumns:'1.2fr .8fr', maxWidth: 'none'}}>
          <video autoPlay loop muted playsInline id="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        {/* Fallback for browsers that do not support the video tag */}
        {/* Your browser does not support the video tag. */}
      </video>
          <div className='content'>
            <Typography.Title level={1} style={{marginBottom:12, color: '#fff'}}>
              Dance Point Luboń
            </Typography.Title>
            <Typography.Paragraph style={{fontSize:18, color:'#fff'}}>
              Szkoła tańca, miejsce w którym dzieci, młodzież i dorośli mogą doskonalić swoje umiejętności taneczne oraz aktywnie spędzić wolny czas.
            </Typography.Paragraph>
            <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
              <Button type="primary" size="large">
                <Link to="/contacts">{t('trial')}</Link>
              </Button>
              <Button size="large">
                <Link to="/schedule">Grafik</Link>
              </Button>
            </div>
          </div>

          {/* <img className="img-cover" src="/uploads/main.jpg" alt="Dance" /> */}
        </div>
      </section>
    </>
  )
}
