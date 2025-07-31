import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      {/* Sidebar */}
      <div
        className={`fixed top-0 z-40 md:sticky transition-transform duration-300 bg-gray-100 border-r border-gray-300 w-3/4 md:w-64 h-full ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <Sidebar
        setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Overlay when sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col bg-white overflow-auto">
        {/* Mobile Header with Menu Toggle */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <MenuOutlined className="text-xl" />
          </button>
        </div>

        {/* Actual Header */}
        <Header />

        {/* Page Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
