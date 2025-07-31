import React from 'react';
import { Link } from 'react-router-dom';

const StatsCard = ({ title, value, icon, linkTo, iconBgColor = 'bg-purple-100', iconColor = 'text-purple-600' }) => {
  return (
    <Link to={linkTo} className="block">
      <div className="flex items-center bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <div className={`p-3 rounded-full mr-4 shrink-0 ${iconBgColor} ${iconColor}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-500 truncate">{title}</p>
          <h1 className="text-xl font-bold">{value}</h1>
        </div>
      </div>
    </Link>
  );
};

export default StatsCard;
