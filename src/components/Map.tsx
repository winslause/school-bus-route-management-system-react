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
    iconUrl: `https://icones.pro/wp-content/uploads/2022/07/symbole-de-bus-jaune.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
}

// School and stop icons
const schoolIcon = new L.Icon({
  iconUrl: 'data:image/png;base64,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', // Replace with an actual school-like icon
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [50, 82], // Increase icon size
  iconAnchor: [25, 82], // Adjust anchor point based on new size
  popupAnchor: [1, -55], // Adjust popup position
  shadowSize: [50, 82] // Increase shadow size to match icon
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
