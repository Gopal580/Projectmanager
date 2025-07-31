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
  const { user } = useAuth();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 py-4 px-4 md:px-6 bg-white border-b">
      
      {/* Left: Page Title */}
      <div className='flex flex-row justify-between items-center gap-4'>

      <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
        {title}
      </h1>
       <div className="w-8 h-8 rounded-full  bg-purple-200 text-purple-800 sm:hidden flex items-center justify-center font-semibold">
            {user?.userName.substring(0, 1).toUpperCase()}
          </div>
      </div>

      {/* Right: Controls */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
        {/* New Project Button */}
        <Link
          to="/projects/create"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm w-full sm:w-auto"
        >
          <FaPlus size={12} />
          New Project
        </Link>

        {/* Welcome Text & Avatar */}
        <div className="flex items-center justify-between gap-3 w-full sm:w-auto">
          <p className="text-sm text-gray-600">
            Welcome, <span className="font-medium">{user?.userName.substring(0, 3).toUpperCase()}...</span>
          </p>
          <div className="w-8 h-8 rounded-full bg-purple-200 text-purple-800 hidden sm:flex items-center justify-center font-semibold">
            {user?.userName.substring(0, 1).toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
