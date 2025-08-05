import React from 'react'

function Conversationslist({filteredConversations,activeConversation,setActiveConversation}) {
  return (
    <div className="flex-1 overflow-y-auto">
          {filteredConversations.map(conversation => (
            <div 
              key={conversation.id}
              className={`p-4 border-b border-gray-200 cursor-pointer flex items-center ${
                activeConversation.id === conversation.id ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => setActiveConversation(conversation)}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-helixaa-blue/10 flex items-center justify-center text-helixaa-blue font-bold text-lg">
                  {conversation.avatar}
                </div>
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  conversation.status === 'online' ? 'bg-green-500' : 
                  conversation.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                }`}></div>
              </div>
              
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-900 truncate">{conversation.name}</h3>
                  <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                  {conversation.unread > 0 && (
                    <span className="flex-shrink-0 bg-helixaa-green text-helixaa-blue text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
  )
}

export default Conversationslist