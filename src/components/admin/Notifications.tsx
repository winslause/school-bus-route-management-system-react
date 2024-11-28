// components/admin/Notifications.tsx
import { useState } from 'react';
import { Bell, AlertTriangle, Info, CheckCircle, X, MessageCircle } from 'lucide-react';
import type { Notification } from '../../types';

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Bus Delay',
    message: 'Bus 001 is running 10 minutes late on Route 1',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
    read: false,
    busId: '001',
    routeId: '1',
    recipientIds: ['admin1']
  },
  {
    id: '2',
    type: 'info',
    title: 'New Student Added',
    message: 'New student John Doe has been assigned to Route 2',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    read: true,
    routeId: '2',
    recipientIds: ['admin1']
  },
  {
    id: '3',
    type: 'error',
    title: 'Maintenance Required',
    message: 'Bus 002 requires immediate maintenance check',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    read: false,
    busId: '002',
    recipientIds: ['admin1']
  }
];

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [showSendNotification, setShowSendNotification] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'info' as 'info' | 'warning' | 'error' | 'success'
  });

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const handleDelete = (notificationId: string) => {
    setNotifications(notifications.filter(notif => notif.id !== notificationId));
  };

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    const notification: Notification = {
      id: Date.now().toString(),
      ...newNotification,
      timestamp: new Date().toISOString(),
      read: false,
      recipientIds: ['all']
    };
    setNotifications([notification, ...notifications]);
    setShowSendNotification(false);
    setNewNotification({
      title: '',
      message: '',
      type: 'info'
    });
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
          <p className="text-sm text-gray-500">
            {notifications.filter(n => !n.read).length} unread notifications
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowSendNotification(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <MessageCircle className="w-4 h-4" />
            Send Notification
          </button>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'unread')}
            className="border rounded-lg px-3 py-2"
          >
            <option value="all">All Notifications</option>
            <option value="unread">Unread Only</option>
          </select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-lg shadow p-4 ${
              !notification.read ? 'border-l-4 border-blue-500' : ''
            }`}
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
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Mark as read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(notification.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Send Notification Modal */}
      {showSendNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Send Notification</h3>
              <button
                onClick={() => setShowSendNotification(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendNotification} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={newNotification.type}
                  onChange={(e) => setNewNotification(prev => ({
                    ...prev,
                    type: e.target.value as Notification['type']
                  }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="info">Information</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                  <option value="success">Success</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={newNotification.title}
                  onChange={(e) => setNewNotification(prev => ({
                    ...prev,
                    title: e.target.value
                  }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  value={newNotification.message}
                  onChange={(e) => setNewNotification(prev => ({
                    ...prev,
                    message: e.target.value
                  }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  rows={3}
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSendNotification(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}