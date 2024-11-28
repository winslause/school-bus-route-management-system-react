import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Map } from './components/Map';
import { RouteInfo } from './components/RouteInfo';
import { MOCK_ROUTES } from './data/mockData';
import type { UserRole } from './types';

// Admin Components
import { BusManagement } from './components/admin/BusManagement';
import { StudentManagement } from './components/admin/StudentManagement';
import { RouteManagement } from './components/admin/RouteManagement';
import { Notifications } from './components/admin/Notifications';
import { Settings } from './components/admin/Settings';

// Driver Components
import { DriverRoute } from './components/driver/DriverRoute';
import { DriverStudents } from './components/driver/DriverStudents.tsx';
import { DriverNotifications } from './components/driver/DriverNotifications';

// Parent Components (to be implemented)
// import { ParentTracker } from './components/parent/ParentTracker';
// import { ParentRouteInfo } from './components/parent/ParentRouteInfo';
// import { ParentNotifications } from './components/parent/ParentNotifications';

function App() {
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [activeMenu, setActiveMenu] = useState('overview');

  const renderAdminContent = () => {
    switch (activeMenu) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Map routes={MOCK_ROUTES} />
            </div>
            <div className="space-y-6">
              {MOCK_ROUTES.map(route => (
                <RouteInfo key={route.id} route={route} />
              ))}
            </div>
          </div>
        );
      case 'buses':
        return <BusManagement />;
      case 'students':
        return <StudentManagement />;
      case 'routes':
        return <RouteManagement />;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };

  const renderDriverContent = () => {
    switch (activeMenu) {
      case 'my-route':
        return <DriverRoute />;
      case 'students':
        return <DriverStudents />;
      case 'notifications':
        return <DriverNotifications />;
      default:
        return <DriverRoute />;
    }
  };

  const renderParentContent = () => {
    switch (activeMenu) {
      case 'track':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Map routes={[MOCK_ROUTES[0]]} />
            </div>
            <RouteInfo route={MOCK_ROUTES[0]} />
          </div>
        );
      case 'route-info':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Route Information</h2>
            {/* To be implemented: <ParentRouteInfo /> */}
          </div>
        );
      case 'notifications':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Notifications</h2>
            {/* To be implemented: <ParentNotifications /> */}
          </div>
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (userRole) {
      case 'admin':
        return renderAdminContent();
      case 'driver':
        return renderDriverContent();
      case 'parent':
        return renderParentContent();
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        userRole={userRole} 
        onMenuSelect={setActiveMenu}
        activeMenu={activeMenu}
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          userRole={userRole} 
          onRoleChange={setUserRole}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;