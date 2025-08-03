import React, { useState } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'support';
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  status: 'online' | 'offline' | 'away';
  messages: Message[];
}

const Support = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      name: 'Rahul Sharma',
      avatar: 'RS',
      lastMessage: 'Thanks for helping me resolve the payment issue!',
      timestamp: '2 hours ago',
      unread: 0,
      status: 'online',
      messages: [
        { id: 1, text: 'Hello, I need help with a transaction', sender: 'user', timestamp: '10:30 AM', read: true },
        { id: 2, text: 'Sure, I can help. Can you share your transaction ID?', sender: 'support', timestamp: '10:32 AM', read: true },
        { id: 3, text: 'TX123456789', sender: 'user', timestamp: '10:33 AM', read: true },
        { id: 4, text: 'Thanks for helping me resolve the payment issue!', sender: 'user', timestamp: '11:45 AM', read: true },
      ],
    },
    {
      id: 2,
      name: 'Priya Patel',
      avatar: 'PP',
      lastMessage: 'How do I update my bank details?',
      timestamp: '5 hours ago',
      unread: 2,
      status: 'away',
      messages: [
        { id: 1, text: 'How do I update my bank details?', sender: 'user', timestamp: '9:15 AM', read: true },
        { id: 2, text: 'You can update it from the Profile section in the app', sender: 'support', timestamp: '9:20 AM', read: true },
        { id: 3, text: "I can't find that option", sender: 'user', timestamp: '1:30 PM', read: false },
        { id: 4, text: "Let me guide you through it", sender: 'support', timestamp: '1:32 PM', read: false },
      ],
    },
    {
      id: 3,
      name: 'Vikram Singh',
      avatar: 'VS',
      lastMessage: 'The app keeps crashing when I try to make a payment',
      timestamp: 'Yesterday',
      unread: 0,
      status: 'offline',
      messages: [
        { id: 1, text: 'The app keeps crashing when I try to make a payment', sender: 'user', timestamp: 'Yesterday', read: true },
        { id: 2, text: "We're aware of this issue and working on a fix", sender: 'support', timestamp: 'Yesterday', read: true },
      ],
    },
    {
      id: 4,
      name: 'Ananya Reddy',
      avatar: 'AR',
      lastMessage: 'Can you confirm if my KYC is approved?',
      timestamp: '2 days ago',
      unread: 0,
      status: 'online',
      messages: [
        { id: 1, text: 'Can you confirm if my KYC is approved?', sender: 'user', timestamp: '2 days ago', read: true },
        { id: 2, text: 'Yes, your KYC was approved yesterday', sender: 'support', timestamp: '2 days ago', read: true },
      ],
    },
    {
      id: 5,
      name: 'Arjun Kumar',
      avatar: 'AK',
      lastMessage: 'I need to increase my credit limit',
      timestamp: '3 days ago',
      unread: 0,
      status: 'offline',
      messages: [
        { id: 1, text: 'I need to increase my credit limit', sender: 'user', timestamp: '3 days ago', read: true },
        { id: 2, text: 'Please share your monthly income details', sender: 'support', timestamp: '3 days ago', read: true },
      ],
    },
  ]);

  const [activeConversation, setActiveConversation] = useState<Conversation>(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation.id) {
        const newMsg: Message = {
          id: conv.messages.length + 1,
          text: newMessage,
          sender: 'support',
          timestamp: 'Just now',
          read: false,
        };
        
        return {
          ...conv,
          lastMessage: newMessage,
          timestamp: 'Just now',
          messages: [...conv.messages, newMsg],
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setActiveConversation(updatedConversations.find(c => c.id === activeConversation.id)!);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-full bg-white rounded-xl shadow overflow-hidden">
      {/* Conversations sidebar */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-helixaa-blue text-white">
          <h2 className="text-xl font-bold">Support Inbox</h2>
          <p className="text-sm text-helixaa-green/80">Customer Support Conversations</p>
        </div>
        
        {/* Search */}
        <div className="p-3 bg-gray-50 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-helixaa-blue focus:border-helixaa-blue"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
        
        {/* Conversations list */}
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
      </div>
      
      {/* Chat area */}
      <div className="w-2/3 flex flex-col">
        {/* Chat header */}
        <div className="p-4 border-b border-gray-200 flex items-center">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-helixaa-blue/10 flex items-center justify-center text-helixaa-blue font-bold">
              {activeConversation.avatar}
            </div>
            <div className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white ${
              activeConversation.status === 'online' ? 'bg-green-500' : 
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
        
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {activeConversation.messages.map(message => (
              <div 
                key={message.id}
                className={`flex ${message.sender === 'support' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'support' 
                      ? 'bg-helixaa-blue text-white rounded-tr-none' 
                      : 'bg-white border border-gray-200 rounded-tl-none'
                  }`}
                >
                  <p>{message.text}</p>
                  <div className={`text-xs mt-1 flex justify-end ${
                    message.sender === 'support' ? 'text-blue-100' : 'text-gray-500'
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
        
        {/* Message input */}
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
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;