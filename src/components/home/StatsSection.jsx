import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const ALL_PLAYERS = [
  { name: 'Mahmoud', nationality: '🇪🇬', goals: 9, yellow_cards: 1, potms: 1, teamColor: 'from-[#8B5CF6] to-[#6D28D9]' },
  { name: 'Mazen', nationality: '🇺🇸', goals: 7, yellow_cards: 0, potms: 0, teamColor: 'from-[#D4AF37] to-[#B8952D]' },
  { name: 'Omar', nationality: '🇱🇧', goals: 4, yellow_cards: 0, potms: 0, teamColor: 'from-[#8B5CF6] to-[#6D28D9]' },
  { name: 'Rami', nationality: '🇪🇸', goals: 3, yellow_cards: 0, potms: 1, teamColor: 'from-[#16a34a] to-[#15803d]' },
  { name: 'Muhammad', nationality: '🇾🇪', goals: 1, yellow_cards: 0, potms: 0, teamColor: 'from-[#16a34a] to-[#15803d]' },
  { name: 'Elyes', nationality: '🇹🇳', goals: 1, yellow_cards: 0, potms: 0, teamColor: 'from-[#16a34a] to-[#15803d]' },
  { name: 'Ben', nationality: '🇧🇷', goals: 1, yellow_cards: 0, potms: 0, teamColor: 'from-[#D4AF37] to-[#B8952D]' },
  { name: "Mo'min", nationality: '🇪🇬', goals: 0, yellow_cards: 1, potms: 0, teamColor: 'from-[#8B5CF6] to-[#6D28D9]' },
];

const sortBy = (arr, key) => [...arr].sort((a, b) => (b[key] || 0) - (a[key] || 0));

function GoldenBootIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 17h14a3 3 0 0 0 3-3V8a2 2 0 0 0-2-2h-3a1 1 0 0 0-1 1v3l-4 1V7a1 1 0 0 0-1-1H6a3 3 0 0 0-3 3v8z" />
      <path d="M6 20v2M10 20v2M14 20v2M18 20v2" />
      <path d="M8 9.5l2.5-1M11 11.5l2.5-1" />
    </svg>
  );
}

export default function StatsSection() {
  const columns = [
    {
      title: 'Top Scorer',
      data: sortBy(ALL_PLAYERS, 'goals'),
      valueKey: 'goals',
      icon: <GoldenBootIcon className="w-5 h-5 mx-auto mb-1.5 text-[#D4AF37]" />,
      accent: 'text-[#D4AF37]',
    },
    {
      title: 'Most Yellow Cards',
      data: sortBy(ALL_PLAYERS, 'yellow_cards'),
      valueKey: 'yellow_cards',
      icon: <div className="w-3 h-5 rounded-sm bg-yellow-400 mx-auto mb-1.5" />,
      accent: 'text-yellow-400',
    },
    {
      title: 'Most POTMs',
      data: sortBy(ALL_PLAYERS, 'potms'),
      valueKey: 'potms',
      icon: <Star className="w-5 h-5 mx-auto mb-1.5 text-[#0066FF]" />,
      accent: 'text-[#0066FF]',
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <h2 className="text-xl font-bold text-slate-900 mb-1">Season Stats</h2>
        <p className="text-[14px] text-white/50">Top performers across key metrics</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl bg-white/5 border border-white/10 overflow-x-auto"
      >
        <div className="min-w-[520px]">
        {/* Header row */}
        <div className="grid grid-cols-3 border-b border-white/10 bg-white/5">
          {columns.map((col) => (
            <div key={col.title} className="px-3 sm:px-5 py-4 text-center border-r border-white/10 last:border-r-0">
              {col.icon}
              <span className="text-[13px] sm:text-sm font-bold text-white/80">{col.title}</span>
            </div>
          ))}
        </div>

        {/* 5 data rows */}
        {[0, 1, 2, 3, 4].map((rowIdx) => (
          <div
            key={rowIdx}
            className={`grid grid-cols-3 ${rowIdx < 4 ? 'border-b border-white/5' : ''}`}
          >
            {columns.map((col) => {
              const player = col.data[rowIdx];
              return (
                <div
                  key={col.title}
                  className="px-3 sm:px-5 py-3 border-r border-white/5 last:border-r-0 flex items-center gap-2"
                >
                  <span className="text-white/30 text-xs font-bold w-4 shrink-0">{rowIdx + 1}</span>
                  {player ? (
                    <>
                      <div className={`w-1 h-5 rounded-full bg-gradient-to-b ${player.teamColor} shrink-0`} />
                      <span className="text-base shrink-0">{player.nationality || '🌍'}</span>
                      <span className="text-slate-900 text-[13px] sm:text-sm font-medium truncate flex-1">{player.name}</span>
                      <span className={`text-sm font-bold shrink-0 ${col.accent}`}>{player[col.valueKey] || 0}</span>
                    </>
                  ) : (
                    <span className="text-white/20 text-sm flex-1">—</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        </div>
      </motion.div>
    </div>
  );
}