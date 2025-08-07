// components/admin/Layout/SlideBar.tsx
import React from 'react';

import { useSession } from 'next-auth/react';

type Section = 'dashboard' | 'shops' |'addnewshops' | 'transactions' | 'settings' | 'support';

interface SideBarProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

const SideBar: React.FC<SideBarProps> = ({ activeSection, setActiveSection }) => {
  const isActive = (section: Section) => activeSection === section;

  
  const { data: session, status } = useSession();
  
  return (
    <aside className="sidebar bg-helixaa-blue text-white fixed top-0 left-0 h-full w-64 shadow-lg z-51">
      <div className="p-6 border-b border-helixaa-green/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-helixaa-green flex items-center justify-center text-helixaa-blue font-bold">
            P
          </div>
          <div>
            <h1 className="font-bold text-xl">PayLater</h1>
            <p className="text-xs text-gray-300">Admin Dashboard</p>
          </div>
        </div>
      </div>
      
      <nav className="py-4">
        <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Main</div>
        
        {/* Dashboard Link */}
        <button
          onClick={() => setActiveSection('dashboard')}
          className={`sidebar-link w-full text-left block py-3 px-6 items-center space-x-3 ${
            isActive('dashboard') 
              ? 'active text-white border-l-4 border-helixaa-green bg-helixaa-green/10' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <i className="fas fa-chart-line"></i>
          <span>Dashboard</span>
        </button>
        
        {/* Transactions Link */}
        <button
          onClick={() => setActiveSection('transactions')}
          className={`sidebar-link w-full text-left block py-3 px-6 items-center space-x-3 ${
            isActive('transactions') 
              ? 'active text-white border-l-4 border-helixaa-green bg-helixaa-green/10' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <i className="fas fa-wallet"></i>
          <span>Transactions</span>
        </button>
        
        {/* Users Link */}
        <button
          onClick={() => setActiveSection('shops')}
          className={`sidebar-link w-full text-left block py-3 px-6 items-center space-x-3 ${
            isActive('shops') 
              ? 'active text-white border-l-4 border-helixaa-green bg-helixaa-green/10' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <i className="fas fa-users"></i>
          <span>Shops</span>
          <span className="bg-helixaa-green text-helixaa-blue text-xs px-2 py-0.5 rounded-full">24</span>
        </button>

        {/* Add New User Link */}
        <button
          onClick={() => setActiveSection('addnewshops')}
          className={`sidebar-link w-full text-left block py-3 px-6 items-center space-x-3 ${
            isActive('addnewshops') 
              ? 'active text-white border-l-4 border-helixaa-green bg-helixaa-green/10' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <i className="fas fa-users"></i>
          <span>Add New Shops</span>
        </button>
        
       {/* Support Link */}
        <button
          onClick={() => setActiveSection('support')}
          className={`sidebar-link w-full text-left block py-3 px-6 items-center space-x-3 ${
            isActive('support') 
              ? 'active text-white border-l-4 border-helixaa-green bg-helixaa-green/10' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <i className="fas fa-question-circle"></i>
          <span>Support</span>
        </button>
        
        <div className="px-4 py-2 mt-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Settings</div>
        
        {/* Settings Link */}
        <button
          onClick={() => setActiveSection('settings')}
          className={`sidebar-link w-full text-left block py-3 px-6 items-center space-x-3 ${
            isActive('settings') 
              ? 'active text-white border-l-4 border-helixaa-green bg-helixaa-green/10' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          <i className="fas fa-cog"></i>
          <span>Settings</span>
        </button>
        
        
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-helixaa-green/20">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-gray-600 flex items-center justify-center">
            <i className="fas fa-user text-sm"></i>
          </div>
          <div>
            <p className="text-sm font-medium">{session.user.name}</p>
            <p className="text-xs text-gray-400">{session.user.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;