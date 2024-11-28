// types.ts
export interface Stop {
  id: string;
  name: string;
  coordinates: [number, number];
  students: Student[];
  estimatedTime?: string;
  order: number; // Added to manage stop sequence
  arrivalTime?: string;
  departureTime?: string;
}

export interface Route {
  id: string;
  name: string;
  bus: Bus | null; // Can be null if no bus is assigned
  stops: Stop[];
  isReturn: boolean;
  status: 'active' | 'inactive' | 'completed';
  schedule: {
    departureTime: string;
    estimatedArrival: string;
    days: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday')[];
  };
}

export interface Bus {
  id: string;
  number: string;
  driver: Driver | null; // Can be null if no driver assigned
  capacity: number;
  currentLocation?: [number, number];
  status: 'active' | 'inactive' | 'maintenance';
  lastMaintenance?: string;
  currentRoute?: string; // ID of current route
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  stop: Stop;
  parent: Parent;
  photo?: string;
  routeId: string;
  attendance: {
    date: string;
    present: boolean;
  }[];
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  license: string;
  status: 'available' | 'on_route' | 'off_duty';
  assignedBus?: string; // ID of assigned bus
  currentRoute?: string; // ID of current route
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  students: Student[];
}

export type UserRole = 'admin' | 'driver' | 'parent';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone?: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  routeId?: string;
  busId?: string;
  recipientIds: string[]; // User IDs
}