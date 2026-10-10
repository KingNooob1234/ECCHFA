import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';

const links = [
  {
    title: 'Player Rankings',
    description: 'Check the latest player rankings and ratings',
    icon: Trophy,
    page: 'Rankings',
    gradient: 'from-[#0066FF] to-[#0044CC]',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80'
  },
  {
    title: 'Player Statistics',
    description: 'Explore detailed stats for all registered players',
    icon: Users,
    page: 'Players',
    gradient: 'from-[#D4AF37] to-[#B8952D]',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80'
  }
];

export default function QuickLinks() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Quick Access
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Navigate to the most important sections of our football association
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {links.map((link, index) => (
            <motion.div
              key={link.page}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={createPageUrl(link.page)}
                className="group relative block h-64 rounded-3xl overflow-hidden"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${link.image})` }}
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-80`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="inline-flex p-3 rounded-xl bg-white/20 backdrop-blur-sm mb-4">
                        <link.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {link.title}
                      </h3>
                      <p className="text-white/80 text-sm max-w-xs">
                        {link.description}
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                      <ArrowUpRight className="w-5 h-5 text-white transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
