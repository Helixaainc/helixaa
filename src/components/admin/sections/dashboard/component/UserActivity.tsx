import React from 'react'

function UserActivity({userActivities}) {
  return (
    <div className="bg-white rounded-xl shadow p-5 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <h3 className="font-bold text-gray-800 mb-5">User Activity</h3>
          <div className="space-y-4">
            {userActivities.map((activity, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-10 h-10 rounded-full bg-helixaa-${activity.color}/10 flex items-center justify-center text-helixaa-${activity.color} mr-3`}>
                  <i className={activity.icon}></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.title}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className={`bg-helixaa-${activity.color === 'blue' ? 'blue' : 'green'} h-2 rounded-full`} 
                      style={{ width: `${activity.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-gray-500 text-sm">{activity.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
  )
}

export default UserActivity