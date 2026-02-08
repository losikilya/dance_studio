// src/components/HeaderNav.jsx
import { Link, useLocation } from "react-router-dom";
import { Button, Drawer, Menu, Switch } from "antd";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import logoUrl from "/assets/logo2.jpg"; // или .png — скорректируй путь/имя
import { useTranslation } from "react-i18next";

export function HeaderNav({ onLocaleChange }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
    const { t } = useTranslation();

  const items = [
  { key: "home", label: <Link to="/">{t('nav.home')}</Link> },
  { key: "/classes", label: <Link to="/classes">{t('nav.classes')}</Link> },
  { key: "/schedule", label: <Link to="/schedule">{t('nav.schedule')}</Link> },
  { key: "/teachers", label: <Link to="/teachers">{t('nav.teachers')}</Link> },
  { key: "/prices", label: <Link to="/prices">{t("nav.prices")}</Link> },
  { key: "/rent", label: <Link to="/rent">{t('nav.rent')}</Link> },
  { key: "/documents", label: <Link to="/documents">{t('nav.documents')}</Link> },
  { key: "/contacts", label: <Link to="/contacts">{t('nav.contacts')}</Link> },
];

 const selectedKeys = [
    items.find((i) => pathname.startsWith(i.key))?.key || "home",
  ];

  return (
    <header
      style={{ background: "#fff", borderBottom: "1px solid var(--border)" }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {/* ЛОГО */}
        <Link
          to="/"
          aria-label="DANCE POINT"
          className="brand"
          style={{ height: "inherit" }}
        >
          <img src={logoUrl} alt="DANCE POINT" className="brand__img" />
        </Link>

        {/* Меню десктоп */}
        <div className="menu_desktop only-desktop">
          <Menu
            mode="horizontal"
            selectedKeys={selectedKeys}
            items={items}
            disabledOverflow
          />
        </div>

        <Switch
          className="only-desktop"
          onChange={onLocaleChange}
          checkedChildren="PL"
          unCheckedChildren="En"
          defaultChecked
          style={{ marginRight: "12px" }}
        />

        <div className="only-desktop">
          <Button type="primary">
            <Link to="/contacts">{t('trial')}</Link>
          </Button>
        </div>

        {/* Бургер мобилка */}
        <Button
          className="only-mobile"
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setOpen(true)}
          aria-label="Open"
        />
      </div>

      <Drawer
        width="80%"
        open={open}
        onClose={() => setOpen(false)}
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {t('menu')}
            <Switch
              onChange={onLocaleChange}
              checkedChildren="PL"
              unCheckedChildren="En"
              defaultChecked
              style={{ marginRight: "12px" }}
            />
          </div>
        }
      >
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          items={items}
          onClick={() => setOpen(false)}
        />
        <Button type="primary" block style={{ marginTop: 16 }}>
          <Link to="/contacts">{t('trial')}</Link>
        </Button>
      </Drawer>
    </header>
  );
}
