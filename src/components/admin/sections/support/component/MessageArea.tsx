

function MessageArea({activeConversation}) {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {activeConversation.messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'support' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'support'
                      ? 'bg-helixaa-blue text-white rounded-tr-none'
                      : 'bg-white border border-gray-200 rounded-tl-none'
                    }`}
                >
                  <p>{message.text}</p>
                  <div className={`text-xs mt-1 flex justify-end ${message.sender === 'support' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                    {message.timestamp}
                    {message.sender === 'support' && (
                      <span className="ml-1">
                        {message.read ? <i className="fas fa-check-double"></i> : <i className="fas fa-check"></i>}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
  )
}

export default MessageArea