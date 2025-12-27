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
    return <div className="text-gray-600">Loading users...</div>;
  }

  if (error) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">User List</h2>
        <div className="text-red-600 mb-4">{error}</div>
        <button 
          onClick={fetchUsers}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      {users.length === 0 ? (
        <p className="text-gray-600">No users found. Add some users to get started.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Age</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{u.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{u.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{u.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{u.age || '-'}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button 
                      onClick={() => openEdit(u)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(u.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <EditUser user={selectedUser} onClose={handleCloseEdit} />
    </div>
  );
};

export default UserList;