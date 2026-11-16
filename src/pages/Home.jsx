// src/pages/Home.jsx
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import backgroundVideo from "/assets/home-loop.webm";
import videoPoster from "/assets/home-poster.webp";
import { Trans, useTranslation } from "react-i18next";
import "./home.css";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    const connection = navigator.connection;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || connection?.saveData || /(^|-)2g|3g/.test(connection?.effectiveType ?? '')) return;

    let idleId;
    let timerId;
    const start = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(() => setLoadVideo(true), { timeout: 2500 });
      } else {
        timerId = window.setTimeout(() => setLoadVideo(true), 250);
      }
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => {
      window.removeEventListener('load', start);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      window.clearTimeout(timerId);
    };
  }, []);

  return (
    <>
      <section
        className="home-section"
        style={{
          background: "linear-gradient(180deg,#FFFFFF, var(--bg))",
          padding: 0,
          margin: 0,
        }}
      >
        <div
          className="home-container video-container"
          style={{
            display: "grid",
            gap: 24,
            gridTemplateColumns: "1.2fr .8fr",
            maxWidth: "none",
            padding: 0,
          }}
        >
          <video autoPlay={loadVideo} loop muted playsInline preload="none" poster={videoPoster} id="background-video" aria-hidden="true">
            {loadVideo && <source src={backgroundVideo} type="video/webm" />}
          </video>
          <div className="content">
            <Typography.Title level={1} style={{ marginTop: 0, color: "#fff" }}>
              {t("home.title")}
            </Typography.Title>
            <Typography.Paragraph style={{ fontSize: 18, color: "#fff", fontWeight: 100 }}>
              <Trans i18nKey="home.text_2" />
            </Typography.Paragraph>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Button type="primary" size="large" onClick={() => navigate('/contacts')}>
                {t("trial")}
              </Button>
              <Button size="large" onClick={() => navigate('/schedule')}>
                {t("schedule_btn")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
