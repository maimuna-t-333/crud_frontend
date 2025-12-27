import { useState } from 'react';
import axios from 'axios';
import { UserPlus, Mail, User, Calendar } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000';

const UserForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    age: '' 
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (formData.age && (formData.age < 0 || formData.age > 150)) {
      newErrors.age = 'Please enter a valid age';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/users`, formData);
      onAdd();
      setFormData({ name: '', email: '', age: '' });
      setErrors({});
      alert('User added successfully!');
    } catch (err) {
      console.error('Add user error:', err);
      if (err.response?.data?.error === 'Email already exists') {
        setErrors(prev => ({ ...prev, email: 'Email already exists' }));
      } else if (err.response?.data?.errors) {
        const serverErrors = {};
        err.response.data.errors.forEach(error => {
          if (error.includes('Name')) serverErrors.name = error;
          if (error.includes('Email')) serverErrors.email = error;
          if (error.includes('Age')) serverErrors.age = error;
        });
        setErrors(serverErrors);
      } else {
        alert('Failed to add user. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
          <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Add New User</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        {/* Name Field */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Name *
            </div>
          </label>
          <input 
            placeholder="Enter full name" 
            name="name"
            value={formData.name} 
            onChange={handleChange}
            required 
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-lg transition-all focus:outline-none focus:ring-2 ${
              errors.name 
                ? 'border-red-300 focus:ring-red-200 bg-red-50' 
                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
            }`}
          />
          {errors.name && (
            <p className="text-red-600 text-xs sm:text-sm mt-1 flex items-center gap-1">
              <span className="font-medium">⚠</span> {errors.name}
            </p>
          )}
        </div>
        
        {/* Email Field */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Email *
            </div>
          </label>
          <input 
            placeholder="user@example.com" 
            type="email" 
            name="email"
            value={formData.email} 
            onChange={handleChange}
            required 
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-lg transition-all focus:outline-none focus:ring-2 ${
              errors.email 
                ? 'border-red-300 focus:ring-red-200 bg-red-50' 
                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
            }`}
          />
          {errors.email && (
            <p className="text-red-600 text-xs sm:text-sm mt-1 flex items-center gap-1">
              <span className="font-medium">⚠</span> {errors.email}
            </p>
          )}
        </div>
        
        {/* Age Field */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Age
            </div>
          </label>
          <input 
            placeholder="Enter age (optional)" 
            type="number" 
            name="age"
            value={formData.age} 
            onChange={handleChange}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 rounded-lg transition-all focus:outline-none focus:ring-2 ${
              errors.age 
                ? 'border-red-300 focus:ring-red-200 bg-red-50' 
                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
            }`}
          />
          {errors.age && (
            <p className="text-red-600 text-xs sm:text-sm mt-1 flex items-center gap-1">
              <span className="font-medium">⚠</span> {errors.age}
            </p>
          )}
        </div>
        
        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Adding...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
              Add User
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default UserForm;