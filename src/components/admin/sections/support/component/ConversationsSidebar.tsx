import SecondaryInputField from '@/components/common/SecondaryInputField';
import React from 'react'
import { FaSearch, FaSort } from 'react-icons/fa';
import Conversationslist from './Conversationslist';

function ConversationsSidebar({ filteredConversations, activeConversation, searchTerm, setSearchTerm, setActiveConversation }) {
  return (
    <div className="w-1/3 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-helixaa-blue text-white">
        <h2 className="text-xl font-bold">Support Inbox</h2>
        <p className="text-sm text-helixaa-green/80">Customer Support Conversations</p>
      </div>

      {/* Search */}

      <div className="p-3  bg-gray-50 border-b border-gray-200">
        <div className='relative'>
          <SecondaryInputField
            name="Search conversations..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search conversations..."
            icon={<FaSearch className="w-4 h-4" />}
            error={""}
          />
          <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>

        </div>

      </div>


      {/* Conversations list */}
      <Conversationslist
        activeConversation={activeConversation}
        filteredConversations={filteredConversations}
        setActiveConversation={setActiveConversation}
      />

    </div>
  );
}

export default ConversationsSidebar