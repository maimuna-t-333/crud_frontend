// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000';

// const UserList = ({ refresh }) => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await axios.get(`${API_BASE_URL}/users`);
//       setUsers(res.data);
//     } catch (err) {
//       console.error('Fetch users error:', err);
//       setError('Failed to load users. Please check if backend is running.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { 
//     fetchUsers(); 
//   }, [refresh]);

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this user?')) {
//       return;
//     }

//     try {
//       await axios.delete(`${API_BASE_URL}/users/${id}`);
//       fetchUsers();
//       alert('User deleted successfully!');
//     } catch (err) {
//       console.error('Delete error:', err);
//       alert('Failed to delete user. Please try again.');
//     }
//   };

//   const openEdit = (user) => {
//     alert(`Edit user: ${user.name}\nEmail: ${user.email}\nAge: ${user.age}\n\nEdit feature coming soon!`);
//   };

//   if (loading) {
//     return <div>Loading users...</div>;
//   }

//   if (error) {
//     return (
//       <div>
//         <h2>User List</h2>
//         <div style={{ color: 'red' }}>{error}</div>
//         <button onClick={fetchUsers}>Retry</button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2>User List</h2>
//       {users.length === 0 ? (
//         <p>No users found. Add some users to get started.</p>
//       ) : (
//         <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Age</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map(u => (
//               <tr key={u.id}>
//                 <td>{u.id}</td>
//                 <td>{u.name}</td>
//                 <td>{u.email}</td>
//                 <td>{u.age || '-'}</td>
//                 <td>
//                   <button 
//                     onClick={() => openEdit(u)}
//                     style={{ marginRight: '10px' }}
//                   >
//                     Edit
//                   </button>
//                   <button 
//                     onClick={() => handleDelete(u.id)}
//                     style={{ backgroundColor: '#dc3545', color: 'white' }}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default UserList;

import { useEffect, useState } from 'react';
import axios from 'axios';
import EditUser from './EditUser';

const API_BASE_URL = 'http://localhost:5000';

const UserList = ({ refresh }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE_URL}/users`);
      setUsers(res.data);
    } catch (err) {
      console.error('Fetch users error:', err);
      setError('Failed to load users. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchUsers(); 
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/users/${id}`);
      fetchUsers();
      alert('User deleted successfully!');
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete user. Please try again.');
    }
  };

  const openEdit = (user) => setSelectedUser(user);
  const handleCloseEdit = (didSave) => { 
    setSelectedUser(null); 
    if (didSave) fetchUsers(); 
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return (
      <div>
        <h2>User List</h2>
        <div style={{ color: 'red' }}>{error}</div>
        <button onClick={fetchUsers}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users found. Add some users to get started.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.age || '-'}</td>
                <td>
                  <button 
                    onClick={() => openEdit(u)}
                    style={{ marginRight: '10px' }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(u.id)}
                    style={{ backgroundColor: '#dc3545', color: 'white' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <EditUser user={selectedUser} onClose={handleCloseEdit} />
    </div>
  );
};

export default UserList;