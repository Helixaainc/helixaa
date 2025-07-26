import Image from 'next/image'
import { motion } from 'framer-motion'

function Hero({scrollToSection}) {
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
            className="md:w-1/2 relative"
          >
            <div className="relative bg-gradient-to-br from-helixaa-blue to-helixaa-green p-1 rounded-3xl shadow-2xl">
              <div className="bg-white rounded-3xl p-8">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-helixaa-blue flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-4">Custom Software Development</h3>
                <p className="text-gray-600 text-center">
                  Tailored solutions that perfectly fit your business needs and processes.
                </p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-helixaa-green rounded-full opacity-20 blur-xl -z-10"></div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-helixaa-blue rounded-full opacity-20 blur-xl -z-10"></div>
          </motion.div>
        </div>
      </section>
  )
}

export default Hero