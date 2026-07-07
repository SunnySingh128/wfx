import React from 'react';
import { useLocation } from 'react-router-dom';
import { IoNotificationsOutline, IoSearchOutline, IoPersonCircleOutline } from 'react-icons/io5';

const PAGE_TITLES = {
  '/':             { title: 'Dashboard',      subtitle: 'Your business at a glance' },
  '/query':        { title: 'AI Query',       subtitle: 'Ask questions in plain English' },
  '/search':       { title: 'Product Search', subtitle: 'Intelligent multi-filter search' },
  '/image-search': { title: 'Image Search',   subtitle: 'Find visually similar garments' },
  '/explorer':     { title: 'Goods Explorer', subtitle: 'Browse your finished goods inventory' },
};

function Navbar() {
  const { pathname } = useLocation();
  const meta = PAGE_TITLES[pathname] || { title: 'WFX ERP', subtitle: '' };

  return (
    <header className="wfx-navbar" role="banner">
      <div className="navbar-left">
        <h1 className="navbar-title">{meta.title}</h1>
        {meta.subtitle && <p className="navbar-subtitle">{meta.subtitle}</p>}
      </div>

      <div className="navbar-right">
        <div className="navbar-search-hint" aria-label="Global search hint">
          <IoSearchOutline />
          <span>Search anything…</span>
          <kbd>⌘K</kbd>
        </div>

        <button className="navbar-icon-btn" aria-label="Notifications">
          <IoNotificationsOutline />
          <span className="navbar-notif-dot" aria-hidden="true" />
        </button>

        <button className="navbar-avatar" aria-label="User account">
          <IoPersonCircleOutline />
          <span className="navbar-avatar-label">Sunny Singh</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
