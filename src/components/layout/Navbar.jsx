import {motion} from 'framer-motion';

export default function Navbar({ isScrolled, activeSection, scrollToSection }) {
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <div className="w-10 h-10 rounded-full bg-helixaa-blue flex items-center justify-center text-white font-bold text-xl mr-2">
            H
          </div>
          <span className="text-xl font-bold text-helixaa-blue">Helixaa<span className="text-helixaa-green">.</span></span>
        </motion.div>

        <div className="hidden md:flex space-x-8">
          {['Home', 'About', 'Services', 'Projects', 'Testimonials', 'Contact'].map((item) => (
            <motion.button
              key={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`font-medium transition-colors ${activeSection === item.toLowerCase() ? 'text-hel极aa-blue' : 'text-gray-600 hover:text-helixaa-blue'}`}
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
          Get Started
        </motion.button>
      </div>
    </nav>
  )
}
