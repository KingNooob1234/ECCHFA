import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal } from 'lucide-react';

// Custom football boot icon (lucide has no boot)
function BootIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Boot upper */}
      <path d="M3 17h14a3 3 0 0 0 3-3V8a2 2 0 0 0-2-2h-3a1 1 0 0 0-1 1v3l-4 1V7a1 1 0 0 0-1-1H6a3 3 0 0 0-3 3v8z" />
      {/* Studs */}
      <path d="M6 20v2M10 20v2M14 20v2M18 20v2" />
      {/* Laces */}
      <path d="M8 9.5l2.5-1M11 11.5l2.5-1" />
    </svg>
  );
}

// Goalkeeper glove icon
function GloveIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Fingers */}
      <path d="M8 12V6.5a1.5 1.5 0 1 1 3 0V12" />
      <path d="M11 12V5a1.5 1.5 0 0 1 3 0v7" />
      <path d="M14 12V6a1.5 1.5 0 0 1 3 0v6a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6v-2a1.5 1.5 0 0 1 3 0v2" />
      {/* Cuff */}
      <path d="M6 16v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}

// Priority: 1 = tournament winner, 2 = golden (boot/glove), 3 = silver (boot/glove), 4 = bronze/runner-up, 5 = 3rd place
const trophyData = {
  'Rami': [
    {
      name: 'Mini World Cup',
      count: 1,
      years: ['2024'],
      color: 'from-[#0066FF] to-[#004BB5]',
      icon: 'trophy',
      priority: 1,
    },
    {
      name: 'MWC Golden Boot',
      count: 1,
      years: ['2024'],
      color: 'from-[#D4AF37] to-[#B8952D]',
      icon: 'boot',
      priority: 2,
    },
    {
      name: 'Friendlies Golden Boot',
      count: 3,
      years: ['2023/24', '2024/25', '2025/26'],
      color: 'from-[#D4AF37] to-[#B8952D]',
      icon: 'boot',
      priority: 2,
    },
    {
      name: 'Friendlies Golden Glove',
      count: 2,
      years: ['2022/23', '2025/26'],
      color: 'from-[#D4AF37] to-[#B8952D]',
      icon: 'glove',
      priority: 2,
    },
    {
      name: 'Friendlies Silver Glove',
      count: 1,
      years: ['2024/25'],
      color: 'from-gray-300 to-gray-500',
      icon: 'glove',
      priority: 3,
    },
  ],
  'Abdulrahman': [
    {
      name: 'MWC Golden Boot',
      count: 1,
      years: ['2024'],
      color: 'from-[#D4AF37] to-[#B8952D]',
      icon: 'boot',
      priority: 2,
    },
    {
      name: 'Mini World Cup Runner-Up',
      count: 1,
      years: ['2024'],
      color: 'from-gray-400 to-gray-600',
      icon: 'medal',
      priority: 4,
    },
    {
      name: 'Friendlies Bronze Boot',
      count: 1,
      years: ['2023/24'],
      color: 'from-amber-600 to-amber-800',
      icon: 'boot',
      priority: 4,
    },
  ],
  'Yousef': [
    {
      name: 'Mini World Cup 3rd Place',
      count: 1,
      years: ['2024'],
      color: 'from-amber-600 to-amber-800',
      icon: 'medal',
      priority: 5,
    },
  ],
  'Boston': [
    {
      name: 'MWC Silver Boot',
      count: 1,
      years: ['2024'],
      color: 'from-gray-300 to-gray-500',
      icon: 'boot',
      priority: 3,
    },
    {
      name: 'Friendlies Bronze Glove',
      count: 1,
      years: ['2022/23'],
      color: 'from-amber-600 to-amber-800',
      icon: 'glove',
      priority: 4,
    },
  ],
  'Younis': [
    {
      name: 'Friendlies Silver Boot',
      count: 2,
      years: ['2023/24', '2024/25'],
      color: 'from-gray-300 to-gray-500',
      icon: 'boot',
      priority: 3,
    },
    {
      name: 'Friendlies Bronze Glove',
      count: 1,
      years: ['2023/24'],
      color: 'from-amber-600 to-amber-800',
      icon: 'glove',
      priority: 4,
    },
  ],
  'Sanad': [
    {
      name: 'Friendlies Golden Glove',
      count: 1,
      years: ['2023/24'],
      color: 'from-[#D4AF37] to-[#B8952D]',
      icon: 'glove',
      priority: 2,
    },
  ],
  'Fahad': [
    {
      name: 'Friendlies Silver Glove',
      count: 1,
      years: ['2023/24'],
      color: 'from-gray-300 to-gray-500',
      icon: 'glove',
      priority: 3,
    },
  ],
  'Ben': [
    {
      name: 'Friendlies Golden Glove',
      count: 1,
      years: ['2024/25'],
      color: 'from-[#D4AF37] to-[#B8952D]',
      icon: 'glove',
      priority: 2,
    },
    {
      name: 'Friendlies Silver Glove',
      count: 1,
      years: ['2025/26'],
      color: 'from-gray-300 to-gray-500',
      icon: 'glove',
      priority: 3,
    },
  ],
  'Yazan': [
    {
      name: 'Friendlies Bronze Glove',
      count: 1,
      years: ['2025/26'],
      color: 'from-amber-600 to-amber-800',
      icon: 'glove',
      priority: 4,
    },
    {
      name: 'Friendlies Bronze Boot',
      count: 1,
      years: ['2025/26'],
      color: 'from-amber-600 to-amber-800',
      icon: 'boot',
      priority: 4,
    },
  ],
  'Jawhar': [
    {
      name: 'Friendlies Silver Boot',
      count: 1,
      years: ['2025/26'],
      color: 'from-gray-300 to-gray-500',
      icon: 'boot',
      priority: 3,
    },
  ],
  'Amir': [
    {
      name: 'Friendlies Bronze Glove',
      count: 1,
      years: ['2024/25'],
      color: 'from-amber-600 to-amber-800',
      icon: 'glove',
      priority: 4,
    },
  ],
  'Omar': [
    {
      name: 'Friendlies Bronze Boot',
      count: 1,
      years: ['2024/25'],
      color: 'from-amber-600 to-amber-800',
      icon: 'boot',
      priority: 4,
    },
  ],
  'Eyad': [
    {
      name: 'Friendlies Bronze Boot',
      count: 1,
      years: ['2022/23'],
      color: 'from-amber-600 to-amber-800',
      icon: 'boot',
      priority: 4,
    },
  ],
};

// Count total trophies for a player (sum of counts)
export function getTrophyCount(playerName) {
  return (trophyData[playerName] || []).reduce((sum, t) => sum + (t.count || 1), 0);
}

export default function TrophyCabinet({ playerName }) {
  const trophies = (trophyData[playerName] || []).slice().sort((a, b) => a.priority - b.priority);

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-[#D4AF37]" />
          Trophy Cabinet
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {trophies.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-white/40 text-sm">No trophies yet</p>
        </div>
      ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trophies.map((trophy, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${trophy.color} flex items-center justify-center mb-3 shadow-lg`}>
                {trophy.icon === 'medal' ? (
                  <Medal className="w-8 h-8 text-white" />
                ) : trophy.icon === 'boot' ? (
                  <BootIcon className="w-8 h-8 text-white" />
                ) : trophy.icon === 'glove' ? (
                  <GloveIcon className="w-8 h-8 text-white" />
                ) : (
                  <Trophy className="w-8 h-8 text-white" />
                )}
              </div>
              <p className="text-slate-900 font-bold text-sm mb-1">{trophy.name}</p>
              {trophy.count > 1 && (
                <p className="text-[#D4AF37] font-black text-lg mb-2">×{trophy.count}</p>
              )}
              <div className="w-full mt-2 pt-3 border-t border-white/10">
                <ul className="space-y-1">
                  {trophy.years.map((year, i) => (
                    <li key={i} className="text-white/60 text-xs flex items-center justify-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                      {year}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      )}
    </div>
  );
}