import { Bell, Settings } from 'lucide-react';
import type { UserRole } from '../types';

interface HeaderProps {
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function Header({ userRole, onRoleChange }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Route Management</h2>
          <div className="mt-2">
            <select 
              value={userRole}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="text-sm border rounded-md px-2 py-1"
            >
              <option value="admin">Admin View</option>
              <option value="driver">Driver View</option>
              <option value="parent">Parent View</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {userRole === 'admin' ? 'Admin User' : 
                 userRole === 'driver' ? 'John Doe (Driver)' : 
                 'Parent User'}
              </p>
              <p className="text-xs text-gray-500">
                {userRole === 'admin' ? 'admin@anthena.edu' : 
                 userRole === 'driver' ? 'driver@anthena.edu' : 
                 'parent@example.com'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}