import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import Vehicles from './assets/components/Vehicles';
import AddVehicle from './assets/components/AddVehicle';
import Stats from './assets/components/Stats';
import Trips from './assets/components/Trips'; 
import Drivers from './assets/components/Drivers';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/vehicles")
      .then(res => setVehicles(res.data))
      .catch(err => console.log(err));
  }, [refresh]);

  const handleRefresh = () => setRefresh(!refresh);

  const Dashboard = () => {
    const filteredVehicles = vehicles.filter(v =>
      v.plate_number.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase())
    );

    const total = vehicles.length;
    const active = vehicles.filter(v => v.status === "active").length;
    const maintenance = vehicles.filter(v => v.status === "maintenance").length;

    return (
      <div className="max-w-5xl mx-auto">
        <section><Stats total={total} active={active} maintenance={maintenance} /></section>
        <section className="mb-10"><AddVehicle onVehicleAdded={handleRefresh} /></section>
        <div className="mb-6 relative max-w-md mx-auto">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">🔍</span>
          <input 
            type="text" placeholder="Search by Plate or Model..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-2xl leading-5 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <section><Vehicles vehicles={filteredVehicles} onRefresh={handleRefresh} key={refresh}/></section>
      </div>
    );
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        
        <aside className="w-64 bg-white border-r border-gray-200 py-10 px-6 fixed h-full shadow-sm">
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-black text-blue-600 tracking-tighter">🚀 SAFEROUTE</h1>
          </div>
          <nav className="space-y-2">
            <NavLink to="/" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl font-medium transition-all ${isActive ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'}`}>
              📊 Fleet Dashboard
            </NavLink>
            <NavLink to="/trips"  className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl font-medium transition-all ${isActive ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'}`}>
              🛣️ Trip Management
            </NavLink>
            <NavLink to="/drivers" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl font-medium transition-all ${isActive ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'}`}>
              👤 Drivers
            </NavLink>
          </nav>
        </aside>

        <main className="flex-1 ml-64 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/drivers" element={<Drivers/>}/>
            <Route path="/trips" element={<Trips onRefresh={handleRefresh} />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;