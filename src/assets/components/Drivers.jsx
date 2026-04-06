import { useEffect, useState } from "react";
import axios from "axios";
import AddDriver from "./AddDriver";

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);

    const fetchDrivers = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/drivers");
                setDrivers(res.data);
            } catch (err) {
                console.log("Error fetching drivers", err);
            }
        };

    useEffect(() => {
        fetchDrivers();
    }, []);

    const deleteDriver = async(id) => {

        if(!window.confirm("are you sure you want to delete this Driver ?")){
            return;
        }
            try{
                axios.delete("http://127.0.0.1:8000/api/drivers/${id}")
                setDrivers(drivers.filter(driver=>driver.id!==id));
                alert("Driver deleted successfully!");

        }catch(err){
            alert("Oops! Could not delete the driver. Please try again.");
        }
    }

    return (
    <div className="space-y-6"> 
        <AddDriver onDriverAdded={fetchDrivers} />

        <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    👤 Team Drivers
                </h2>
                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                    {drivers.length} Total
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                            <th className="py-3 px-4">Full Name</th>
                            <th className="py-3 px-4">License No.</th>
                            <th className="py-3 px-4">Phone</th>
                            <th className="py-3 px-4 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-600 text-sm">
                        {drivers.map((driver) => (
                            <tr key={driver.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-all">
                                <td className="py-4 px-4 font-semibold text-slate-800">
                                    {driver.full_name}
                                </td>
                                <td className="py-4 px-4 font-mono text-xs text-blue-500">
                                    {driver.license_number}
                                </td>
                                <td className="py-4 px-4">{driver.phone}</td>
                                <td className="py-4 px-4 text-center">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                        driver.status === 'available' ? 'bg-green-100 text-green-600' : 
                                        driver.status === 'on_trip' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                        {driver.status?.replace('_', ' ')}
                                    </span>
                                    <button onClick={()=>deleteDriver(driver.id)}  
                                    className="bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold py-1 px-3 rounded ml-2 transition-colors">
                                    Delete
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {drivers.length === 0 && (
                    <div className="text-center py-10 text-slate-400 italic">
                        No drivers found in the system.
                    </div>
                )}
            </div>
        </div>
    </div>
);
};

export default Drivers;