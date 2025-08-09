import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { FaDownload, FaExpand, FaTimes } from 'react-icons/fa';

function MessageArea({ activeConversation }) {
  const messagesEndRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [activeConversation.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleDownload = async (imageUrl) => {
  try {
    // If it's already a data URL or blob URL
    if (imageUrl.startsWith('data:') || imageUrl.startsWith('blob:')) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `image-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // For regular URLs, we need to fetch the image first
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `image-${Date.now()}.jpg` || `image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    }, 100);
  } catch (error) {
    console.error('Download failed:', error);
    // Fallback: Open in new tab if download fails
    window.open(imageUrl, '_blank');
  }
};

  const closeModal = () => {
    setSelectedImage(null);
    setIsFullscreen(false);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 relative">
      <div className="space-y-4">
        {[...activeConversation.messages].reverse().map(message => (
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
              {message.type === 1 ? (
                <p>{message.text}</p>
              ) : (
                <div className="relative group">
                  <Image
                    src={message.text}
                    alt="Chat Image"
                    width={300}
                    height={400}
                    className="mr-2 cursor-pointer rounded-lg"
                    onClick={() => handleImageClick(message.text)}
                  />
                  <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(message.text);
                      }}
                      className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                    >
                      <FaDownload size={14} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageClick(message.text);
                      }}
                      className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                    >
                      <FaExpand size={14} />
                    </button>
                  </div>
                </div>
              )}

              <div className={`text-xs mt-1 flex justify-end ${message.sender === 'support' ? 'text-blue-100' : 'text-gray-500'}`}>
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
        <div ref={messagesEndRef} />
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className={`fixed inset-0 bg-black/90 z-50 flex items-center justify-center ${isFullscreen ? '' : 'p-4'}`}>
          <div className={`relative ${isFullscreen ? 'w-full h-full' : 'max-w-4xl max-h-[90vh]'}`}>
            <Image
              src={selectedImage}
              alt="Preview"
              fill
              className="object-contain"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <button 
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="bg-white/20 text-white p-3 rounded-full hover:bg-white/30 backdrop-blur-sm"
              >
                {isFullscreen ? <FaExpand size={16} /> : <FaExpand size={16} />}
              </button>
              <button 
                onClick={() => handleDownload(selectedImage)}
                className="bg-white/20 text-white p-3 rounded-full hover:bg-white/30 backdrop-blur-sm"
              >
                <FaDownload size={16} />
              </button>
              <button 
                onClick={closeModal}
                className="bg-white/20 text-white p-3 rounded-full hover:bg-white/30 backdrop-blur-sm"
              >
                <FaTimes size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageArea;