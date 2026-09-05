// src/pages/Home.jsx
import { Button, Typography } from "antd";
import { Link } from "react-router-dom";
import backgroundVideo from "/assets/home.mp4";
import { Trans, useTranslation } from "react-i18next";
import "./home.css";

export default function Home() {
  const { t } = useTranslation();

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
          <video autoPlay loop muted playsInline id="background-video">
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          <div className="content">
            <Typography.Title level={1} style={{ marginTop: 0, color: "#fff" }}>
              {t("home.title")}
            </Typography.Title>
            <Typography.Paragraph style={{ fontSize: 18, color: "#fff", fontWeight: 100 }}>
              <Trans i18nKey="home.text_2" />
            </Typography.Paragraph>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Button type="primary" size="large">
                <Link to="/contacts">{t("trial")}</Link>
              </Button>
              <Button size="large">
                <Link to="/schedule">{t("schedule_btn")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
