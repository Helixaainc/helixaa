import React from 'react'

function StatsCard({index,title,value,color,icon,changeDirection,changeValue}) {
  return (
    <div 
            key={index}
            className="stat-card bg-white rounded-xl shadow p-5 transition-all duration-300 animate-fadeInUp"
            style={{ animationDelay: `${0.1 * index}s` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <h3 className="text-2xl font-bold mt-1">{value}</h3>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-helixaa-${color}/10 flex items-center justify-center text-helixaa-${color}`}>
                <i className={`${icon} text-xl`}></i>
              </div>
            </div>
            <div className="mt-3">
              <span className={`text-${changeDirection === 'up' ? 'green' : 'red'}-500 text-sm font-medium`}>
                <i className={`fas fa-arrow-${changeDirection}`}></i> {changeValue}
              </span>
              <span className="text-gray-500 text-sm ml-2">from last month</span>
            </div>
          </div>
  )
}

export default StatsCard