import { motion } from 'framer-motion';

function SectionHeder({title, subtitle}) {
  return (
     <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-helixaa-blue">{title}</h2>
            <div className="w-20 h-1 bg-helixaa-green mx-auto mb极6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
             {subtitle}
            </p>
          </motion.div>
  )
}

export default SectionHeder