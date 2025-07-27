import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';
// import { useState } from 'react';
const Layout = () => {
    // const [isSidebarOpen,setSidebarOpen]=useState(false);
  return (
    <div className="flex min-h-screen w-full bg-red-500 border-e-red-600">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 border-r border-gray-300 ">
        <Sidebar />
      </div>

      {/* Right Content */}
      <div className="flex-1 p-6 bg-white overflow-auto">
      {/* header  */}
       <div>
        <Header/>
       </div>

       {/* main content */}
       <div>
        <Outlet/>
       </div>
      </div>
    </div>
  );
};

export default Layout;
