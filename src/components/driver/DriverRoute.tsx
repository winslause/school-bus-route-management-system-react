// components/driver/DriverRoute.tsx
import { useState, useEffect } from 'react';
import { Map } from '../Map';
import { Play, Pause, CheckCircle, MapPin } from 'lucide-react';
import type { Route, Stop } from '../../types';
import { MOCK_ROUTES } from '../../data/mockData';

export function DriverRoute() {
  const [currentRoute] = useState<Route>(MOCK_ROUTES[0]); // In real app, this would be the driver's assigned route
  const [isActive, setIsActive] = useState(false);
  const [completedStops, setCompletedStops] = useState<string[]>([]);
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);

  const handleStartRoute = () => {
    setIsActive(!isActive);
    // In a real app, this would start sending location updates
  };

  const handleCompleteStop = (stopId: string) => {
    setCompletedStops([...completedStops, stopId]);
    // In a real app, this would update the backend
  };

  return (
    <div className="space-y-6">
      {/* Status Bar */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{currentRoute.name}</h2>
            <p className="text-sm text-gray-500">
              {currentRoute.stops.length} stops · {completedStops.length} completed
            </p>
          </div>
          <button
            onClick={handleStartRoute}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white
              ${isActive 
                ? 'bg-yellow-500 hover:bg-yellow-600' 
                : 'bg-green-500 hover:bg-green-600'}`}
          >
            {isActive ? (
              <>
                <Pause className="w-4 h-4" />
                Pause Route
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start Route
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Map routes={[currentRoute]} />
        </div>

        {/* Stops List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Route Stops</h3>
          </div>
          <div className="divide-y">
            {currentRoute.stops.map((stop, index) => (
              <div
                key={stop.id}
                className={`p-4 ${selectedStop?.id === stop.id ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div 
                    className="flex items-start gap-3 cursor-pointer"
                    onClick={() => setSelectedStop(
                      selectedStop?.id === stop.id ? null : stop
                    )}
                  >
                    <div className="flex-shrink-0">
                      {completedStops.includes(stop.id) ? (
                        <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{stop.name}</h4>
                      <div className="text-sm text-gray-500 mt-1">
                        {stop.students.length} students
                      </div>
                      {stop.estimatedTime && (
                        <div className="text-sm text-gray-500">
                          ETA: {stop.estimatedTime}
                        </div>
                      )}
                    </div>
                  </div>
                  {!completedStops.includes(stop.id) && (
                    <button
                      onClick={() => handleCompleteStop(stop.id)}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm hover:bg-blue-200"
                    >
                      Complete
                    </button>
                  )}
                </div>

                {/* Stop Details */}
                {selectedStop?.id === stop.id && (
                  <div className="mt-4 ml-11">
                    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500">Students</div>
                          <div className="font-medium">{stop.students.length}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Estimated Time</div>
                          <div className="font-medium">{stop.estimatedTime}</div>
                        </div>
                      </div>
                      {stop.students.length > 0 && (
                        <div>
                          <div className="text-sm text-gray-500 mb-2">Student List</div>
                          <div className="space-y-2">
                            {stop.students.map(student => (
                              <div key={student.id} className="text-sm flex justify-between">
                                <span>{student.name}</span>
                                <span className="text-gray-500">{student.grade}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}