'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import Testimonials from '@/components/sections/Testimonials';
import Contacts from '@/components/sections/Contacts';
import Footer from '@/components/layout/Footer';
import PayLaterSection from '@/components/sections/PayLaterSection';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home','paylater', 'about', 'services', 'testimonials', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-helixaa-blue font-sans">
      {/* Navigation Bar */}
      <Navbar isScrolled={isScrolled} activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* Hero Section */}
      <Hero scrollToSection={scrollToSection} />

      {/* PayLater Section */}
      <PayLaterSection/>

      {/* About Section */}
      <About scrollToSection={scrollToSection} />
      

      {/* Services Section */}
      <Services scrollToSection={scrollToSection} />

      {/* Projects Section */}
      {/* <Projects scrollToSection={scrollToSection} /> */}

      {/* Testimonials Section */}
      <Testimonials scrollToSection={scrollToSection} />

      {/* Contact Section */}
      <Contacts scrollToSection={scrollToSection} />

      {/* Footer */}
      <Footer />
    </div>
  );
}