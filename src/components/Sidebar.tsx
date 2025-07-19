import React from 'react';
import { 
  LayoutDashboard, 
  UserPlus, 
  Activity, 
  BarChart3, 
  Brain, 
  Stethoscope,
  Shield,
  HelpCircle
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patient-form', label: 'New Assessment', icon: UserPlus },
    { id: 'results', label: 'Prediction Results', icon: Activity },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'explainability', label: 'Model Insights', icon: Brain },
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">LiverCare AI</h1>
            <p className="text-sm text-gray-500">Cirrhosis Prediction</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
          <Shield className="h-4 w-4 text-green-600" />
          <span className="text-sm text-green-700 font-medium">HIPAA Compliant</span>
        </div>
        <button className="mt-2 w-full flex items-center space-x-2 px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors">
          <HelpCircle className="h-4 w-4" />
          <span className="text-sm">Help & Support</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;