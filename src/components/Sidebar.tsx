// Sidebar.tsx
import { useState } from 'react';
import { Bus, Users, Route, Bell, Settings } from 'lucide-react';
import type { UserRole } from '../types';

interface SidebarProps {
  userRole: UserRole;
  onMenuSelect: (menu: string) => void;
  activeMenu: string;
}

export function Sidebar({ userRole, onMenuSelect, activeMenu }: SidebarProps) {
  const menuItems = {
    admin: [
      { id: 'buses', icon: Bus, label: 'Buses' },
      { id: 'students', icon: Users, label: 'Students' },
      { id: 'routes', icon: Route, label: 'Routes' },
      { id: 'notifications', icon: Bell, label: 'Notifications' },
      { id: 'settings', icon: Settings, label: 'Settings' },
    ],
    driver: [
      { id: 'my-route', icon: Route, label: 'My Route' },
      { id: 'students', icon: Users, label: 'Students' },
      { id: 'notifications', icon: Bell, label: 'Notifications' },
    ],
    parent: [
      { id: 'track', icon: Bus, label: 'Track Bus' },
      { id: 'route-info', icon: Route, label: 'Route Info' },
      { id: 'notifications', icon: Bell, label: 'Notifications' },
    ],
  };

  return (
    <div className="bg-white h-screen w-64 shadow-lg p-4">
      <div className="flex items-center gap-2 mb-8">
        <Bus className="w-8 h-8 text-blue-600" />
        <h1 className="text-xl font-bold text-gray-800">BusTracker</h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems[userRole].map((item) => (
          <button
            key={item.id}
            onClick={() => onMenuSelect(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
              ${activeMenu === item.id 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-700 hover:bg-gray-50'}`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}