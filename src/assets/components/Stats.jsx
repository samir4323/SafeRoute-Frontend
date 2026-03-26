import React from 'react';

function Stats({ total, active, maintenance }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border-l-8 border-blue-600 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Vehicles</p>
          <h3 className="text-3xl font-black text-gray-800">{total}</h3>
        </div>
        <div className="text-4xl">🚛</div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border-l-8 border-emerald-500 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Active Now</p>
          <h3 className="text-3xl font-black text-emerald-600">{active}</h3>
        </div>
        <div className="text-4xl">🟢</div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border-l-8 border-amber-500 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Maintenance</p>
          <h3 className="text-3xl font-black text-amber-600">{maintenance}</h3>
        </div>
        <div className="text-4xl">🛠️</div>
      </div>

    </div>
  );
}

export default Stats;