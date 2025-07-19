import React, { useState } from 'react';
import { User, Calendar, Activity, Beaker, Heart, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface PatientData {
  age: number;
  gender: string;
  bilirubin: number;
  albumin: number;
  platelets: number;
  copper?: number;
  alkaline_phosphatase?: number;
  sgot?: number;
  prothrombin?: number;
  history_of_alcohol: boolean;
  hepatitis: boolean;
  diabetes: boolean;
}

interface PatientFormProps {
  onPredict: (data: PatientData) => Promise<void>;
}

interface FormData {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  bilirubin: string;
  albumin: string;
  platelets: string;
  copper: string;
  alkaline_phosphatase: string;
  sgot: string;
  prothrombin: string;
  history_of_alcohol: boolean;
  hepatitis: boolean;
  diabetes: boolean;
}

const PatientForm: React.FC<PatientFormProps> = ({ onPredict }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    age: '',
    gender: 'male',
    bilirubin: '',
    albumin: '',
    platelets: '',
    copper: '',
    alkaline_phosphatase: '',
    sgot: '',
    prothrombin: '',
    history_of_alcohol: false,
    hepatitis: false,
    diabetes: false
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? 0 : parseFloat(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    // Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Age validation
    if (!formData.age || isNaN(Number(formData.age)) || Number(formData.age) < 0 || Number(formData.age) > 120) {
      newErrors.age = 'Please enter a valid age between 0 and 120';
    }

    // ... other validations ...

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);

    if (isSubmitting) {
      console.log('Already submitting, preventing double submission');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Calling onPredict with data:', formData);
      await onPredict(formData as unknown as PatientData);
      console.log('Prediction completed successfully');
    } catch (error) {
      console.error('Error during prediction:', error);
      alert('Failed to generate prediction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-2";
  const sectionClasses = "bg-white rounded-xl shadow-sm border border-gray-200 p-6";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">New Patient Assessment</h1>
        <p className="text-gray-600 mt-1">Enter patient data for liver cirrhosis risk prediction</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Information Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <div className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.firstName}
                </div>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <div className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.lastName}
                </div>
              )}
            </div>

            {/* Age */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.age ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter age"
              />
              {errors.age && (
                <div className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.age}
                </div>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lab Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Bilirubin (mg/dL) *</label>
            <input
              type="number"
              name="bilirubin"
              value={formData.bilirubin || ''}
              onChange={handleChange}
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Normal: 0.3-1.2 mg/dL"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Albumin (g/dL) *</label>
            <input
              type="number"
              name="albumin"
              value={formData.albumin || ''}
              onChange={handleChange}
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Normal: 3.5-5.0 g/dL"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Platelets (×10³/μL) *</label>
            <input
              type="number"
              name="platelets"
              value={formData.platelets || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Normal: 150-450 ×10³/μL"
              required
            />
          </div>
        </div>

        {/* Additional Lab Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Copper (μg/dL)</label>
            <input
              type="number"
              name="copper"
              value={formData.copper || ''}
              onChange={handleChange}
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Normal: 70-140 μg/dL"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Alkaline Phosphatase (U/L)</label>
            <input
              type="number"
              name="alkaline_phosphatase"
              value={formData.alkaline_phosphatase || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Normal: 44-147 U/L"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">SGOT/AST (U/L)</label>
            <input
              type="number"
              name="sgot"
              value={formData.sgot || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Normal: 10-40 U/L"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Prothrombin Time (seconds)</label>
            <input
              type="number"
              name="prothrombin"
              value={formData.prothrombin || ''}
              onChange={handleChange}
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Normal: 11-13 seconds"
            />
          </div>
        </div>

        {/* Medical History */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="history_of_alcohol"
              checked={formData.history_of_alcohol}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">History of Alcohol Use</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="hepatitis"
              checked={formData.hepatitis}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">Hepatitis</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="diabetes"
              checked={formData.diabetes}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">Diabetes</label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
          >
            {isSubmitting ? 'Generating Prediction...' : 'Generate Prediction'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;