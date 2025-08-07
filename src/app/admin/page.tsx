// app/dashboard/page.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import SlideBar from '../../components/admin/Layout/SideBar';
import Header from '../../components/admin/Layout/Header';
import DashBoard from '../../components/admin/sections/dashboard/DashBoard';
import Users from '../../components/admin/sections/shops/Users';
import Support from '../../components/admin/sections/support/Support';
import AddNewUser from '../../components/admin/sections/addnewshops/AddNewShop';

import { useSession } from 'next-auth/react';



type Section = 'dashboard' | 'shops' | 'addnewshops' | 'transactions' | 'settings' | 'support';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashBoard />;
      case 'shops':
        return <Users />;
      case 'addnewshops':
        return <AddNewUser />;
      case 'transactions':
        return <div>Transactions</div>;
      case 'settings':
        return <div>Settings</div>;
      case 'support':
        return <Support />;
      default:
        return <DashBoard />;
    }
  };

  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "unauthenticated") {
    return <div className="text-center mt-20">You are not authenticated. Please <a href="/login" className="text-blue-500">login</a> to access the dashboard.</div>;
  } else if (status === "authenticated" && session.user.role !== "admin") {
    return <div className="text-center mt-20">You do not have permission to access this page. Please contact your administrator.</div>;
  } else if (status === "authenticated" && session.user.role === "admin") {
    console.log("User Role:", session.user.role);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>
          PayLater Admin Dashboard

        </title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
      </Head>

      <div className="dashboard-grid">
        {/* Pass activeSection and setActiveSection to SlideBar */}
        <SlideBar activeSection={activeSection} setActiveSection={setActiveSection} />

        <Header />

        <main className="main p-6 bg-gray-50">
          {renderSection()}
        </main>
      </div>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
          background-color: #f5f7fa;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .dashboard-grid {
          display: grid;
          grid-template-columns: 240px 1fr;
          grid-template-rows: 70px 1fr;
          grid-template-areas:
            "sidebar header"
            "sidebar main";
          min-height: 100vh;
        }
        
        .sidebar {
          grid-area: sidebar;
        }
        
        .header {
          grid-area: header;
        }
        
        .main {
          grid-area: main;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        
        .sidebar-link.active {
          border-left: 4px solid #C19976;
          background: rgba(193, 153, 118, 0.1);
        }
        
        .sidebar-link:hover {
          background: rgba(193, 153, 118, 0.1);
        }
        
        .notification-dot {
          position: absolute;
          top: 8px;
          right: 8px;
        }
        
        .transaction-row:hover {
          background-color: rgba(8, 44, 56, 0.03);
        }
        
        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
            grid-template-areas:
              "header"
              "main";
          }
          
          .sidebar {
            display: none;
          }
          
          .mobile-menu-btn {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}