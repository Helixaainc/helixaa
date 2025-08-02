import React from 'react'

const Header = () => {
  return (
    <header className="header bg-white shadow-sm flex items-center px-6 sticky top-0  z-50">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <button className="mobile-menu-btn hidden mr-4 text-helixaa-blue">
            <i className="fas fa-bars text-xl"></i>
          </button>
          <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
        </div>
        
        <div className="flex items-center space-x-5">
          <div className="relative">
            <button className="text-gray-500 hover:text-helixaa-blue">
              <i className="fas fa-bell text-xl"></i>
            </button>
            <span className="notification-dot w-2 h-2 bg-helixaa-green rounded-full"></span>
          </div>
          
          <div className="relative">
            <button className="text-gray-500 hover:text-helixaa-blue">
              <i className="fas fa-envelope text-xl"></i>
            </button>
            <span className="notification-dot w-2 h-2 bg-helixaa-green rounded-full"></span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-helixaa-green flex items-center justify-center text-helixaa-blue font-medium text-sm">
              AU
            </div>
            <span className="text-gray-700 font-medium hidden md:block">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header