// components/DashboardLayout.tsx
'use client'

import { useState } from 'react';
import SignOut from '../components/sign-out';
import DashboardPage from '../components/dashboard';
import AnalyticsPage from '../components/analytics';
import SettingsPage from '../components/settings';
import Domains from '../components/domains';



type PageProps = {
  userName: string;
}

export default function DashboardLayout({ userName }: PageProps) {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'AddDomain':
        return <Domains/>; 
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="text-black p-4 border-b">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">BuizBot</h1>
          <div className="flex items-center space-x-4">
            <p>{userName}</p>
            <SignOut/>
          </div>
        </div>
      </header>

      <div className="flex flex-grow">
        <aside className="w-64 bg-gray-100 p-4 border-r">
          <nav>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setCurrentPage('dashboard')}
                  className={`block w-full text-left py-2 px-4 rounded ${currentPage === 'dashboard' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('analytics')}
                  className={`block w-full text-left py-2 px-4 rounded ${currentPage === 'analytics' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                >
                  Analytics
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('settings')}
                  className={`block w-full text-left py-2 px-4 rounded ${currentPage === 'settings' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                >
                  Settings
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('AddDomain')}
                  className={`block w-full text-left py-2 px-4 rounded ${currentPage === 'settings' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                >
                  Domains
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex-grow p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}





