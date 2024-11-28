// components/admin/BusManagement.tsx
import { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import type { Bus, Driver } from '../../types';
import { MOCK_BUSES, MOCK_DRIVERS } from '../../data/mockData';

interface BusFormData {
  number: string;
  capacity: number;
  driverId: string | null;
  status: 'active' | 'inactive' | 'maintenance';
}

export function BusManagement() {
  const [buses, setBuses] = useState<Bus[]>(MOCK_BUSES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBus, setEditingBus] = useState<Bus | null>(null);
  const [availableDrivers] = useState<Driver[]>(MOCK_DRIVERS);

  const initialFormData: BusFormData = {
    number: '',
    capacity: 30,
    driverId: null,
    status: 'inactive'
  };

  const [formData, setFormData] = useState<BusFormData>(initialFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const driver = availableDrivers.find(d => d.id === formData.driverId) || null;
    
    const newBus: Bus = {
      id: editingBus?.id || Date.now().toString(),
      number: formData.number,
      capacity: Number(formData.capacity),
      driver: driver,
      status: formData.status,
      currentLocation: [-1.2921, 36.8219], // Default to school location
    };

    if (editingBus) {
      setBuses(buses.map(bus => bus.id === editingBus.id ? newBus : bus));
    } else {
      setBuses([...buses, newBus]);
    }

    setShowAddForm(false);
    setEditingBus(null);
    setFormData(initialFormData);
  };

  const handleEdit = (bus: Bus) => {
    setEditingBus(bus);
    setFormData({
      number: bus.number,
      capacity: bus.capacity,
      driverId: bus.driver?.id || null,
      status: bus.status
    });
    setShowAddForm(true);
  };

  const handleDelete = (busId: string) => {
    if (window.confirm('Are you sure you want to delete this bus?')) {
      setBuses(buses.filter(bus => bus.id !== busId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Bus Management</h2>
        <button
          onClick={() => {
            setFormData(initialFormData);
            setShowAddForm(true);
            setEditingBus(null);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Bus
        </button>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingBus ? 'Edit Bus' : 'Add New Bus'}
              </h3>
              <button 
                onClick={() => {
                  setShowAddForm(false);
                  setEditingBus(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bus Number
                </label>
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Assign Driver
                </label>
                <select
                  name="driverId"
                  value={formData.driverId || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="">No Driver Assigned</option>
                  {availableDrivers.map(driver => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name} - {driver.license}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingBus(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingBus ? 'Save Changes' : 'Add Bus'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bus Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Driver
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Capacity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {buses.map((bus) => (
              <tr key={bus.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {bus.number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {bus.driver?.name || 'No Driver Assigned'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {bus.capacity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${bus.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : bus.status === 'maintenance'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'}`}>
                    {bus.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(bus)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(bus.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}