import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Star, Zap } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Fair Play',
    description: 'We uphold the highest standards of sportsmanship and integrity in all our matches.'
  },
  {
    icon: Star,
    title: 'Excellence',
    description: 'Striving for excellence on and off the pitch, developing skills and character.'
  },
  {
    icon: Zap,
    title: 'Community',
    description: 'Building strong bonds within Education City through the beautiful game.'
  }
];

export default function FeaturedSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0a0e1a] to-[#1a1f36]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Our Values
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            The principles that guide ECCHFA in everything we do
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="relative inline-flex mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF] to-[#D4AF37] rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="relative p-5 rounded-2xl bg-gradient-to-br from-[#1a1f36] to-[#252b45] border border-white/10">
                  <feature.icon className="w-8 h-8 text-[#D4AF37]" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
