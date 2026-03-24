import React, { useState } from 'react';
import axios from 'axios';

function AddVehicle({ onVehicleAdded }) {
    const [formData, setFormData] = useState({ plate_number: '', model: '', status: 'active' });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/vehicles', formData)
            .then(() => {
                setFormData({ plate_number: '', model: '', status: 'active' });
                if(onVehicleAdded) onVehicleAdded();
            })
            .catch(err => alert("Error adding vehicle!"));
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">➕ Add New Truck</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input 
                    className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    type="text" placeholder="Plate Number" value={formData.plate_number}
                    onChange={(e) => setFormData({...formData, plate_number: e.target.value})} required 
                />
                <input 
                    className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    type="text" placeholder="Model" value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})} required 
                />
                <select 
                    className="border border-gray-300 p-2 rounded-lg bg-white"
                    value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                    <option value="active">Active</option>
                    <option value="maintenance">Maintenance</option>
                </select>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all shadow-md active:scale-95">
                    Save Vehicle
                </button>
            </form>
        </div>
    );
}

export default AddVehicle;