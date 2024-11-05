import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PawPrint, LogOut, Settings, Gift, BookHeart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <PawPrint className="h-8 w-8 text-purple-600" />
              <span className="text-xl font-bold text-gray-900">PuppyPack</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <div className="flex items-center space-x-1">
                    <BookHeart className="h-4 w-4" />
                    <span>Dashboard</span>
                  </div>
                </Link>
                <Link
                  to="/recommendations"
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <div className="flex items-center space-x-1">
                    <Gift className="h-4 w-4" />
                    <span>Recommendations</span>
                  </div>
                </Link>
                <Link
                  to="/settings"
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <div className="flex items-center space-x-1">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/pricing"
                  className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;