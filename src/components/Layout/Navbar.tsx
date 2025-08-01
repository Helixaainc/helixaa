'use client';
import {motion} from 'framer-motion';

export default function Navbar({ isScrolled, activeSection, scrollToSection }) {
  return (

    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${isScrolled ? 'pt-3' : ''}`}>
    <nav className={`
    transition-all duration-300 
    ${isScrolled 
      ? 'bg-white/10 backdrop-blur-lg shadow-lg py-2 w-[90%] rounded-xl'
      : 'bg-white py-4 w-full'
    }
  `}>
      <div className="container mx-auto px-4 flex justify-between items-center ">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <div className="w-10 h-10 rounded-full bg-helixaa-blue flex items-center justify-center text-white font-bold text-xl mr-2  ">
            H
          </div>
          <span className="text-xl font-bold text-helixaa-blue">Helixaa<span className="text-helixaa-green">.</span></span>
        </motion.div>

        <div className="hidden md:flex space-x-8 ">
          {['Home','PayLater', 'About', 'Services', 'Testimonials', 'Contact'].map((item) => (
            <motion.button
              key={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`font-medium transition-colors cursor-pointer ${activeSection === item.toLowerCase() ? 'text-helixaa-blue' : 'text-gray-600 hover:text-helixaa-green'}`}
              onClick={() => scrollToSection(item.toLowerCase())}
            >
              {item}
            </motion.button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-helixaa-blue text-white px-6 py-2 rounded-full font-medium"
        >
          Download Paylater
        </motion.button>
      </div>
    </nav></div>
  )
}
