// components/admin/RouteManagement.tsx
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, MapPin, Clock, ArrowUpDown } from 'lucide-react';
import type { Route, Stop, Bus } from '../../types';
import { MOCK_ROUTES, MOCK_BUSES, SCHOOL_LOCATION } from '../../data/mockData';
import { Map } from '../Map';

interface RouteFormData {
  name: string;
  busId: string;
  isReturn: boolean;
  departureTime: string;
  status: 'active' | 'inactive' | 'completed';
  stops: Stop[];
}

export function RouteManagement() {
  const [routes, setRoutes] = useState<Route[]>(MOCK_ROUTES);
  const [showForm, setShowForm] = useState(false);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);
  const [availableBuses] = useState<Bus[]>(MOCK_BUSES);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  
  const initialFormData: RouteFormData = {
    name: '',
    busId: '',
    isReturn: false,
    departureTime: '07:00',
    status: 'inactive',
    stops: []
  };

  const [formData, setFormData] = useState<RouteFormData>(initialFormData);
  const [newStop, setNewStop] = useState({
    name: '',
    coordinates: SCHOOL_LOCATION,
    estimatedTime: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddStop = () => {
    if (newStop.name && newStop.estimatedTime) {
      const stop: Stop = {
        id: Date.now().toString(),
        name: newStop.name,
        coordinates: newStop.coordinates,
        students: [],
        estimatedTime: newStop.estimatedTime,
        order: formData.stops.length
      };
      
      setFormData(prev => ({
        ...prev,
        stops: [...prev.stops, stop]
      }));
      
      setNewStop({
        name: '',
        coordinates: SCHOOL_LOCATION,
        estimatedTime: ''
      });
    }
  };

  const handleRemoveStop = (stopId: string) => {
    setFormData(prev => ({
      ...prev,
      stops: prev.stops.filter(stop => stop.id !== stopId)
    }));
  };

  const handleMoveStop = (stopId: string, direction: 'up' | 'down') => {
    const currentIndex = formData.stops.findIndex(stop => stop.id === stopId);
    if (
      (direction === 'up' && currentIndex > 0) ||
      (direction === 'down' && currentIndex < formData.stops.length - 1)
    ) {
      const newStops = [...formData.stops];
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      [newStops[currentIndex], newStops[newIndex]] = [newStops[newIndex], newStops[currentIndex]];
      
      setFormData(prev => ({
        ...prev,
        stops: newStops.map((stop, index) => ({ ...stop, order: index }))
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bus = availableBuses.find(b => b.id === formData.busId);
    if (!bus) return;

    const newRoute: Route = {
      id: editingRoute?.id || Date.now().toString(),
      name: formData.name,
      bus,
      stops: formData.stops,
      isReturn: formData.isReturn,
      status: formData.status,
      schedule: {
        departureTime: formData.departureTime,
        estimatedArrival: '08:00', // Calculate based on stops
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      }
    };

    if (editingRoute) {
      setRoutes(routes.map(route => route.id === editingRoute.id ? newRoute : route));
    } else {
      setRoutes([...routes, newRoute]);
    }

    setShowForm(false);
    setEditingRoute(null);
    setFormData(initialFormData);
  };

  const handleDelete = (routeId: string) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      setRoutes(routes.filter(route => route.id !== routeId));
      if (selectedRoute?.id === routeId) {
        setSelectedRoute(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Route Management</h2>
        <button
          onClick={() => {
            setFormData(initialFormData);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Route
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Routes List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-4 space-y-4">
          <h3 className="font-semibold text-lg">Routes</h3>
          <div className="space-y-2">
            {routes.map(route => (
              <button
                key={route.id}
                onClick={() => setSelectedRoute(route)}
                className={`w-full text-left p-3 rounded-lg border transition-colors
                  ${selectedRoute?.id === route.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:bg-gray-50'}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{route.name}</div>
                    <div className="text-sm text-gray-500">
                      Bus: {route.bus.number}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingRoute(route);
                        setFormData({
                          name: route.name,
                          busId: route.bus.id,
                          isReturn: route.isReturn,
                          departureTime: route.schedule.departureTime,
                          status: route.status,
                          stops: route.stops
                        });
                        setShowForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(route.id);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Map and Route Details */}
        <div className="lg:col-span-2 space-y-4">
          {selectedRoute ? (
            <>
              <Map routes={[selectedRoute]} />
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="font-semibold text-lg mb-4">Route Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Route Name</div>
                    <div className="font-medium">{selectedRoute.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Bus Number</div>
                    <div className="font-medium">{selectedRoute.bus.number}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Departure Time</div>
                    <div className="font-medium">{selectedRoute.schedule.departureTime}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Status</div>
                    <div className={`inline-flex px-2 py-1 rounded-full text-sm
                      ${selectedRoute.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'}`}>
                      {selectedRoute.status}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm text-gray-500 mb-2">Stops</div>
                  <div className="space-y-2">
                    {selectedRoute.stops.map((stop, index) => (
                      <div key={stop.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <div className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{stop.name}</div>
                          <div className="text-sm text-gray-500">ETA: {stop.estimatedTime}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
              <p className="text-gray-500">Select a route to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Route Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingRoute ? 'Edit Route' : 'Add New Route'}
              </h3>
              <button 
                onClick={() => {
                  setShowForm(false);
                  setEditingRoute(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Route Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Assign Bus</label>
                  <select
                    name="busId"
                    value={formData.busId}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  >
                    <option value="">Select Bus</option>
                    {availableBuses
                      .filter(bus => bus.status === 'active')
                      .map(bus => (
                        <option key={bus.id} value={bus.id}>
                          {bus.number} ({bus.driver?.name || 'No Driver'})
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Departure Time</label>
                  <input
                    type="time"
                    name="departureTime"
                    value={formData.departureTime}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="isReturn"
                    checked={formData.isReturn}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      isReturn: e.target.checked
                    }))}
                    className="rounded border-gray-300 text-blue-600 shadow-sm"
                  />
                  <span className="ml-2 text-sm text-gray-600">Return Route</span>
                </label>
              </div>

              {/* Stops Management */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-4">Manage Stops</h4>
                
{/* Add New Stop Form */}
<div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Stop Name</label>
                    <input
                      type="text"
                      value={newStop.name}
                      onChange={(e) => setNewStop(prev => ({
                        ...prev,
                        name: e.target.value
                      }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      placeholder="Enter stop name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Estimated Time</label>
                    <input
                      type="time"
                      value={newStop.estimatedTime}
                      onChange={(e) => setNewStop(prev => ({
                        ...prev,
                        estimatedTime: e.target.value
                      }))}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddStop}
                  className="mb-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Add Stop
                </button>

                {/* Stops List */}
                <div className="space-y-2">
                  {formData.stops.map((stop, index) => (
                    <div key={stop.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{stop.name}</div>
                        <div className="text-sm text-gray-500">ETA: {stop.estimatedTime}</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleMoveStop(stop.id, 'up')}
                          disabled={index === 0}
                          className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                        >
                          <ArrowUpDown className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveStop(stop.id)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingRoute(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingRoute ? 'Save Changes' : 'Add Route'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}