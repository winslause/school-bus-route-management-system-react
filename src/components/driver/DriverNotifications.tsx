// components/driver/DriverNotifications.tsx
import { useState } from 'react';
import { AlertTriangle, Info, CheckCircle, X, MessageCircle, Bell, Play } from 'lucide-react';
import type { Notification } from '../../types';

// Mock notifications specific to driver
const DRIVER_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'info',
    title: 'New Student Added',
    message: 'New student Sarah Jones has been added to your route at Westlands Mall stop',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    read: false,
    routeId: '1',
    recipientIds: ['driver1']
  },
  {
    id: '2',
    type: 'warning',
    title: 'Route Delay Alert',
    message: 'Heavy traffic reported on Ngong Road. Consider alternative route.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    read: true,
    routeId: '1',
    recipientIds: ['driver1']
  },
  {
    id: '3',
    type: 'success',
    title: 'Route Completed',
    message: 'Morning pickup route completed successfully',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    read: true,
    routeId: '1',
    recipientIds: ['driver1']
  }
];

export function DriverNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(DRIVER_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const filteredNotifications = notifications.filter(notif => 
    filter === 'all' || (filter === 'unread' && !notif.read)
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
            {unreadCount > 0 && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {unreadCount} unread
              </span>
            )}
          </div>
          <div className="flex gap-4">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Mark all as read
              </button>
            )}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'unread')}
              className="border rounded-lg px-3 py-1 text-sm"
            >
              <option value="all">All Notifications</option>
              <option value="unread">Unread Only</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p className="text-lg font-medium">No notifications</p>
              <p className="text-sm">We'll notify you when something important happens.</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg border ${
                  !notification.read ? 'border-l-4 border-l-blue-500' : ''
                } p-4 transition-all hover:shadow-md`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    {getIcon(notification.type)}
                    <div>
                      <h3 className="font-medium">{notification.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!notification.read && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-medium mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => {/* Handle route start */}}
            className="p-4 border rounded-lg text-left hover:bg-gray-50"
          >
            <Play className="w-5 h-5 text-green-500 mb-2" />
            <h4 className="font-medium">Start Route</h4>
            <p className="text-sm text-gray-500">Begin your assigned route</p>
          </button>
          <button 
            onClick={() => {/* Handle emergency alert */}}
            className="p-4 border rounded-lg text-left hover:bg-gray-50"
          >
            <AlertTriangle className="w-5 h-5 text-red-500 mb-2" />
            <h4 className="font-medium">Emergency Alert</h4>
            <p className="text-sm text-gray-500">Send emergency notification</p>
          </button>
        </div>
      </div>
    </div>
  );
}