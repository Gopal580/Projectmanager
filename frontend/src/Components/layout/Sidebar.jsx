import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaTachometerAlt, FaPlus, FaPaperPlane, FaCheckCircle, FaFileInvoice, FaUserCircle, FaSignOutAlt 
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { XIcon } from 'lucide-react'; // optional: close icon

const Sidebar = ({setSidebarOpen }) => {
  const links = [
    { label: 'Dashboard', icon: <FaTachometerAlt />, to: '/dashboard' },
    { label: 'New Projects', icon: <FaPlus />, to: '/projects/new-project' },
    { label: 'Sent to CEO', icon: <FaPaperPlane />, to: '/projects/sent-to-ceo' },
    { label: 'Approved by Client', icon: <FaCheckCircle />, to: '/projects/approved-by-client' },
    { label: 'Invoice Raised', icon: <FaFileInvoice />, to: '/projects/invoice-raised' },
  ];

  const { logout, user } = useAuth();
function onClose() {
    setSidebarOpen(false);
  }
  return (
    <div className={`fixed sm:static inset-0 z-40 sm:z-auto bg-white border-r transition-transform duration-300 transform  sm:translate-x-0 `}>
      <div className="flex flex-col justify-between h-full overflow-y-auto sm:overflow-y-visible  px-4 py-6">
        {/* Close icon (mobile only) */}
        <div className="flex justify-end">
          <button onClick={onClose}>
            <XIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-purple-600 flex items-center gap-2 mb-8">
            <FaFileInvoice className="text-purple-600" />
            ML Projects
          </h2>

          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition ${
                    isActive
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center gap-3 mb-3">
            <FaUserCircle className="text-purple-600 text-3xl" />
            <div>
              <p className="text-sm font-semibold">{user?.userName}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition">
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
