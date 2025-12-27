import { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  const [shouldRefreshUserList, setShouldRefreshUserList] = useState(false);

  const refreshUserList = () => {
    setShouldRefreshUserList(!shouldRefreshUserList);
  };

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 lg:px-8 py-6 lg:py-12 max-w-7xl"> 
        {/* Page Header */}
        <header className="text-center mb-8 lg:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb- sm:mb-3 bg-clip-text">
            User Management System
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Manage your users with ease
          </p>
        </header>

        {/* Main Content Area */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Left Side: Form to Add New Users */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:sticky lg:top-8">
              <UserForm onUserAdded={refreshUserList} />
            </div>
          </aside>

          {/* Right Side: List of All Users */}
          <section className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
              <UserList refreshTrigger={shouldRefreshUserList} />
            </div>
          </section>
          
        </main>
      </div>
    </div>
  );
}

export default App;