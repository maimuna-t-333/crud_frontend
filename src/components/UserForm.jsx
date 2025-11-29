// import { useState } from 'react';
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000';

// const UserForm = ({ onAdd }) => {
//   const [formData, setFormData] = useState({ 
//     name: '', 
//     email: '', 
//     age: '' 
//   });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//     } else if (formData.name.trim().length < 2) {
//       newErrors.name = 'Name must be at least 2 characters';
//     }
    
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email';
//     }
    
//     if (formData.age && (formData.age < 0 || formData.age > 150)) {
//       newErrors.age = 'Please enter a valid age';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setLoading(true);
//     try {
//       await axios.post(`${API_BASE_URL}/users`, formData);
//       onAdd();
//       setFormData({ name: '', email: '', age: '' });
//       setErrors({});
//     } catch (err) {
//       console.error('Add user error:', err);
//       if (err.response?.data?.error === 'Email already exists') {
//         setErrors(prev => ({ ...prev, email: 'Email already exists' }));
//       } else if (err.response?.data?.errors) {
//         const serverErrors = {};
//         err.response.data.errors.forEach(error => {
//           if (error.includes('Name')) serverErrors.name = error;
//           if (error.includes('Email')) serverErrors.email = error;
//           if (error.includes('Age')) serverErrors.age = error;
//         });
//         setErrors(serverErrors);
//       } else {
//         alert('Failed to add user. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ marginBottom: '20px', maxWidth: '400px' }}>
//       <h2>Add New User</h2>
      
//       <div style={{ marginBottom: '15px' }}>
//         <label style={{ display: 'block', marginBottom: '5px' }}>
//           Name *
//         </label>
//         <input 
//           placeholder="Name" 
//           name="name"
//           value={formData.name} 
//           onChange={handleChange}
//           required 
//           style={{ 
//             width: '100%', 
//             padding: '8px',
//             border: errors.name ? '1px solid red' : '1px solid #ccc'
//           }}
//         />
//         {errors.name && <span style={{ color: 'red', fontSize: '14px' }}>{errors.name}</span>}
//       </div>
      
//       <div style={{ marginBottom: '15px' }}>
//         <label style={{ display: 'block', marginBottom: '5px' }}>
//           Email *
//         </label>
//         <input 
//           placeholder="Email" 
//           type="email" 
//           name="email"
//           value={formData.email} 
//           onChange={handleChange}
//           required 
//           style={{ 
//             width: '100%', 
//             padding: '8px',
//             border: errors.email ? '1px solid red' : '1px solid #ccc'
//           }}
//         />
//         {errors.email && <span style={{ color: 'red', fontSize: '14px' }}>{errors.email}</span>}
//       </div>
      
//       <div style={{ marginBottom: '15px' }}>
//         <label style={{ display: 'block', marginBottom: '5px' }}>
//           Age
//         </label>
//         <input 
//           placeholder="Age" 
//           type="number" 
//           name="age"
//           value={formData.age} 
//           onChange={handleChange}
//           style={{ 
//             width: '100%', 
//             padding: '8px',
//             border: errors.age ? '1px solid red' : '1px solid #ccc'
//           }}
//         />
//         {errors.age && <span style={{ color: 'red', fontSize: '14px' }}>{errors.age}</span>}
//       </div>
      
//       <button 
//         type="submit" 
//         disabled={loading}
//         style={{ 
//           padding: '10px 20px',
//           backgroundColor: loading ? '#ccc' : '#007bff',
//           color: 'white',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: loading ? 'not-allowed' : 'pointer'
//         }}
//       >
//         {loading ? 'Adding...' : 'Add User'}
//       </button>
//     </form>
//   );
// };


// export default UserForm;

import { useState } from 'react';
import axios from 'axios';

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
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', maxWidth: '400px' }}>
      <h2>Add New User</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Name *
        </label>
        <input 
          placeholder="Name" 
          name="name"
          value={formData.name} 
          onChange={handleChange}
          required 
          style={{ 
            width: '100%', 
            padding: '8px',
            border: errors.name ? '1px solid red' : '1px solid #ccc'
          }}
        />
        {errors.name && <span style={{ color: 'red', fontSize: '14px' }}>{errors.name}</span>}
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Email *
        </label>
        <input 
          placeholder="Email" 
          type="email" 
          name="email"
          value={formData.email} 
          onChange={handleChange}
          required 
          style={{ 
            width: '100%', 
            padding: '8px',
            border: errors.email ? '1px solid red' : '1px solid #ccc'
          }}
        />
        {errors.email && <span style={{ color: 'red', fontSize: '14px' }}>{errors.email}</span>}
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Age
        </label>
        <input 
          placeholder="Age" 
          type="number" 
          name="age"
          value={formData.age} 
          onChange={handleChange}
          style={{ 
            width: '100%', 
            padding: '8px',
            border: errors.age ? '1px solid red' : '1px solid #ccc'
          }}
        />
        {errors.age && <span style={{ color: 'red', fontSize: '14px' }}>{errors.age}</span>}
      </div>
      
      <button 
        type="submit" 
        disabled={loading}
        style={{ 
          padding: '10px 20px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Adding...' : 'Add User'}
      </button>
    </form>
  );
};

export default UserForm;