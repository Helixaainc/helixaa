'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

function TestimonialsCard() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CTO, TechInnovate',
      quote:
        'Helixaa transformed our outdated systems into a modern, efficient platform that has significantly improved our workflow.',
      rating: 5,
      imageId: 1,
    },
    {
      name: 'Michael Chen',
      role: 'CEO, GrowthSolutions',
      quote:
        'Their team delivered beyond our expectations. The custom CRM solution has streamlined our sales process dramatically.',
      rating: 5,
      imageId: 2,
    },
    {
      name: 'Emma Rodriguez',
      role: 'Product Manager, FutureTech',
      quote:
        'Working with Helixaa was a game-changer. Their expertise in cloud solutions helped us scale effortlessly.',
      rating: 4,
      imageId: 3,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
              <Image
                src={`https://i.pravatar.cc/150?img=${testimonial.imageId}`}
                alt={testimonial.name}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg">{testimonial.name}</h3>
              <p className="text-gray-600 text-sm">{testimonial.role}</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${
                  i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default TestimonialsCard;
