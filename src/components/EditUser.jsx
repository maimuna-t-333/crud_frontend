// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000';

// const EditUser = ({ user, onClose }) => {
//   const [formData, setFormData] = useState({ name: '', email: '', age: '' });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         name: user.name || '',
//         email: user.email || '',
//         age: user.age || ''
//       });
//       setErrors({});
//     }
//   }, [user]);

//   if (!user) return null;

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

//   const handleSave = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }
    
//     setLoading(true);
//     try {
//       await axios.put(`${API_BASE_URL}/users/${user.id}`, formData);
//       onClose(true);
//       alert('User updated successfully!');
//     } catch (err) {
//       console.error('Update error:', err);
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
//         alert('Update failed. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{
//       position: 'fixed', 
//       inset: 0,
//       background: 'rgba(0,0,0,0.5)',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       zIndex: 1000
//     }}>
//       <form onSubmit={handleSave} style={{
//         background: '#fff', 
//         padding: '20px', 
//         borderRadius: '8px', 
//         width: '400px',
//         maxWidth: '90vw'
//       }}>
//         <h3>Edit User</h3>

//         <div style={{ marginBottom: '15px' }}>
//           <label style={{ display: 'block', marginBottom: '5px' }}>Name *</label>
//           <input 
//             name="name" 
//             value={formData.name} 
//             onChange={handleChange}
//             style={{ 
//               width: '100%', 
//               padding: '8px',
//               border: errors.name ? '1px solid red' : '1px solid #ccc'
//             }}
//           />
//           {errors.name && <span style={{ color: 'red', fontSize: '14px' }}>{errors.name}</span>}
//         </div>

//         <div style={{ marginBottom: '15px' }}>
//           <label style={{ display: 'block', marginBottom: '5px' }}>Email *</label>
//           <input 
//             name="email" 
//             value={formData.email} 
//             onChange={handleChange}
//             style={{ 
//               width: '100%', 
//               padding: '8px',
//               border: errors.email ? '1px solid red' : '1px solid #ccc'
//             }}
//           />
//           {errors.email && <span style={{ color: 'red', fontSize: '14px' }}>{errors.email}</span>}
//         </div>

//         <div style={{ marginBottom: '20px' }}>
//           <label style={{ display: 'block', marginBottom: '5px' }}>Age</label>
//           <input 
//             name="age" 
//             type="number"
//             value={formData.age} 
//             onChange={handleChange}
//             style={{ 
//               width: '100%', 
//               padding: '8px',
//               border: errors.age ? '1px solid red' : '1px solid #ccc'
//             }}
//           />
//           {errors.age && <span style={{ color: 'red', fontSize: '14px' }}>{errors.age}</span>}
//         </div>

//         <div>
//           <button 
//             type="submit" 
//             disabled={loading}
//             style={{ 
//               marginRight: '10px',
//               padding: '8px 16px',
//               backgroundColor: loading ? '#ccc' : '#007bff',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: loading ? 'not-allowed' : 'pointer'
//             }}
//           >
//             {loading ? 'Saving...' : 'Save'}
//           </button>
//           <button 
//             type="button" 
//             onClick={() => onClose(false)}
//             style={{ 
//               padding: '8px 16px',
//               backgroundColor: '#6c757d',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer'
//             }}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditUser;


import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const EditUser = ({ user, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', age: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        age: user.age || ''
      });
      setErrors({});
    }
  }, [user]);

  if (!user) return null;

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

  const handleSave = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/users/${user.id}`, formData);
      onClose(true);
      alert('User updated successfully!');
    } catch (err) {
      console.error('Update error:', err);
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
        alert('Update failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', 
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <form onSubmit={handleSave} style={{
        background: '#fff', 
        padding: '20px', 
        borderRadius: '8px', 
        width: '400px',
        maxWidth: '90vw'
      }}>
        <h3>Edit User</h3>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Name *</label>
          <input 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '8px',
              border: errors.name ? '1px solid red' : '1px solid #ccc'
            }}
          />
          {errors.name && <span style={{ color: 'red', fontSize: '14px' }}>{errors.name}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email *</label>
          <input 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '8px',
              border: errors.email ? '1px solid red' : '1px solid #ccc'
            }}
          />
          {errors.email && <span style={{ color: 'red', fontSize: '14px' }}>{errors.email}</span>}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Age</label>
          <input 
            name="age" 
            type="number"
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

        <div>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              marginRight: '10px',
              padding: '8px 16px',
              backgroundColor: loading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button 
            type="button" 
            onClick={() => onClose(false)}
            style={{ 
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;