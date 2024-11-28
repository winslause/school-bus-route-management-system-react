// mockData.ts
import { Route, Stop, Bus, Driver } from '../types';

export const SCHOOL_LOCATION: [number, number] = [-1.22419, 36.9176];

export const MOCK_DRIVERS: Driver[] = [
  {
    id: '1',
    name: 'John Doe',
    phone: '+254 123 456 789',
    license: 'DL123456',
    status: 'available'
  },
  {
    id: '2',
    name: 'Jane Smith',
    phone: '+254 987 654 321',
    license: 'DL789012',
    status: 'available'
  },
  {
    id: '3',
    name: 'Wenslause',
    phone: '+254 710 487 582',
    license: 'DL345678',
    status: 'available'
  },
  {
    id: '4',
    name: 'Mary Johnson',
    phone: '+254 700 123 456',
    license: 'DL567890',
    status: 'available'
  },
  {
    id: '5',
    name: 'James Muriuki',
    phone: '+254 722 987 654',
    license: 'DL901234',
    status: 'available'
  },
  {
    id: '6',
    name: 'Grace Njiru',
    phone: '+254 735 456 789',
    license: 'DL112233',
    status: 'available'
  }
];

export const MOCK_STOPS_ROUTE1: Stop[] = [
  { id: '1', name: 'New Paleah Wholesalers Ltd', coordinates: [-1.17793, 36.98324], estimatedTime: '09:10 AM', order: 1 },
  { id: '2', name: 'MASTER BROWN INTERNATIONAL INSTITUTE', coordinates: [-1.19513, 36.95832], estimatedTime: '09:15 AM', order: 2 },
  { id: '3', name: 'Kahawa Sukari Baptist Church', coordinates: [-1.19392, 36.93817], estimatedTime: '09:20 AM', order: 3 },
  { id: '4', name: 'Ceptacore Systems Limited', coordinates: [-1.18888, 36.93147], estimatedTime: '09:25 AM', order: 4 },
  { id: '5', name: 'Springfield Park', coordinates: [-1.16824, 36.98919], estimatedTime: '09:30 AM', order: 5 },
  { id: '6', name: 'Ruda Education Center', coordinates: [-1.19170, 36.92872], estimatedTime: '09:35 AM', order: 6 },
  { id: '7', name: 'Shell - Kihunguro', coordinates: [-1.16029, 36.95833], estimatedTime: '09:40 AM', order: 7 },
  { id: '8', name: 'Kijana Msafi Caterers', coordinates: [-1.19437, 36.94573], estimatedTime: '09:45 AM', order: 8 },
  { id: '9', name: 'Sara kwa booster', coordinates: [-1.20193, 36.94054], estimatedTime: '09:50 AM', order: 9 },
  { id: '10', name: 'Horeb Ministries Githurai 45', coordinates: [-1.20513, 36.93097], estimatedTime: '09:55 AM', order: 10 }
];

export const MOCK_STOPS_ROUTE2: Stop[] = [
  { id: '1', name: 'Kevis Beauty Salon and Barbershop', coordinates: [-1.218972, 36.923028], estimatedTime: '09:15 AM', order: 1 },
  { id: '2', name: 'Jeremy Entertainments', coordinates: [-1.219500, 36.924278], estimatedTime: '09:20 AM', order: 2 },
  { id: '3', name: 'Carlcare Service Ltd', coordinates: [-1.220944, 36.923417], estimatedTime: '09:25 AM', order: 3 },
  { id: '4', name: 'Riverbank Hotel', coordinates: [-1.219889, 36.926028], estimatedTime: '09:30 AM', order: 4 },
  { id: '5', name: 'Gigiri Towers Apartment', coordinates: [-1.221333, 36.924250], estimatedTime: '09:35 AM', order: 5 },
  { id: '6', name: 'Wema Flats', coordinates: [-1.223694, 36.922750], estimatedTime: '09:40 AM', order: 6 },
  { id: '7', name: 'Dove Apartments', coordinates: [-1.222750, 36.924944], estimatedTime: '09:45 AM', order: 7 },
  { id: '8', name: 'Zion Temple Kasarani', coordinates: [-1.221111, 36.927861], estimatedTime: '09:50 AM', order: 8 },
  { id: '9', name: 'Kibukahs Apartments', coordinates: [-1.221417, 36.926611], estimatedTime: '09:55 AM', order: 9 }
];

export const MOCK_STOPS_ROUTE3: Stop[] = [
  { id: '1', name: 'Transline Galaxy - Kasarani', coordinates: [-1.226500, 36.916972], estimatedTime: '09:10 AM', order: 1 },
  { id: '2', name: 'PCEA Ciiko Church', coordinates: [-1.225611, 36.919361], estimatedTime: '09:15 AM', order: 2 },
  { id: '3', name: 'Kasarani Hunters Genesis 2nd Street', coordinates: [-1.227083, 36.918667], estimatedTime: '09:20 AM', order: 3 },
  { id: '4', name: 'Santon Chemist', coordinates: [-1.227417, 36.922139], estimatedTime: '09:25 AM', order: 4 },
  { id: '5', name: 'ACK Good Samaritan Church Ciiko', coordinates: [-1.225611, 36.923278], estimatedTime: '09:30 AM', order: 5 },
  { id: '6', name: 'Mwiki Road Hospital & Pharmacy', coordinates: [-1.229556, 36.921722], estimatedTime: '09:35 AM', order: 6 },
  { id: '7', name: 'Anesmar Flats', coordinates: [-1.229361, 36.924444], estimatedTime: '09:40 AM', order: 7 },
  { id: '8', name: 'Claycity Business Center - Kasarani', coordinates: [-1.227611, 36.926389], estimatedTime: '09:45 AM', order: 8 },
  { id: '9', name: 'Rware Flats', coordinates: [-1.227944, 36.924611], estimatedTime: '09:50 AM', order: 9 },
  { id: '10', name: 'Vibramatt Supermarket', coordinates: [-1.229361, 36.927194], estimatedTime: '09:55 AM', order: 10 },
  { id: '11', name: 'LPG Gas Authorized Dealer', coordinates: [-1.225778, 36.929000], estimatedTime: '10:00 AM', order: 11 },
  { id: '12', name: '13th Street - Deliverance Road', coordinates: [-1.226167, 36.932833], estimatedTime: '10:05 AM', order: 12 },
  { id: '13', name: 'Deliverance Church Kasarani Mwiki', coordinates: [-1.233028, 36.930306], estimatedTime: '10:10 AM', order: 13 }
];

export const MOCK_BUSES: Bus[] = [
  {
    id: '1',
    number: 'BUS-001',
    driver: MOCK_DRIVERS[0],
    capacity: 30,
    currentLocation: [-1.2771, 36.7965],
    status: 'active',
  },
  {
    id: '2',
    number: 'BUS-002',
    driver: MOCK_DRIVERS[1],
    capacity: 30,
    currentLocation: [-1.2456, 36.8868],
    status: 'active',
  },
  {
    id: '3',
    number: 'BUS-003',
    driver: MOCK_DRIVERS[2],
    capacity: 35,
    currentLocation: [-1.3000, 36.8000],
    status: 'active',
  },
  {
    id: '4',
    number: 'BUS-004',
    driver: MOCK_DRIVERS[3],
    capacity: 40,
    currentLocation: [-1.2100, 36.8300],
    status: 'active',
  },
  {
    id: '5',
    number: 'BUS-005',
    driver: MOCK_DRIVERS[4],
    capacity: 25,
    currentLocation: [-1.2200, 36.8500],
    status: 'inactive',
  }
];

export const MOCK_ROUTES: Route[] = [
  {
    id: '1',
    name: 'Route 1',
    bus: MOCK_BUSES[0],
    stops: MOCK_STOPS_ROUTE1,
    isReturn: false,
    status: 'active',
    schedule: {
      departureTime: '08:00',
      estimatedArrival: '09:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday')[]
    }
  },
  {
    id: '2',
    name: 'Route 2',
    bus: MOCK_BUSES[1],
    stops: MOCK_STOPS_ROUTE2,
    isReturn: false,
    status: 'active',
    schedule: {
      departureTime: '08:00',
      estimatedArrival: '09:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday')[]
    }
  },
  {
    id: '3',
    name: 'Route 3',
    bus: MOCK_BUSES[2],
    stops: MOCK_STOPS_ROUTE3,
    isReturn: true,
    status: 'active',
    schedule: {
      departureTime: '08:00',
      estimatedArrival: '10:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday')[]
    }
  }
];
