import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { SCHOOL_LOCATION, MOCK_BUSES, MOCK_STOPS_ROUTE1, MOCK_STOPS_ROUTE4 } from '../data/mockData';
import type { Route } from '../types';

// Color palette for routes and buses
const ROUTE_COLORS = {
  '1': {
    route: '#2563eb', // blue-600
    marker: 'blue'
  },
  '2': {
    route: '#dc2626', // red-600
    marker: 'red'
  },
  '3': {
    route: '#16a34a', // green-600
    marker: 'green'
  },
  '4': {
    route: '#9333ea', // purple-600
    marker: 'violet'
  }
};

// Create colored bus icons using Leaflet's built-in markers
function createBusIcon(routeId: string) {
  const color = ROUTE_COLORS[routeId as keyof typeof ROUTE_COLORS]?.marker || 'blue';
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
}

// School and stop icons
const schoolIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const stopIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom hook for bus movement simulation
function useBusMovement(route: Route, map: L.Map | null) {
  const [busPosition, setBusPosition] = useState(route.bus.currentLocation);
  const routePointsRef = useRef<[number, number][]>([]);
  const currentPointIndexRef = useRef(0);

  useEffect(() => {
    if (!map || !route) return;

    const waypoints = [
      L.latLng(SCHOOL_LOCATION[0], SCHOOL_LOCATION[1]),
      ...route.stops.map(stop => L.latLng(stop.coordinates[0], stop.coordinates[1]))
    ];

    // Get route points for animation
    const routingControl = L.Routing.control({
      waypoints,
      show: false,
      createMarker: () => null,
    }).addTo(map);

    routingControl.on('routesfound', (e) => {
      const coordinates = e.routes[0].coordinates;
      routePointsRef.current = coordinates.map(coord => [coord.lat, coord.lng]);

      // Start movement animation
      const moveBus = () => {
        if (currentPointIndexRef.current < routePointsRef.current.length - 1) {
          currentPointIndexRef.current += 1;
          setBusPosition(routePointsRef.current[currentPointIndexRef.current]);
        } else {
          currentPointIndexRef.current = 0;
        }
      };

      // Move every 2 seconds
      const interval = setInterval(moveBus, 2000);
      return () => clearInterval(interval);
    });

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, route]);

  return busPosition;
}

// Custom component to handle routing visualization
function RoutingMachine({ routes }: { routes: Route[] }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControls = routes.map(route => {
      const waypoints = [
        L.latLng(SCHOOL_LOCATION[0], SCHOOL_LOCATION[1]),
        ...route.stops.map(stop => L.latLng(stop.coordinates[0], stop.coordinates[1]))
      ];

      const routeColor = ROUTE_COLORS[route.id as keyof typeof ROUTE_COLORS]?.route || '#3b82f6';

      try {
        const control = L.Routing.control({
          waypoints,
          show: false,
          fitSelectedRoutes: false,
          addWaypoints: false,
          draggableWaypoints: false,
          createMarker: () => null,
          lineOptions: {
            styles: [{ 
              color: routeColor,
              opacity: 0.8,
              weight: 6 
            }]
          },
          router: L.Routing.osrmv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1',
            profile: 'driving',
            timeout: 30000,
          })
        });

        control.addTo(map);
        control.hide();

        return control;
      } catch (error) {
        console.error('Error creating route:', error);
        return null;
      }
    }).filter(Boolean);

    return () => {
      routingControls.forEach(control => {
        if (control) {
          try {
            map.removeControl(control);
          } catch (error) {
            console.error('Error removing control:', error);
          }
        }
      });
    };
  }, [map, routes]);

  return null;
}

interface MapProps {
  routes: Route[];
}

function MapComponent({ routes }: MapProps) {
  const [map, setMap] = useState<L.Map | null>(null);

  // Track bus positions for each route
  const busPositions = routes.map(route => {
    return useBusMovement(route, map);
  });

  // Calculate bounds to fit all points
  const bounds = L.latLngBounds([SCHOOL_LOCATION]);
  routes.forEach(route => {
    route.stops.forEach(stop => {
      bounds.extend(stop.coordinates);
    });
  });

  return (
    <MapContainer
      ref={setMap}
      bounds={bounds}
      center={SCHOOL_LOCATION}
      zoom={12}
      className="w-full h-[600px] rounded-lg shadow-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <RoutingMachine routes={routes} />

      {/* School Marker */}
      <Marker position={SCHOOL_LOCATION} icon={schoolIcon}>
        <Popup>
          <div className="font-semibold">Mount Laverna </div>
          <div className="text-sm text-gray-600">School</div>
        </Popup>
      </Marker>

      {/* Stop Markers for all routes */}
      {routes.flatMap(route =>
        route.stops.map((stop) => (
          <Marker key={stop.id} position={stop.coordinates} icon={stopIcon}>
            <Popup>
              <div className="font-semibold">{stop.name}</div>
              <div className="text-sm text-gray-600">Bus Stop</div>
              {stop.estimatedTime && (
                <div className="text-xs text-gray-500">ETA: {stop.estimatedTime}</div>
              )}
            </Popup>
          </Marker>
        ))
      )}

      {/* Bus Markers */}
      {routes.map((route, index) => (
        <Marker 
          key={route.bus.id} 
          position={busPositions[index] || route.bus.currentLocation!}
          icon={createBusIcon(route.id)}
        >
          <Popup>
            <div className="font-semibold">Bus {route.bus.number}</div>
            <div className="text-sm text-gray-600">
              Driver: {route.bus.driver.name}
            </div>
            <div className="text-sm text-gray-600">
              Route: {route.name}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export const Map = React.memo(MapComponent);
