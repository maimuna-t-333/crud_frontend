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
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-600">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full">
        <h2 className="text-2xl font-bold mb-4">User List</h2>
        <div className="text-red-600 mb-4">{error}</div>
        <button 
          onClick={fetchUsers}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-fit"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header - Fixed at top */}
      <div className="flex-shrink-0 mb-4">
        <h2 className="text-2xl font-bold">User List</h2>
        <p className="text-sm text-gray-500 mt-1">
          {users.length} {users.length === 1 ? 'user' : 'users'} total
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto lg:pr-2">
        {users.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg font-medium mb-2">No users found</p>
            <p className="text-gray-500">Add some users to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-300">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">ID</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Age</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-4 py-3">
                      <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                        #{u.id}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">{u.name}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">{u.email}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-900">{u.age || '-'}</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => openEdit(u)}
                          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(u.id)}
                          className="px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <EditUser user={selectedUser} onClose={handleCloseEdit} />
    </div>
  );
};

export default UserList;