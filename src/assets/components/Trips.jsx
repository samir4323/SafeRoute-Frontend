import axios from "axios";
import { useEffect, useState } from "react";

const Trips = ({onRefresh}) => {
    const [trips, setTrips] = useState([]);
    const [showModal, setShowModal] = useState(false);
    
    const [vehicles, setVehicles] = useState([]);
    const [drivers, setDrivers] = useState([]);

    const [formData, setFormData] = useState({
        driver_id: "",
        vehicle_id: "",
        start_point: "",
        end_point: ""
    });

    const fetchTrips = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/trips');
            setTrips(res.data);
        } catch (err) {
            console.log("Error fetching trips", err);
        }
    };

    const fetchResources = async () => {
        try {
            const vRes = await axios.get('http://127.0.0.1:8000/api/vehicles');
            const dRes = await axios.get('http://127.0.0.1:8000/api/drivers');
            setVehicles(vRes.data.filter(v => v.status === 'active'));
            setDrivers(dRes.data.filter(d => d.status === 'available'));
        } catch (err) {
            console.log("Error fetching resources", err);
        }
    };

    useEffect(() => {
        fetchTrips();
        fetchResources();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/trips', formData);
            onRefresh();
            setShowModal(false);
            fetchTrips(); 
            fetchResources(); 
            alert("Trip Started! 🚛💨");
        } catch (err) {
            alert("Error: Check if all fields are filled!");
        }
    };
const [showFinishModal, setShowFinishModal] = useState(false);
const [selectedTrip, setSelectedTrip] = useState(null);
const [finishData, setFinishData] = useState({
    distance: "",
    fuel_consumed: ""
});

const handleFinishTrip = async (e) => {
    e.preventDefault();
    try {
        await axios.put(`http://127.0.0.1:8000/api/trips/${selectedTrip.id}/complete`, finishData);
        onRefresh();
        setShowFinishModal(false);
        fetchTrips();
        fetchResources(); 
        alert("Trip Completed! Resource Released 🟢");
    } catch (err) {
        alert("Error completing trip!");
    }
};

    return (
        <div className="space-y-6">
 
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">🛣️ Trip Management</h2>
                    <p className="text-sm text-slate-500">Track and launch new delivery missions</p>
                </div>
                <button 
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                    + Launch Trip
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                                <th className="py-4 px-6">Route</th>
                                <th className="py-4 px-6">Driver</th>
                                <th className="py-4 px-6">Truck</th>
                                <th className="py-4 px-6">Distance</th>
                                <th className="py-4 px-6">Status</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-600 text-sm">
                            {trips.map((trip) => (
                                <tr key={trip.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-all">
                                    <td className="py-4 px-6 font-medium text-slate-700">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                                            {trip.start_point} <span className="text-slate-300">→</span> {trip.end_point}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-800">{trip.driver?.full_name}</span>
                                            <span className="text-xs text-slate-400">{trip.driver?.phone}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded text-xs font-mono border border-slate-200">
                                            {trip.vehicle?.plate_number}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">{trip.distance || '0.00'} km</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                            trip.status === 'in_progress' ? 'bg-blue-100 text-blue-600' :
                                            trip.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                            {trip.status?.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        {trip.status === 'in_progress' && (
                                        <button 
                                            onClick={() => { setSelectedTrip(trip); setShowFinishModal(true); }}
                                             className="text-xs bg-green-500 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-green-600 transition-all shadow-sm shadow-green-100"
                                         >
                                          🏁 Finish
                                        </button>
                                     )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                        <h3 className="text-2xl font-bold mb-2 text-slate-800">New Mission</h3>
                        <p className="text-slate-500 mb-6 text-sm">Assign a driver and vehicle to a new route.</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">Assign Driver</label>
                                    <select 
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={(e) => setFormData({...formData, driver_id: e.target.value})}
                                        required
                                    >
                                        <option value="">Choose an available driver</option>
                                        {drivers.map(d => (
                                            <option key={d.id} value={d.id}>{d.full_name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">Assign Truck</label>
                                    <select 
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={(e) => setFormData({...formData, vehicle_id: e.target.value})}
                                        required
                                    >
                                        <option value="">Choose an active truck</option>
                                        {vehicles.map(v => (
                                            <option key={v.id} value={v.id}>{v.model} ({v.plate_number})</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">Origin</label>
                                    <input 
                                        type="text" placeholder="e.g. Fes" 
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                                        onChange={(e) => setFormData({...formData, start_point: e.target.value})}
                                        required 
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">Destination</label>
                                    <input 
                                        type="text" placeholder="e.g. Tangier" 
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                                        onChange={(e) => setFormData({...formData, end_point: e.target.value})}
                                        required 
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-6">
                                <button 
                                    type="button" onClick={() => setShowModal(false)}
                                    className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
                                >
                                    Start Trip
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                
            )}
            {showFinishModal && (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-2 text-slate-800">Complete Trip</h3>
            <p className="text-sm text-slate-500 mb-6">Enter final trip data to release driver and vehicle.</p>
            
            <form onSubmit={handleFinishTrip} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Actual Distance (KM)</label>
                    <input 
                        type="number" step="0.01" required
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                        onChange={(e) => setFinishData({...finishData, distance: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Fuel Consumed (Liters)</label>
                    <input 
                        type="number" step="0.01" required
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                        onChange={(e) => setFinishData({...finishData, fuel_consumed: e.target.value})}
                    />
                </div>
                <div className="flex gap-3 pt-4">
                    <button type="button" onClick={() => setShowFinishModal(false)} className="flex-1 py-3 font-bold text-slate-500">Cancel</button>
                    <button type="submit" className="flex-1 py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-100">Submit 🏁</button>
                </div>
            </form>
        </div>
    </div>
)}          
        </div>
    );
}

export default Trips;