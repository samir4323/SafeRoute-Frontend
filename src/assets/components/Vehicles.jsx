import React from 'react';
import axios from 'axios';

function Vehicles({ vehicles, onRefresh }) {

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this truck? 🚛")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/vehicles/${id}`);
                
                onRefresh();
                
                alert("Vehicle deleted successfully! ✅");
            } catch (error) {
                console.error("Delete error:", error);
                alert("Error deleting vehicle!");
            }
        }
    };

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
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {vehicles.length > 0 ? (
                        vehicles.map(v => (
                            <tr key={v.id} className="hover:bg-gray-50 transition-colors text-center md:text-left">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{v.plate_number}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{v.model}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        v.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {v.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                        onClick={() => handleDelete(v.id)}
                                        className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-all active:scale-90"
                                    >
                                        Delete 🗑️
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="px-6 py-10 text-center text-gray-500 italic">No vehicles found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Vehicles;