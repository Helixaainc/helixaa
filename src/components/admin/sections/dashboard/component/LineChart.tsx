import React from 'react'

function LineChart({Ref}) {
  return (
<div className="lg:col-span-2 bg-white rounded-xl shadow p-5 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-gray-800">Users Overview</h3>
            <div>
              <button className="text-sm bg-gray-100 px-3 py-1 rounded-lg mr-2">Month</button>
              <button className="text-sm bg-helixaa-blue text-white px-3 py-1 rounded-lg">Quarter</button>
            </div>
          </div>
          <div className="h-72">
            <canvas ref={Ref} id="revenueChart"></canvas>
          </div>
        </div>
  )
}

export default LineChart