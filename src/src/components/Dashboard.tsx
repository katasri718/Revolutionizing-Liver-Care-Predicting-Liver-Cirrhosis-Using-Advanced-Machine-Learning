import React from 'react';
import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle, 
  Clock,
  Activity,
  Heart,
  Target
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total Assessments', value: '1,247', change: '+12%', icon: Users, color: 'blue' },
    { label: 'High Risk Patients', value: '89', change: '+5%', icon: AlertTriangle, color: 'red' },
    { label: 'Model Accuracy', value: '94.2%', change: '+2.1%', icon: Target, color: 'green' },
    { label: 'Early Detections', value: '156', change: '+18%', icon: CheckCircle, color: 'emerald' },
  ];

  const riskTrendData = [
    { month: 'Jan', high: 12, moderate: 28, low: 95 },
    { month: 'Feb', high: 15, moderate: 32, low: 88 },
    { month: 'Mar', high: 18, moderate: 35, low: 102 },
    { month: 'Apr', high: 14, moderate: 29, low: 98 },
    { month: 'May', high: 19, moderate: 38, low: 115 },
    { month: 'Jun', high: 16, moderate: 31, low: 109 },
  ];

  const riskDistribution = [
    { name: 'Low Risk', value: 65, color: '#10B981' },
    { name: 'Moderate Risk', value: 25, color: '#F59E0B' },
    { name: 'High Risk', value: 10, color: '#EF4444' },
  ];

  const recentPredictions = [
    { id: 1, patient: 'Patient-001', risk: 'High', score: 87, time: '2 hours ago' },
    { id: 2, patient: 'Patient-002', risk: 'Low', score: 23, time: '4 hours ago' },
    { id: 3, patient: 'Patient-003', risk: 'Moderate', score: 56, time: '6 hours ago' },
    { id: 4, patient: 'Patient-004', risk: 'High', score: 78, time: '8 hours ago' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clinical Dashboard</h1>
          <p className="text-gray-600 mt-1">Liver Cirrhosis Risk Assessment Overview</p>
        </div>
        <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
          <Activity className="h-5 w-5 text-blue-600" />
          <span className="text-blue-700 font-medium">System Active</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-500',
            red: 'bg-red-500',
            green: 'bg-green-500',
            emerald: 'bg-emerald-500'
          };
          
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} vs last month</p>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Trend Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Assessment Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={riskTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="high" stroke="#EF4444" strokeWidth={3} name="High Risk" />
              <Line type="monotone" dataKey="moderate" stroke="#F59E0B" strokeWidth={3} name="Moderate Risk" />
              <Line type="monotone" dataKey="low" stroke="#10B981" strokeWidth={3} name="Low Risk" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Predictions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Predictions</h3>
          <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
        </div>
        <div className="space-y-3">
          {recentPredictions.map((prediction) => (
            <div key={prediction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Heart className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{prediction.patient}</p>
                  <p className="text-sm text-gray-500">{prediction.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Risk Score: {prediction.score}%</p>
                  <p className={`text-sm font-medium ${
                    prediction.risk === 'High' ? 'text-red-600' :
                    prediction.risk === 'Moderate' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {prediction.risk} Risk
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  prediction.risk === 'High' ? 'bg-red-100 text-red-700' :
                  prediction.risk === 'Moderate' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                }`}>
                  {prediction.risk}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;