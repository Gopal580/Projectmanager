// Header.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
const getTitleFromPath = (pathname) => {
  if (pathname.includes('invoice-raised')) return 'Projects with Invoice Raised';
  if (pathname.includes('approved')) return 'Projects Approved by Client';
  if (pathname.includes('sent')) return 'Projects Sent to CEO';
  if (pathname.includes('new')) return 'New Projects';
  if (pathname.includes('dashboard')) return 'Dashboard';
  return 'Project Monitoring';
};

const Header = () => {
  const location = useLocation();
  const title = getTitleFromPath(location.pathname);
  // const { user, logout } = useAuth();
  const { user} = useAuth()
  return (
    <div className="flex items-center justify-between py-4 px-6 bg-white border-b">
      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* New Project Button */}
        <Link to={"/projects/create"} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm transition">
          <FaPlus size={12} />
          New Project
        </Link>

        {/* Welcome Text */}
        <p className="text-sm text-gray-600">Welcome, <span className="font-medium">{user?.userName.substring(0,3).toUpperCase()}...</span></p>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center font-semibold">
          {user?.userName.substring(0,1).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default Header;
