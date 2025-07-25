import Image from "next/image"
import { motion } from "framer-motion";

function About({scrollToSection}) {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-white to-helixaa-green/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-helixaa-blue">About Helixaa</h2>
            <div className="w-20 h-1 bg-helixaa-green mx-auto mb极6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are a team of passionate developers, designers, and innovators committed to creating exceptional software solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-helixaa-blue to-helixaa-green p-1 rounded-2xl">
                <div className="bg-white rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4">Our Mission</h3>
                  <p className="text-gray-600 mb-4">
                    To empower businesses with innovative software solutions that drive growth, efficiency, and competitive advantage.
                  </p>
                  <div className="flex items-center mt-8">
                    <div className="flex -space-x-4 mr-4">
                      <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" alt="Team member" width={48} height={48} className="w-12 h-12 rounded-full border-2 border-white" />
                      <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" alt="Team member" width={48} height={48} className="w-12 h-12 rounded-full border-2 border-white" />
                      <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" alt="Team member" width={48} height={48} className="w-12 h-12 rounded-full border-2 border-white" />
                      <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                        <span className="font-bold text-[#3D90D7]">50+</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold">50+ Professionals</p>
                      <p className="text-sm text-gray-600">Dedicated team members</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { title: '2018', subtitle: 'Founded' },
                { title: '150+', subtitle: 'Projects' },
                { title: '50+', subtitle: 'Clients' },
                { title: '12+', subtitle: 'Awards' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
                >
                  <h3 className="text-3xl font-bold text-helixaa-blue mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.subtitle}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
  )
}

export default About