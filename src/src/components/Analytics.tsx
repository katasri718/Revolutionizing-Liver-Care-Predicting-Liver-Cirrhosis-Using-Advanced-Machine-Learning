import React from 'react';
import { TrendingUp, Users, AlertTriangle, Target, Calendar, BarChart3, BarChart2, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const Analytics: React.FC = () => {
  const monthlyStats = [
    { month: 'Jan', predictions: 185, accuracy: 92.5, highRisk: 18, earlyDetections: 12 },
    { month: 'Feb', predictions: 220, accuracy: 93.1, highRisk: 24, earlyDetections: 16 },
    { month: 'Mar', predictions: 265, accuracy: 94.2, highRisk: 31, earlyDetections: 22 },
    { month: 'Apr', predictions: 198, accuracy: 93.8, highRisk: 19, earlyDetections: 14 },
    { month: 'May', predictions: 284, accuracy: 94.5, highRisk: 38, earlyDetections: 28 },
    { month: 'Jun', predictions: 312, accuracy: 94.8, highRisk: 42, earlyDetections: 31 },
  ];

  const riskDistribution = [
    { name: 'Low Risk', value: 2156, color: '#10B981', percentage: 68 },
    { name: 'Moderate Risk', value: 784, color: '#F59E0B', percentage: 25 },
    { name: 'High Risk', value: 221, color: '#EF4444', percentage: 7 },
  ];

  const ageGroups = [
    { range: '18-30', low: 45, moderate: 12, high: 3 },
    { range: '31-40', low: 89, moderate: 28, high: 8 },
    { range: '41-50', low: 124, moderate: 45, high: 15 },
    { range: '51-60', low: 156, moderate: 89, high: 32 },
    { range: '61-70', low: 98, moderate: 76, high: 28 },
    { range: '70+', low: 67, moderate: 52, high: 24 },
  ];

  const modelPerformance = [
    { metric: 'Accuracy', value: 94.8, target: 90 },
    { metric: 'Sensitivity', value: 92.3, target: 85 },
    { metric: 'Specificity', value: 96.1, target: 90 },
    { metric: 'PPV', value: 89.7, target: 80 },
    { metric: 'NPV', value: 97.2, target: 95 },
  ];

  const kpiCards = [
    { title: 'Total Predictions', value: '3,161', change: '+18%', icon: BarChart3, color: 'blue' },
    { title: 'Model Accuracy', value: '94.8%', change: '+1.2%', icon: Target, color: 'green' },
    { title: 'High Risk Identified', value: '221', change: '+15%', icon: AlertTriangle, color: 'red' },
    { title: 'Early Detections', value: '156', change: '+22%', icon: TrendingUp, color: 'purple' },
  ];

  // Mock data for demonstration
  const mockData = {
    totalAssessments: 150,
    averageRiskScore: 45.2,
    riskDistribution: {
      low: 70,
      medium: 50,
      high: 30
    },
    monthlyTrends: [
      { month: 'Jan', assessments: 12 },
      { month: 'Feb', assessments: 15 },
      { month: 'Mar', assessments: 18 },
      { month: 'Apr', assessments: 22 },
      { month: 'May', assessments: 25 },
      { month: 'Jun', assessments: 28 }
    ]
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">System Performance & Clinical Insights</p>
        </div>
        <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
          <Calendar className="h-5 w-5 text-blue-600" />
          <span className="text-blue-700 font-medium">Last 6 Months</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          const colorClasses = {
            blue: 'bg-blue-500',
            green: 'bg-green-500',
            red: 'bg-red-500',
            purple: 'bg-purple-500'
          };
          
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                  <p className="text-sm text-green-600 mt-1">{kpi.change} vs last period</p>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[kpi.color as keyof typeof colorClasses]}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Predictions Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Prediction Volume</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="predictions" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Model Accuracy Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Accuracy Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[90, 95]} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Line type="monotone" dataKey="accuracy" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percentage }) => `${name}: ${percentage}%`}
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} patients`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Age Group Analysis */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk by Age Group</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageGroups}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="low" stackId="risk" fill="#10B981" name="Low Risk" />
              <Bar dataKey="moderate" stackId="risk" fill="#F59E0B" name="Moderate Risk" />
              <Bar dataKey="high" stackId="risk" fill="#EF4444" name="High Risk" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Model Performance Metrics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {modelPerformance.map((metric, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-600 mb-2">{metric.metric}</p>
              <p className="text-2xl font-bold text-gray-900">{metric.value}%</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    metric.value >= metric.target ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                  style={{ width: `${(metric.value / 100) * 100}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Target: {metric.target}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Early Detection Impact */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Early Detection Impact</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="highRisk" fill="#EF4444" name="High Risk Identified" />
            <Bar dataKey="earlyDetections" fill="#10B981" name="Early Detections" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* System Status */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">System Health Status</h3>
            <p className="text-sm text-gray-600 mt-1">All systems operational • Last updated: {new Date().toLocaleString()}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-700">Model Online</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-700">Database Healthy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-700">API Responsive</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600">Overview of liver cirrhosis predictions and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Total Assessments</h3>
            <Users className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{mockData.totalAssessments}</p>
          <p className="text-sm text-gray-500 mt-2">Across all patients</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Average Risk Score</h3>
            <Activity className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{mockData.averageRiskScore}</p>
          <p className="text-sm text-gray-500 mt-2">Out of 100</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Risk Distribution</h3>
            <BarChart2 className="h-6 w-6 text-blue-500" />
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-600">Low</span>
              </div>
              <p className="text-lg font-semibold">{mockData.riskDistribution.low}</p>
            </div>
            <div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm text-gray-600">Medium</span>
              </div>
              <p className="text-lg font-semibold">{mockData.riskDistribution.medium}</p>
            </div>
            <div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm text-gray-600">High</span>
              </div>
              <p className="text-lg font-semibold">{mockData.riskDistribution.high}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Monthly Trend</h3>
            <TrendingUp className="h-6 w-6 text-blue-500" />
          </div>
          <div className="h-20">
            <div className="flex items-end justify-between h-full">
              {mockData.monthlyTrends.map((data, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-4 bg-blue-500 rounded-t"
                    style={{ 
                      height: `${(data.assessments / Math.max(...mockData.monthlyTrends.map(d => d.assessments))) * 100}%`
                    }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-1">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Risk Factors Analysis</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Bilirubin Levels</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900">70%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Albumin Levels</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900">60%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Platelet Count</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Prothrombin Time</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '55%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900">55%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Patient Demographics</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Age Distribution</h4>
              <div className="grid grid-cols-5 gap-2">
                <div className="text-center">
                  <div className="bg-blue-100 p-2 rounded">
                    <p className="text-xs text-gray-600">20-35</p>
                    <p className="font-medium">15%</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-blue-200 p-2 rounded">
                    <p className="text-xs text-gray-600">36-50</p>
                    <p className="font-medium">25%</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-blue-300 p-2 rounded">
                    <p className="text-xs text-gray-600">51-65</p>
                    <p className="font-medium">35%</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-blue-400 p-2 rounded">
                    <p className="text-xs text-gray-600">66-80</p>
                    <p className="font-medium">20%</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-blue-500 p-2 rounded">
                    <p className="text-xs text-gray-600">80+</p>
                    <p className="font-medium">5%</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Gender Distribution</h4>
              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full border-8 border-blue-500 flex items-center justify-center">
                    <div>
                      <p className="text-lg font-bold">55%</p>
                      <p className="text-xs text-gray-600">Male</p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full border-8 border-pink-500 flex items-center justify-center">
                    <div>
                      <p className="text-lg font-bold">45%</p>
                      <p className="text-xs text-gray-600">Female</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;