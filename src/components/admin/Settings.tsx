// components/admin/Settings.tsx
import { useState } from 'react';
import { 
  Bell, 
  Clock, 
  Mail, 
  Shield, 
  MapPin,
  Save,
  Users,
  Building,
  CheckCircle
} from 'lucide-react';

interface SettingsSection {
  id: string;
  title: string;
  icon: any;
  settings: {
    id: string;
    label: string;
    type: 'toggle' | 'input' | 'select' | 'time';
    value: any;
    options?: string[];
    description?: string;
  }[];
}

const defaultSettings: SettingsSection[] = [
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    settings: [
      {
        id: 'email_notifications',
        label: 'Email Notifications',
        type: 'toggle',
        value: true,
        description: 'Receive notifications via email'
      },
      {
        id: 'delay_threshold',
        label: 'Delay Notification Threshold',
        type: 'select',
        value: '10',
        options: ['5', '10', '15', '20', '30'],
        description: 'Minutes of delay before sending notifications'
      }
    ]
  },
  {
    id: 'schedule',
    title: 'Schedule Settings',
    icon: Clock,
    settings: [
      {
        id: 'default_pickup_time',
        label: 'Default Pickup Time',
        type: 'time',
        value: '07:00',
        description: 'Default time for morning pickup'
      },
      {
        id: 'default_return_time',
        label: 'Default Return Time',
        type: 'time',
        value: '14:30',
        description: 'Default time for afternoon return'
      }
    ]
  },
  {
    id: 'school',
    title: 'School Information',
    icon: Building,
    settings: [
      {
        id: 'school_name',
        label: 'School Name',
        type: 'input',
        value: 'Anthena School',
        description: 'Name of the school'
      },
      {
        id: 'school_address',
        label: 'School Address',
        type: 'input',
        value: '123 Education St, Nairobi',
        description: 'Physical address of the school'
      }
    ]
  },
  {
    id: 'security',
    title: 'Security Settings',
    icon: Shield,
    settings: [
      {
        id: 'require_confirmation',
        label: 'Require Parent Confirmation',
        type: 'toggle',
        value: true,
        description: 'Require parents to confirm student pickup/dropoff'
      },
      {
        id: 'location_tracking',
        label: 'Location Tracking Interval',
        type: 'select',
        value: '30',
        options: ['15', '30', '45', '60'],
        description: 'Frequency of bus location updates (seconds)'
      }
    ]
  }
];

export function Settings() {
    const [sections, setSections] = useState<SettingsSection[]>(defaultSettings);
    const [activeSection, setActiveSection] = useState<string>('notifications');
    const [hasChanges, setHasChanges] = useState(false);
    const [showSaved, setShowSaved] = useState(false);
  
    const handleSettingChange = (sectionId: string, settingId: string, value: any) => {
      setSections(sections.map(section => 
        section.id === sectionId
          ? {
              ...section,
              settings: section.settings.map(setting =>
                setting.id === settingId
                  ? { ...setting, value }
                  : setting
              )
            }
          : section
      ));
      setHasChanges(true);
    };
  
    const handleSave = () => {
      // Here you would typically save to your backend
      console.log('Saving settings:', sections);
      setHasChanges(false);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 3000);
    };
  

  const renderSettingInput = (setting: SettingsSection['settings'][0], sectionId: string) => {
    switch (setting.type) {
      case 'toggle':
        return (
          <div className="flex items-center justify-between py-4">
            <div>
              <label className="font-medium text-gray-900">{setting.label}</label>
              {setting.description && (
                <p className="text-sm text-gray-500">{setting.description}</p>
              )}
            </div>
            <button
              onClick={() => handleSettingChange(sectionId, setting.id, !setting.value)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${setting.value ? 'bg-blue-600' : 'bg-gray-200'}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${setting.value ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
          </div>
        );
      case 'select':
        return (
          <div className="py-4">
            <label className="block font-medium text-gray-900">{setting.label}</label>
            {setting.description && (
              <p className="text-sm text-gray-500 mb-2">{setting.description}</p>
            )}
            <select
              value={setting.value}
              onChange={(e) => handleSettingChange(sectionId, setting.id, e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            >
              {setting.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
      case 'time':
        return (
          <div className="py-4">
            <label className="block font-medium text-gray-900">{setting.label}</label>
            {setting.description && (
              <p className="text-sm text-gray-500 mb-2">{setting.description}</p>
            )}
            <input
              type="time"
              value={setting.value}
              onChange={(e) => handleSettingChange(sectionId, setting.id, e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
        );
      default:
        return (
          <div className="py-4">
            <label className="block font-medium text-gray-900">{setting.label}</label>
            {setting.description && (
              <p className="text-sm text-gray-500 mb-2">{setting.description}</p>
            )}
            <input
              type="text"
              value={setting.value}
              onChange={(e) => handleSettingChange(sectionId, setting.id, e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          {hasChanges && (
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          )}
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
            {/* Sidebar */}
            <aside className="py-6 lg:col-span-3">
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`group flex items-center px-3 py-2 text-sm font-medium w-full ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <section.icon className={`mr-3 h-6 w-6 ${
                      activeSection === section.id
                        ? 'text-blue-600'
                        : 'text-gray-400 group-hover:text-gray-500'
                    }`} />
                    {section.title}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Main content */}
            <div className="divide-y divide-gray-200 lg:col-span-9">
              <div className="py-6 px-4 sm:p-6 lg:pb-8">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className={activeSection === section.id ? '' : 'hidden'}
                  >
                    <h2 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                      {section.title}
                    </h2>
                    <div className="space-y-6">
                      {section.settings.map((setting) => (
                        <div key={setting.id}>
                          {renderSettingInput(setting, section.id)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Save Notification */}
        {showSaved && (
          <div className="fixed bottom-4 right-4 bg-green-50 text-green-800 px-4 py-2 rounded-md flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Settings saved successfully
          </div>
        )}
      </div>
    </div>
  );
}