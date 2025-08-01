'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import React from 'react';
function Hero({ scrollToSection }) {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-transparent"></div>
        <Image
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Technology background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-helixaa-green rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-helixaa-blue rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 mb-10 md:mb-0"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-helixaa-blue">Innovative</span> Software <br />
            <span className="text-helixaa-green">Solutions</span> for <br />
            Your Business
          </h1>
          <p className="text-gray-700 text-lg mb-8 max-w-lg">
            We build cutting-edge software solutions that help businesses grow, innovate, and stay ahead of the competition.
            Our flagship product <span className="font-semibold text-helixaa-green">PayLater</span> revolutionizes mobile payments.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-helixaa-blue text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-helixaa-blue/30 transition-shadow"
              onClick={() => scrollToSection('services')}
            >
              Our Services
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-helixaa-blue text-helixaa-blue px-8 py-3 rounded-full font-medium hover:bg-helixaa-blue/5 transition-colors"
              onClick={() => scrollToSection('contact')}
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 relative flex justify-center"
        >
          <Image
            src="paylaterAppPhoneMockup.svg"
            alt="Hero Image"
            width={500}
            height={500}
            
          />
          
          {/* App description card */}
          {/* <div className="absolute -bottom-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-center mb-2 text-helixaa-blue">PayLater App</h3>
            <p className="text-gray-600 text-center mb-4">
              Our flagship buy-now-pay-later solution for Android
            </p>
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-helixaa-green text-white px-6 py-2 rounded-full font-medium flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35l13.5-6.5c.73-.35 1.59.04 1.92.8.07.17.11.36.11.55v17c0 .59-.34 1.11-.84 1.35l-13.5 6.5c-.73.35-1.59-.04-1.92-.8-.07-.17-.11-.36-.11-.55zm14.5-9.5l-5-2.5v-5l5 2.5v5z"/>
                </svg>
                Download Now
              </motion.button>
            </div>
          </div> */}
          
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-helixaa-green rounded-full opacity-20 blur-xl -z-10"></div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-helixaa-blue rounded-full opacity-20 blur-xl -z-10"></div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;