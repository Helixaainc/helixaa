import { FaPaperPlane, FaImage, FaTimes } from "react-icons/fa";
import { useState, useRef } from 'react';

function MessageInput({ newMessage, handleKeyPress, handleSendMessage, setNewMessage, setActiveConversation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // In MessageInput component
const handleSend = async () => {
  try {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const uploadResponse = await fetch('/api/upload-chat-image', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Image upload failed');
      }

      const { path: imageUrl } = await uploadResponse.json();
      
      // Call handleSendMessage with the image URL
      handleSendMessage(imageUrl);
      
      removeImage();
    } else if (newMessage.trim() !== '') {
      // For text messages, pass empty string or null
      handleSendMessage('');
    }
  } catch (error) {
    console.error('Error sending image:', error);
    // Optionally show error to user
  }
};

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      {/* Image Preview */}
      {imagePreview && (
        <div className="relative mb-2">
          <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="w-full h-full object-contain"
            />
          </div>
          <button 
            onClick={removeImage}
            className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
          >
            <FaTimes size={14} />
          </button>
        </div>
      )}

      <div className="flex items-center">
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
          id="image-upload"
        />
        
        {/* Image upload button */}
        <label 
          htmlFor="image-upload"
          className="text-gray-500 hover:text-helixaa-blue mx-1 cursor-pointer"
        >
          <FaImage size={18} />
        </label>

        {/* Message input */}
        <div className="flex-1 mx-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={selectedImage ? "Add a caption (optional)..." : "Type a message..."}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-helixaa-blue focus:border-helixaa-blue resize-none"
            rows={1}
          />
        </div>

        {/* Send button */}
        <button
          className="bg-helixaa-blue text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700 disabled:opacity-50"
          onClick={handleSend}
          disabled={!newMessage.trim() && !selectedImage}
        >
          <FaPaperPlane size={16} />
        </button>
      </div>
    </div>
  );
}

export default MessageInput;