import React from 'react'

function ChatHeader({activeConversation}) {
  return (
<div className="p-4 border-b border-gray-200 flex items-center">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-helixaa-blue/10 flex items-center justify-center text-helixaa-blue font-bold">
              {activeConversation.avatar}
            </div>
            <div className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white ${activeConversation.status === 'online' ? 'bg-green-500' :
                activeConversation.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
              }`}></div>
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-gray-900">{activeConversation.name}</h3>
            <p className="text-sm text-gray-500">
              {activeConversation.status === 'online' ? 'Online now' :
                activeConversation.status === 'away' ? 'Away' : 'Offline'}
            </p>
          </div>
          <div className="ml-auto flex space-x-3">
            <button className="text-gray-500 hover:text-helixaa-blue">
              <i className="fas fa-phone"></i>
            </button>
            <button className="text-gray-500 hover:text-helixaa-blue">
              <i className="fas fa-video"></i>
            </button>
            <button className="text-gray-500 hover:text-helixaa-blue">
              <i className="fas fa-info-circle"></i>
            </button>
          </div>
        </div>
  )
}

export default ChatHeader