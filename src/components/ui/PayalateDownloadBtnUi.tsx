'use client';
// src/components/download/DownloadDialog.js
import { useState } from 'react';
import { motion } from 'framer-motion';

const DownloadDialog = ({ isOpen, onClose }) => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
     
      const response = await fetch('/api/track-paylater-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userDetails)
      });
      
      if (!response.ok) throw new Error('Failed to save details');
      
      
      const apkUrl = '/downloads/paylater.apk';
      const link = document.createElement('a');
      link.href = apkUrl;
      link.download = 'PayLater-App.apk';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      onClose();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to process your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-[1000] p-4">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeInUp"
      >
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-helixaa-blue to-helixaa-green p-5">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-helixaa-blue">Download PayLater APK</h3>
            <button 
              onClick={onClose}
              className="text-helixaa-blue  hover:text-gray-200 transition-colors"
              disabled={isSubmitting}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          </div>
          <p className="text-white/80 mt-1 text-sm">
            Get our flagship app and enjoy flexible payments
          </p>
        </div>
        
        {/* Form section */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Full Name *</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={userDetails.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-helixaa-blue focus:border-transparent"
                  required
                  disabled={isSubmitting}
                  placeholder="Enter your full name"
                />
                <div className="absolute right-3 top-3.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Email *</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-helixaa-blue focus:border-transparent"
                  required
                  disabled={isSubmitting}
                  placeholder="your.email@example.com"
                />
                <div className="absolute right-3 top-3.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Phone (Optional)</label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={userDetails.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-helixaa-blue focus:border-transparent"
                  placeholder="+91 9876543210"
                  disabled={isSubmitting}
                />
                <div className="absolute right-3 top-3.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 极" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-6 py-3 rounded-lg font-medium border ${
                isSubmitting 
                  ? 'bg-gray-100 text-gray-400 border-gray-300' 
                  : 'bg-white text-helixaa-blue border-helixaa-blue hover:bg-gray-50'
              }`}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                isSubmitting 
                  ? 'bg-helixaa-blue/70 cursor-not-allowed' 
                  : 'bg-helixaa-blue text-white hover:bg-helixaa-blue/90'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Now
                </>
              )}
            </button>
          </div>
        </form>
        
        <div className="px-6 pb-6 text-center text-sm text-gray-500">
          <p>By downloading, you agree to our <a href="/terms" className="text-helixaa-blue hover:underline font-medium">Terms</a> and <a href="/privacy" className="text-helixaa-blue hover:underline font-medium">Privacy Policy</a></p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-helixaa-blue/10 blur-xl -z-10"></div>
        <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-helixaa-green/10 blur-xl -z-10"></div>
      </motion.div>
    </div>
  );
};

export default DownloadDialog;