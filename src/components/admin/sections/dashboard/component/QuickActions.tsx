import React from 'react'

function QuickActions({quickActions}) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
          <h3 className="font-bold text-gray-800 mb-5">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <button 
                key={index}
                className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-helixaa-blue hover:bg-helixaa-blue/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-helixaa-blue/10 flex items-center justify-center text-helixaa-blue mb-2">
                  <i className={action.icon}></i>
                </div>
                <span className="text-sm">{action.title}</span>
              </button>
            ))}
          </div>
        </div>
  )
}

export default QuickActions