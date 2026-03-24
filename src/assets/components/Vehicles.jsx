import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Vehicles() {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/vehicles')
            .then(res => setVehicles(res.data))
            .catch(err => console.log("API Error:", err));
    }, []);

    return (
        <div className="mt-8 bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    🚛 Vehicles List <span className="text-sm font-normal text-gray-500">(SafeRoute Fleet)</span>
                </h2>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plate Number</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {vehicles.length > 0 ? (
                        vehicles.map(v => (
                            <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{v.plate_number}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{v.model}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        v.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {v.status}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="px-6 py-10 text-center text-gray-500 italic">No vehicles found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Vehicles;