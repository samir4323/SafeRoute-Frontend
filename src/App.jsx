import React, { useState } from 'react';
import Vehicles from './assets/components/Vehicles';
import AddVehicle from './assets/components/AddVehicle';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh); 
  };

  return (

    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl flex items-center justify-center gap-3">
            🚀 <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              SafeRoute System Dashboard
            </span>
          </h1>
          <p className="mt-2 text-lg text-gray-600">Manage your fleet efficiency and safely.</p>
          <div className="mt-4 h-1 w-32 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <section className="mb-10">
          <AddVehicle onVehicleAdded={handleRefresh} />
        </section>

        <section>
          <Vehicles key={refresh} />
        </section>

      </div>
    </div>
  );
}

export default App;