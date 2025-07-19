import React from 'react';
import { Brain, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface Feature {
  bilirubin: number;
  albumin: number;
  platelets: number;
  copper: number;
  alkaline_phosphatase: number;
  sgot: number;
  prothrombin: number;
}

interface PredictionResult {
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  recommendations: string[];
  timestamp: string;
  features: Feature;
  confidence: number;
}

interface ModelExplainabilityProps {
  data: PredictionResult | null;
}

const ModelExplainability: React.FC<ModelExplainabilityProps> = ({ data }) => {
  const featureImportance = [
    { name: 'Bilirubin', importance: 0.25, description: 'A key indicator of liver function, measuring the ability to process waste products.' },
    { name: 'Albumin', importance: 0.20, description: 'Reflects liver\'s protein production capacity and overall function.' },
    { name: 'Platelets', importance: 0.15, description: 'Can indicate portal hypertension and liver damage.' },
    { name: 'Prothrombin Time', importance: 0.15, description: 'Measures blood clotting ability, often impaired in liver disease.' },
    { name: 'SGOT/AST', importance: 0.10, description: 'Enzyme that indicates liver cell damage when elevated.' },
    { name: 'Alkaline Phosphatase', importance: 0.10, description: 'Enzyme that can indicate bile duct problems.' },
    { name: 'Copper', importance: 0.05, description: 'Can accumulate in liver disease, particularly Wilson\'s disease.' }
  ];

  const modelArchitecture = [
    { stage: 'Input Layer', description: 'Processes 7 key biomarkers and patient data' },
    { stage: 'Feature Processing', description: 'Normalizes and scales input values' },
    { stage: 'Risk Assessment', description: 'Evaluates individual risk factors' },
    { stage: 'Pattern Recognition', description: 'Identifies patterns associated with cirrhosis' },
    { stage: 'Confidence Scoring', description: 'Calculates prediction confidence' },
    { stage: 'Output Generation', description: 'Produces final risk score and recommendations' }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Model Insights</h1>
        <p className="text-gray-600">Understanding how our AI makes predictions</p>
      </div>

      {/* Current Prediction Analysis */}
      {data ? (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Current Prediction Analysis</h2>
            <Brain className="h-6 w-6 text-blue-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Risk Score</span>
                {data.riskLevel === 'High' ? (
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                ) : data.riskLevel === 'Medium' ? (
                  <Info className="h-5 w-5 text-yellow-500" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
              <p className="text-2xl font-bold text-gray-900">{data.riskScore}</p>
              <p className="text-sm text-gray-600">out of 100</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Confidence Level</span>
              <p className="text-2xl font-bold text-gray-900">{data.confidence}%</p>
              <p className="text-sm text-gray-600">prediction accuracy</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Key Factors</span>
              <p className="text-sm text-gray-600 mt-2">
                {data.features.bilirubin > 2.0 ? 'High Bilirubin, ' : ''}
                {data.features.albumin < 3.5 ? 'Low Albumin, ' : ''}
                {data.features.platelets < 150 ? 'Low Platelets' : ''}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <Info className="h-5 w-5 text-yellow-500 mr-2" />
            <p className="text-sm text-yellow-700">No current prediction to analyze. Complete a patient assessment to see detailed insights.</p>
          </div>
        </div>
      )}

      {/* Feature Importance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Feature Importance</h2>
          <div className="space-y-4">
            {featureImportance.map((feature, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{feature.name}</span>
                  <span className="text-sm text-gray-600">{(feature.importance * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${feature.importance * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Model Architecture */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Model Architecture</h2>
          <div className="relative">
            {modelArchitecture.map((stage, index) => (
              <div key={index} className="mb-4 relative pl-8">
                <div className="absolute left-0 top-0 mt-1.5">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  {index < modelArchitecture.length - 1 && (
                    <div className="absolute top-4 left-2 w-0.5 h-full -ml-px bg-blue-200"></div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{stage.stage}</h3>
                  <p className="text-xs text-gray-500">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Understanding the Model</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">How It Works</h3>
            <p className="text-sm text-gray-600">
              Our AI model uses a combination of clinical parameters and machine learning algorithms to assess liver cirrhosis risk. 
              It analyzes patterns in blood tests and patient history to generate predictions with high accuracy.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Limitations</h3>
            <ul className="text-sm text-gray-600 list-disc list-inside">
              <li>Predictions are based on available data only</li>
              <li>Should be used as a screening tool, not final diagnosis</li>
              <li>Regular medical consultation is still necessary</li>
              <li>Accuracy may vary based on population demographics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelExplainability;