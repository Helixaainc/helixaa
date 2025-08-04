import React from 'react'

function SystemStatus({systemStatuses}) {
  return (
    <div className="bg-helixaa-blue rounded-xl shadow p-5 text-white">
          <h3 className="font-bold text-xl mb-3">System Status</h3>
          <p className="text-helixaa-green/80 mb-5">All systems are operational</p>
          
          <div className="space-y-4">
            {systemStatuses.map((status, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span>{status.title}</span>
                  <span className="text-green-400">{status.status}</span>
                </div>
                <div className="w-full bg-helixaa-green/20 rounded-full h-2">
                  <div 
                    className="bg-helixaa-green h-2 rounded-full" 
                    style={{ width: `${status.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
  )
}

export default SystemStatus