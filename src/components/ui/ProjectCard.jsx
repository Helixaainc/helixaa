import Image from 'next/image';
import { motion } from 'framer-motion';

function ProjectCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "E-Commerce Platform",
                    description: "A scalable e-commerce solution with real-time inventory management.",
                    technologies: ['React', 'Node.js', 'MongoDB'],
                    imageId: 1
                  },
                  {
                    title: "Healthcare Portal",
                    description: "Patient management system with appointment scheduling and telemedicine.",
                    technologies: ['Angular', 'Firebase', 'Stripe'],
                    imageId: 2
                  },
                  {
                    title: "Fintech Dashboard",
                    description: "Real-time financial analytics dashboard for investment firms.",
                    technologies: ['React', 'D3.js', 'Express'],
                    imageId: 3
                  },
                  {
                    title: "Fitness Tracker",
                    description: "Mobile app for tracking workouts, nutrition, and health metrics.",
                    technologies: ['React Native', 'GraphQL', 'PostgreSQL'],
                    imageId: 4
                  },
                  {
                    title: "Supply Chain System",
                    description: "Logistics management platform with route optimization.",
                    technologies: ['Vue.js', 'Node.js', 'MongoDB'],
                    imageId: 5
                  },
                  {
                    title: "Education Platform",
                    description: "Online learning management system with interactive courses.",
                    technologies: ['Next.js', 'Strapi', 'PostgreSQL'],
                    imageId: 6
                  }
                ].map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg"
                  >
                    {/* Project image with overlay */}
                    <div className="relative h-48">
                      <div className="absolute inset-0 bg-gradient-to-t from-helixaa-blue/70 to-helixaa-green/30 z-10"></div>
                      <Image
                        src={`https://picsum.photos/seed/${project.title}/600/400`}
                        alt={project.title}
                        layout="fill"
                        objectFit="cover"
                        className="object-cover"
                      />
                      <div className="absolute bottom-4 left-4 z-20">
                        <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      </div>
                    </div>
    
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <span key={idx} className="text-xs bg-helixaa-green/20 text-helixaa-blue px-3 py-1 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
  )
}

export default ProjectCard