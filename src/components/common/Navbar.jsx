import { useAuth } from '../../contexts/AuthContext.jsx';
import { useTheme } from '../../contexts/ThemeContext.jsx';
import { useAuthActions } from '../../hooks/useAuth.js';
import { Sun, Moon, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const { logout } = useAuthActions();

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Hospital Management System
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Admin Dashboard</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-600" />}
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <User size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {user?.email || 'Admin'}
            </span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
