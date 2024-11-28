import { Clock, MapPin } from 'lucide-react';

// Define the structure for Route and Bus (add more fields if necessary)
interface Stop {
  id: number;
  name: string;
  lat: number;
  lon: number;
}

interface Bus {
  number: string;
  driver: {
    name: string;
    phone: string;
  };
}

interface Route {
  id: number;
  isReturn: boolean;
  stops: Stop[];
  bus: Bus;
}

interface RouteInfoProps {
  route: Route;
}

// Dummy data for Route 2 and Route 3
const routes: Route[] = [
  {
    id: 2,
    isReturn: false, // Picking up students
    stops: [
      { id: 1, name: 'Kevis Beauty Salon and Barbershop', lat: -1.218972, lon: 36.923028 },
      { id: 2, name: 'Jeremy Entertainments', lat: -1.219500, lon: 36.924278 },
      { id: 3, name: 'Carlcare Service Ltd', lat: -1.220944, lon: 36.923417 },
      { id: 4, name: 'Riverbank Hotel', lat: -1.219889, lon: 36.926028 },
      { id: 5, name: 'Gigiri Towers Apartment', lat: -1.221333, lon: 36.924250 },
      { id: 6, name: 'Wema Flats', lat: -1.223694, lon: 36.922750 },
      { id: 7, name: 'Dove Apartments', lat: -1.222750, lon: 36.924944 },
      { id: 8, name: 'Zion Temple Kasarani', lat: -1.221111, lon: 36.927861 },
      { id: 9, name: 'Kibukahs Apartments', lat: -1.221417, lon: 36.926611 },
    ],
    bus: {
      number: 'KAJ 1234B',
      driver: {
        name: 'John Doe',
        phone: '+254712345678',
      },
    },
  },
  {
    id: 3,
    isReturn: true, // Returning to school
    stops: [
      { id: 1, name: 'Transline Galaxy - Kasarani', lat: -1.226500, lon: 36.916972 },
      { id: 2, name: 'PCEA Ciiko Church', lat: -1.225611, lon: 36.919361 },
      { id: 3, name: 'Kasarani Hunters Genesis 2nd Street', lat: -1.227083, lon: 36.918667 },
      { id: 4, name: 'Santon Chemist', lat: -1.227417, lon: 36.922139 },
      { id: 5, name: 'ACK Good Samaritan Church Ciiko', lat: -1.225611, lon: 36.923278 },
      { id: 6, name: 'Mwiki Road Hospital & Pharmacy', lat: -1.229556, lon: 36.921722 },
      { id: 7, name: 'Anesmar Flats', lat: -1.229361, lon: 36.924444 },
      { id: 8, name: 'Claycity Business Center - Kasarani', lat: -1.227611, lon: 36.926389 },
      { id: 9, name: 'Rware Flats', lat: -1.227944, lon: 36.924611 },
      { id: 10, name: 'Vibramatt Supermarket', lat: -1.229361, lon: 36.927194 },
      { id: 11, name: 'LPG Gas Authorized Dealer', lat: -1.225778, lon: 36.929000 },
      { id: 12, name: '13th Street - Deliverance Road', lat: -1.226167, lon: 36.932833 },
      { id: 13, name: 'Deliverance Church Kasarani Mwiki', lat: -1.233028, lon: 36.930306 },
    ],
    bus: {
      number: 'KAD 9876F',
      driver: {
        name: 'Jane Smith',
        phone: '+254798765432',
      },
    },
  },
];

export function RouteInfo({ route }: RouteInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Route {route.id} Details</h3>
        <span className={`px-3 py-1 rounded-full text-sm ${
          route.isReturn ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
        }`}>
          {route.isReturn ? 'Returning to School' : 'Picking up Students'}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <span className="text-sm">Estimated journey time: 45 mins</span>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Stops:</p>
          {route.stops.map((stop, index) => (
            <div key={stop.id} className="flex items-start gap-2 ml-2">
              <MapPin className="w-4 h-4 text-blue-500 mt-1" />
              <div>
                <p className="text-sm font-medium">{stop.name}</p>
                <p className="text-xs text-gray-500">ETA: {index * 15 + 10} mins</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium">Bus Information:</p>
          <div className="mt-2 text-sm text-gray-600">
            <p>Bus Number: {route.bus.number}</p>
            <p>Driver: {route.bus.driver.name}</p>
            <p>Contact: {route.bus.driver.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Example usage of RouteInfo component for Route 2 and Route 3
export function App() {
  return (
    <div className="space-y-8">
      <RouteInfo route={routes[0]} /> {/* Route 2 */}
      <RouteInfo route={routes[1]} /> {/* Route 3 */}
    </div>
  );
}
