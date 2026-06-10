import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="main-layout">
      <header className="layout-header">
        <h1>Chat Application</h1>
      </header>
      <main className="layout-content">
        <Outlet />
      </main>
      <footer className="layout-footer">
        <p>&copy; 2026 Chat Application. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
