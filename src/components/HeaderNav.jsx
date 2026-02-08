// src/components/HeaderNav.jsx
import { Link, useLocation } from "react-router-dom";
import { Button, Drawer, Menu, Switch } from "antd";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import logoUrl from "/assets/logo2.jpg"; // или .png — скорректируй путь/имя

const items = [
  { key: "home", label: <Link to="/">Home</Link> },
  { key: "/classes", label: <Link to="/classes">Styles</Link> },
  { key: "/schedule", label: <Link to="/schedule">Schedule</Link> },
  { key: "/teachers", label: <Link to="/teachers">Teachers</Link> },
  { key: "/prices", label: <Link to="/prices">Prices</Link> },
  { key: "/rent", label: <Link to="/rent">Rent</Link> },
  { key: "/documents", label: <Link to="/documents">Documents</Link> },
  { key: "/contacts", label: <Link to="/contacts">Contacts</Link> },
];

export function HeaderNav({ onLocaleChange }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
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
          aria-label="DANCE POINT — на главную"
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
          onChange={onLocaleChange}
          checkedChildren="PL"
          unCheckedChildren="En"
          defaultChecked
          style={{ marginRight: "12px" }}
        />

        <div className="only-desktop">
          <Button type="primary">
            <Link to="/contacts">Trial lesson</Link>
          </Button>
        </div>

        {/* Бургер мобилка */}
        <Button
          className="only-mobile"
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setOpen(true)}
          aria-label="Открыть меню"
        />
      </div>

      <Drawer
        width="80%"
        open={open}
        onClose={() => setOpen(false)}
        title="Menu"
      >
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          items={items}
          onClick={() => setOpen(false)}
        />
        <Button type="primary" block style={{ marginTop: 16 }}>
          <Link to="/contacts">Trial lesson</Link>
        </Button>
      </Drawer>
    </header>
  );
}
