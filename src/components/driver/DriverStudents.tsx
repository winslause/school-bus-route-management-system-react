// components/driver/DriverStudents.tsx
import React from 'react';
import { useState } from 'react';
import { Search, CheckCircle, Phone, MapPin } from 'lucide-react';
import type { Student, Stop } from '../../types';
import { MOCK_ROUTES } from '../../data/mockData';

export function DriverStudents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  // In a real app, this would be the driver's assigned route
  const currentRoute = MOCK_ROUTES[0];
  
  // Get all students from all stops
  const allStudents = currentRoute.stops.flatMap(stop => 
    stop.students.map(student => ({
      ...student,
      stopName: stop.name
    }))
  );

  const filteredStudents = allStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.stopName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Route Students</h2>
          <div className="text-sm text-gray-500">
            Total Students: {allStudents.length}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search students by name, grade, or stop..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-lg shadow">
        <div className="divide-y">
          {filteredStudents.map((student) => (
            <div key={student.id} className="p-4">
              <div 
                className="flex items-start justify-between cursor-pointer"
                onClick={() => setSelectedStudent(
                  selectedStudent?.id === student.id ? null : student
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium">{student.name}</h4>
                    <div className="text-sm text-gray-500">
                      Grade: {student.grade}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {student.stopName}
                    </div>
                  </div>
                </div>
              </div>

              {/* Student Details */}
              {selectedStudent?.id === student.id && (
                <div className="mt-4 ml-14">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium mb-3">Parent Information</h5>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Name:</span>
                        <span>{student.parent.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Phone:</span>
                        <a 
                          href={`tel:${student.parent.phone}`}
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          <Phone className="w-4 h-4" />
                          {student.parent.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Email:</span>
                        <a 
                          href={`mailto:${student.parent.email}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {student.parent.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}