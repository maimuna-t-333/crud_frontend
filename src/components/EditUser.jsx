import { useEffect, useState } from 'react';
import axios from 'axios';
import { X, Save, User, Mail, Calendar } from 'lucide-react';

const BACKEND_URL = 'http://localhost:5000';

const EditUser = ({ user, onClose }) => {
  // Store the edited user data
  const [editedUserData, setEditedUserData] = useState({
    name: '',
    email: '',
    age: ''
  });

  const [isSavingChanges, setIsSavingChanges] = useState(false);

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (user) {
      setEditedUserData({
        name: user.name || '',
        email: user.email || '',
        age: user.age || ''
      });
      setValidationErrors({});
    }
  }, [user]);

  if (!user) return null;

  const handleInputChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setEditedUserData(previousData => ({
      ...previousData,
      [fieldName]: fieldValue
    }));


    if (validationErrors[fieldName]) {
      setValidationErrors(previousErrors => ({
        ...previousErrors,
        [fieldName]: ''
      }));
    }
  };


  const checkIfFormIsValid = () => {
    const errors = {};

    // Check name
    if (!editedUserData.name.trim()) {
      errors.name = 'Name is required';
    } else if (editedUserData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    // Check email
    if (!editedUserData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(editedUserData.email)) {
      errors.email = 'Please enter a valid email';
    }

    // Check age 
    if (editedUserData.age && (editedUserData.age < 0 || editedUserData.age > 150)) {
      errors.age = 'Please enter a valid age';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const saveChanges = async (event) => {
    event.preventDefault();
    if (!checkIfFormIsValid()) {
      return;
    }

    setIsSavingChanges(true);

    try {
      await axios.put(`${BACKEND_URL}/users/${user.id}`, editedUserData);
      onClose(true);
      alert('User updated successfully!');

    } catch (error) {
      console.error('Failed to update user:', error);
      if (error.response?.data?.error === 'Email already exists') {
        setValidationErrors(prev => ({
          ...prev,
          email: 'Email already exists'
        }));
      } else if (error.response?.data?.errors) {
        const backendErrors = {};
        error.response.data.errors.forEach(errorMessage => {
          if (errorMessage.includes('Name')) backendErrors.name = errorMessage;
          if (errorMessage.includes('Email')) backendErrors.email = errorMessage;
          if (errorMessage.includes('Age')) backendErrors.age = errorMessage;
        });
        setValidationErrors(backendErrors);
      } else {
        alert('Update failed. Please try again.');
      }
    } finally {
      setIsSavingChanges(false);
    }
  };
  const cancelEditing = () => {
    onClose(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">

        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Edit User</h3>
          </div>

          {/* Close button */}
          <button
            onClick={cancelEditing}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Close without saving"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Edit Form */}
        <form onSubmit={saveChanges} className="p-6 space-y-5">

          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Name 
              </div>
            </label>
            <input
              name="name"
              value={editedUserData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all focus:outline-none focus:ring-2 ${validationErrors.name
                  ? 'border-red-300 focus:ring-red-200 bg-red-50'
                  : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                }`}
            />
            {validationErrors.name && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <span className="font-medium">⚠</span> {validationErrors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email 
              </div>
            </label>
            <input
              name="email"
              value={editedUserData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all focus:outline-none focus:ring-2 ${validationErrors.email
                  ? 'border-red-300 focus:ring-red-200 bg-red-50'
                  : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                }`}
            />
            {validationErrors.email && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <span className="font-medium">⚠</span> {validationErrors.email}
              </p>
            )}
          </div>

          {/* Age Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Age
              </div>
            </label>
            <input
              name="age"
              type="number"
              value={editedUserData.age}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all focus:outline-none focus:ring-2 ${validationErrors.age
                  ? 'border-red-300 focus:ring-red-200 bg-red-50'
                  : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                }`}
            />
            {validationErrors.age && (
              <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                <span className="font-medium">⚠</span> {validationErrors.age}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {/* Save Button */}
            <button
              type="submit"
              disabled={isSavingChanges}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md ${isSavingChanges
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-300 hover:from-blue-500 hover:to-purple-700 hover:shadow-lg'
                }`}
            >
              {isSavingChanges ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Saving...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" />
                  Save Changes
                </span>
              )}
            </button>

            {/* Cancel Button */}
            <button
              type="button"
              onClick={cancelEditing}
              className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;