import React from 'react';
import { NavLink } from 'react-router-dom';
import { CheckSquare, BarChart2 } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <CheckSquare className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-semibold text-gray-800">
              Catalog Content Auditor
            </span>
          </div>
          
          <nav className="flex items-center space-x-4">
            <NavLink 
              to="/error-items" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              Error Items
            </NavLink>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              Dashboard
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;