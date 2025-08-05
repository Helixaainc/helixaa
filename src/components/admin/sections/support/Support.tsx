import React, { useState } from 'react';
import ConversationsSidebar from './component/ConversationsSidebar';
import ChatHeader from './component/ChatHeader';
import MessageArea from './component/MessageArea';
import MessageInput from './component/MessageInput';

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
    <div className="flex  h-screen bg-white rounded-xl shadow overflow-hidden">
      {/* Conversations sidebar */}
      <ConversationsSidebar
        activeConversation={activeConversation}
        filteredConversations={filteredConversations}
        searchTerm={searchTerm}
        setActiveConversation={setActiveConversation}
        setSearchTerm={setSearchTerm}

      />
      {/* Chat area */}
      <div className="w-2/3 flex flex-col">
        {/* Chat header */}
        <ChatHeader activeConversation={activeConversation} />
        

        {/* Messages area */}
        <MessageArea activeConversation={activeConversation}/>

        {/* Message input */}
        <MessageInput  handleKeyPress={handleKeyPress} handleSendMessage={handleSendMessage} newMessage={newMessage} setNewMessage={setNewMessage}/>
      </div>
    </div>
  );
};

export default Support;