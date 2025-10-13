// src/pages/Home.jsx
import { Button, Card, Typography } from 'antd'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <>
      <section className="section" style={{background:'linear-gradient(180deg,#FFFFFF, var(--bg))'}}>
        <div className="container" style={{display:'grid', gap:24, gridTemplateColumns:'1.2fr .8fr'}}>
          <div>
            <Typography.Title level={1} style={{marginBottom:12}}>
              Dance Point Luboń
            </Typography.Title>
            <Typography.Paragraph style={{fontSize:18, color:'var(--txt-2)'}}>
              Szkoła tańca, miejsce w którym dzieci, młodzież i dorośli mogą doskonalić swoje umiejętności taneczne oraz aktywnie spędzić wolny czas.
            </Typography.Paragraph>
            <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
              <Button type="primary" size="large">
                <Link to="/contacts">Trial lesson</Link>
              </Button>
              <Button size="large">
                <Link to="/schedule">Grafik</Link>
              </Button>
            </div>
          </div>

          <img className="img-cover" src="\assets\main.jpg" alt="Dance" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Typography.Title level={2} style={{marginBottom:16}}>Styles</Typography.Title>
          <div className="grid-3">
            {[
              { title: 'Hip-hop', text: 'ABRACADABRA', tag:'#2D5A5A' },
              { title: 'Contemporary', text: 'ABRACADABRA', tag:'#964B4B' },
              { title: 'Kids', text: 'ABRACADABRA', tag:'#748C46' },
            ].map((c)=>(
              <Card key={c.title} className="card" title={c.title} styles={{body:{minHeight:96}}}>
                <p style={{margin:0}}>{c.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
