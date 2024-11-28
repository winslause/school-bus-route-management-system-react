// components/admin/StudentManagement.tsx
import { useState } from 'react';
import { Plus, Edit2, Trash2, X, Search } from 'lucide-react';
import type { Student, Parent, Route, Stop } from '../../types';
import { MOCK_ROUTES } from '../../data/mockData';

interface StudentFormData {
  name: string;
  grade: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  routeId: string;
  stopId: string;
}

export function StudentManagement() {
  const [students, setStudents] = useState<Student[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [routes] = useState<Route[]>(MOCK_ROUTES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<string>('');

  const initialFormData: StudentFormData = {
    name: '',
    grade: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    routeId: '',
    stopId: ''
  };

  const [formData, setFormData] = useState<StudentFormData>(initialFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getStopsForRoute = (routeId: string): Stop[] => {
    const route = routes.find(r => r.id === routeId);
    return route?.stops || [];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const route = routes.find(r => r.id === formData.routeId);
    const stop = route?.stops.find(s => s.id === formData.stopId);
    
    if (!route || !stop) return;

    const parent: Parent = {
      id: editingStudent?.parent.id || Date.now().toString(),
      name: formData.parentName,
      email: formData.parentEmail,
      phone: formData.parentPhone,
      students: []
    };

    const newStudent: Student = {
      id: editingStudent?.id || Date.now().toString(),
      name: formData.name,
      grade: formData.grade,
      parent,
      stop,
      routeId: route.id,
      attendance: []
    };

    if (editingStudent) {
      setStudents(students.map(student => 
        student.id === editingStudent.id ? newStudent : student
      ));
    } else {
      setStudents([...students, newStudent]);
    }

    setShowForm(false);
    setEditingStudent(null);
    setFormData(initialFormData);
  };

  const handleDelete = (studentId: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(student => student.id !== studentId));
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.parent.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRoute = !selectedRoute || student.routeId === selectedRoute;
    return matchesSearch && matchesRoute;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Student Management</h2>
        <button
          onClick={() => {
            setFormData(initialFormData);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Student
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 bg-white p-4 rounded-lg shadow">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search students or parents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <select
          value={selectedRoute}
          onChange={(e) => setSelectedRoute(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">All Routes</option>
          {routes.map(route => (
            <option key={route.id} value={route.id}>
              {route.name}
            </option>
          ))}
        </select>
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingStudent ? 'Edit Student' : 'Add New Student'}
              </h3>
              <button 
                onClick={() => {
                  setShowForm(false);
                  setEditingStudent(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 h-[80vh] overflow-y-auto">
              {/* Student Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Student Name</label>
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
                <label className="block text-sm font-medium text-gray-700">Grade</label>
                <input
                  type="text"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>

              {/* Parent Information */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Parent Information</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Parent Name</label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Parent Email</label>
                    <input
                      type="email"
                      name="parentEmail"
                      value={formData.parentEmail}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Parent Phone</label>
                    <input
                      type="tel"
                      name="parentPhone"
                      value={formData.parentPhone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Route and Stop Assignment */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Route Assignment</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Route</label>
                    <select
                      name="routeId"
                      value={formData.routeId}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      required
                    >
                      <option value="">Select Route</option>
                      {routes.map(route => (
                        <option key={route.id} value={route.id}>
                          {route.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formData.routeId && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Bus Stop</label>
                      <select
                        name="stopId"
                        value={formData.stopId}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                      >
                        <option value="">Select Stop</option>
                        {getStopsForRoute(formData.routeId).map(stop => (
                          <option key={stop.id} value={stop.id}>
                            {stop.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingStudent(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingStudent ? 'Save Changes' : 'Add Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Students List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Route
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stop
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.grade}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>
                    <div>{student.parent.name}</div>
                    <div className="text-xs text-gray-400">{student.parent.phone}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {routes.find(r => r.id === student.routeId)?.name || 'Unknown Route'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {student.stop.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setEditingStudent(student);
                        setFormData({
                          name: student.name,
                          grade: student.grade,
                          parentName: student.parent.name,
                          parentEmail: student.parent.email,
                          parentPhone: student.parent.phone,
                          routeId: student.routeId,
                          stopId: student.stop.id
                        });
                        setShowForm(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(student.id)}
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