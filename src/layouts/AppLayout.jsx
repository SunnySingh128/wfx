import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';

function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="wfx-app-layout">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div className={`wfx-main-content ${collapsed ? 'collapsed' : ''}`}>
        <Navbar />
        <main className="wfx-page-body" id="main-content" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
