import { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import './App.css';

function App() {
  const [refresh, setRefresh] = useState(false);

  const reload = () => setRefresh(!refresh);

  return (
    <div style={{ padding: 20 }}>
      <h1>MySQL CRUD App</h1>
      <UserForm onAdd={reload} />
      <UserList refresh={refresh} />
    </div>
  );
}

export default App;