import React from 'react';
import { AlertTriangle, CheckCircle, Clock, Target, TrendingUp, Activity, FileText, Download } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface PredictionResult {
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  recommendations: string[];
  timestamp: string;
}

interface PredictionResultsProps {
  result: PredictionResult;
  onBack: () => void;
}

const PredictionResults: React.FC<PredictionResultsProps> = ({ result, onBack }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High':
        return 'text-red-600';
      case 'Medium':
        return 'text-yellow-600';
      case 'Low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const riskColor = result.riskLevel === 'High' ? 'red' : result.riskLevel === 'Moderate' ? 'yellow' : 'green';
  const riskBgColor = result.riskLevel === 'High' ? 'bg-red-50' : result.riskLevel === 'Moderate' ? 'bg-yellow-50' : 'bg-green-50';
  const riskTextColor = result.riskLevel === 'High' ? 'text-red-700' : result.riskLevel === 'Moderate' ? 'text-yellow-700' : 'text-green-700';
  const riskBorderColor = result.riskLevel === 'High' ? 'border-red-200' : result.riskLevel === 'Moderate' ? 'border-yellow-200' : 'border-green-200';

  const confidenceData = [
    { name: 'Confidence', value: 100, color: '#E5E7EB' },
    { name: 'Risk', value: result.riskScore, color: riskColor }
  ];

  const featureImportance = [
    { feature: 'Bilirubin', importance: 85, value: 0 },
    { feature: 'Albumin', importance: 78, value: 0 },
    { feature: 'Platelets', importance: 72, value: 0 },
    { feature: 'Copper', importance: 65, value: 0 },
    { feature: 'Alk. Phosphatase', importance: 58, value: 0 },
    { feature: 'SGOT', importance: 52, value: 0 },
    { feature: 'Prothrombin', importance: 45, value: 0 },
  ];

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Prediction Results</h2>
        <p className="text-sm text-gray-500">Generated on {new Date(result.timestamp).toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Risk Score</h3>
          <div className="text-4xl font-bold">{result.riskScore}%</div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Risk Level</h3>
          <div className={`text-4xl font-bold ${getRiskColor(result.riskLevel)}`}>
            {result.riskLevel}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
        <ul className="list-disc pl-5 space-y-2">
          {result.recommendations.map((recommendation, index) => (
            <li key={index} className="text-gray-700">{recommendation}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <button
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Form
        </button>
      </div>
    </div>
  );
};

export default PredictionResults;