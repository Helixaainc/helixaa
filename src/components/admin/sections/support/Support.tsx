import React, { useEffect, useState } from 'react';
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
  shopId?: string; // Added to track Firestore document ID
}

const Support = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Load conversations from Firestore
  const loadConversations = async () => {
    try {
      setLoading(true);
      const resp = await fetch('/api/support/load-messages', { method: 'GET' });
      const data = await resp.json();

      if (data.success && data.conversations.length > 0) {
        setConversations(data.conversations);
        setActiveConversation(data.conversations[0]);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeConversation) return;

    try {
      // Optimistic UI update
      const newMsg: Message = {
        id: activeConversation.messages.length + 1,
        text: newMessage,
        sender: 'support',
        timestamp: 'Just now',
        read: false,
      };

      const updatedConversations = conversations.map(conv => {
        if (conv.id === activeConversation.id) {
          return {
            ...conv,
            lastMessage: newMessage,
            timestamp: 'Just now',
            messages: [newMsg, ...conv.messages],
          };
        }
        return conv;
      });

      setConversations(updatedConversations);
      setActiveConversation(
        updatedConversations.find(c => c.id === activeConversation.id) || null
      );
      setNewMessage('');

      // Send to backend
      await fetch('/api/support/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shopId: activeConversation.shopId,
          message: newMessage,
        }),
      });
    } catch (error) {
      console.error('Error sending message:', error);
      // Rollback optimistic update if needed
      loadConversations();
    }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-medium">Loading conversations...</div>
      </div>
    );
  }

  if (!conversations.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-medium">No conversations found</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white rounded-xl shadow overflow-hidden">
      <ConversationsSidebar
        activeConversation={activeConversation}
        filteredConversations={filteredConversations}
        searchTerm={searchTerm}
        setActiveConversation={setActiveConversation}
        setSearchTerm={setSearchTerm}
      />
      
      {activeConversation ? (
        <div className="w-2/3 flex flex-col">
          <ChatHeader activeConversation={activeConversation} />
          <MessageArea activeConversation={activeConversation} />
          <MessageInput
            handleKeyPress={handleKeyPress}
            handleSendMessage={handleSendMessage}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
          />
        </div>
      ) : (
        <div className="w-2/3 flex items-center justify-center">
          <div className="text-lg font-medium">Select a conversation</div>
        </div>
      )}
    </div>
  );
};

export default Support;