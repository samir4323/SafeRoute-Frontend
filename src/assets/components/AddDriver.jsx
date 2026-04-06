import axios from "axios";
import { useState } from "react";

const AddDriver = ({ onDriverAdded }) => {
    const [formData, setFormData] = useState({
        full_name: "",
        license_number: "",
        phone: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/drivers", formData);
            setFormData({ full_name: "", license_number: "", phone: "" });
            onDriverAdded();
            alert("New Driver Added! 👤✅");
        } catch (err) {
            alert("Error: Check if License Number is unique!");
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4">👤 Add New Driver</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input 
                    type="text" placeholder="Full Name" required
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.full_name}
                    onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                />
                <input 
                    type="text" placeholder="License Number (e.g. LF123)" required
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.license_number}
                    onChange={(e) => setFormData({...formData, license_number: e.target.value})}
                />
                <input 
                    type="text" placeholder="Phone Number" required
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                <button type="submit" className="md:col-span-3 bg-slate-900 text-white p-3 rounded-xl font-bold hover:bg-slate-800 transition-all">
                    + Register Driver
                </button>
            </form>
        </div>
    );
};

export default AddDriver;