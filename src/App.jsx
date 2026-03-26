import React, { useEffect, useState } from 'react';
import Vehicles from './assets/components/Vehicles';
import AddVehicle from './assets/components/AddVehicle';
import Stats from './assets/components/Stats';
import axios from 'axios';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [vehicles, setVehicles]=useState([]);
  const [search, setSearch] = useState("");

  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/api/vehicles")
    .then(res=>setVehicles(res.data))
    .catch(err=>console.log(err));
  },[refresh]);

  const filteredVehicles = vehicles.filter(v => 
    v.plate_number.toLowerCase().includes(search.toLowerCase()) || 
    v.model.toLowerCase().includes(search.toLowerCase())
);


  const total = vehicles.length;
  const active = vehicles.filter(v=>v.status === "active").length;
  const maintenance = vehicles.filter(v=>v.status === "maintenance").length

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

        <section>
          <Stats total={total} active={active} maintenance={maintenance} />
        </section>
        <section className="mb-10">
          <AddVehicle onVehicleAdded={handleRefresh} />
        </section>
        <div className="mb-6">
        <div className="relative max-w-md mx-auto">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                🔍
            </span>
            <input 
                type="text"
                placeholder="Search by Plate or Model..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-2xl leading-5 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
      </div>
        <section>
          <Vehicles vehicles={filteredVehicles} onRefresh={handleRefresh} key={refresh}/>
        </section>

      </div>
    </div>
  );
}

export default App;