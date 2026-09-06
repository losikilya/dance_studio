// src/components/HeaderNav.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Drawer, Menu, Switch } from "antd";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import logoUrl from "/assets/logo2.jpg";
import { useTranslation } from "react-i18next";

export function HeaderNav({ language, onLocaleChange }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
    const { t } = useTranslation();

  const navigateToContacts = () => {
    setOpen(false);
    navigate('/contacts');
  };

  const items = [
  { key: "home", label: <Link to="/">{t('nav.home')}</Link> },
  { key: "/directions", label: <Link to="/directions">{t('nav.classes')}</Link> },
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
        className="header-container"
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
          style={{ height: "inherit" }}
        >
          <img src={logoUrl} alt={t('common.logoAlt')} />
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
          onChange={(checked) => onLocaleChange(checked ? 'pl' : 'en')}
          checked={language === 'pl'}
          checkedChildren="PL"
          unCheckedChildren="EN"
          aria-label={t('common.languageSwitcher')}
          style={{ marginRight: "12px" }}
        />

        <div className="only-desktop">
          <Button type="primary" onClick={navigateToContacts}>
            {t('trial')}
          </Button>
        </div>

        {/* Бургер мобилка */}
        <Button
          className="only-mobile"
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setOpen(true)}
          aria-label={t('common.openMenu')}
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
              onChange={(checked) => onLocaleChange(checked ? 'pl' : 'en')}
              checked={language === 'pl'}
              checkedChildren="PL"
              unCheckedChildren="EN"
              aria-label={t('common.languageSwitcher')}
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
        <Button type="primary" block style={{ marginTop: 16 }} onClick={navigateToContacts}>
          {t('trial')}
        </Button>
      </Drawer>
    </header>
  );
}
