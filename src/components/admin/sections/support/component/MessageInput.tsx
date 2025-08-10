import { FaPaperPlane } from "react-icons/fa"


function MessageInput({newMessage,handleKeyPress,handleSendMessage,setNewMessage,setActiveConversation}) {
  return (
    <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center">
            <button className="text-gray-500 hover:text-helixaa-blue mx-1">
              <i className="fas fa-paperclip"></i>
            </button>
            <button className="text-gray-500 hover:text-helixaa-blue mx-1">
              <i className="fas fa-image"></i>
            </button>
            <div className="flex-1 mx-2">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-helixaa-blue focus:border-helixaa-blue resize-none"
                rows={1}
              />
            </div>
            <button
              className="bg-helixaa-blue text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700 disabled:opacity-50"
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ''}
            >
              <FaPaperPlane/>
            </button>
          </div>
        </div>
  )
}

export default MessageInput