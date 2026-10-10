import React from 'react';
import { motion } from 'framer-motion';
import { Target, User } from 'lucide-react';

export default function TopScorers({ players }) {
  const topScorers = [...players]
    .filter(p => p.goals > 0)
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 5);

  if (topScorers.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 rounded-2xl bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-[#D4AF37]/20">
          <Target className="w-5 h-5 text-[#D4AF37]" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Top Scorers</h3>
      </div>

      <div className="space-y-4">
        {topScorers.map((player, index) => (
          <div key={player.id} className="flex items-center gap-4">
            <div className={`w-6 text-center font-bold ${index === 0 ? 'text-[#D4AF37]' : 'text-slate-900/40'}`}>
              {index + 1}
            </div>
            {player.photo_url ? (
              <img 
                src={player.photo_url} 
                alt={player.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <User className="w-5 h-5 text-slate-900/30" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-slate-900 truncate">{player.name}</div>
              <div className="text-xs text-slate-900/40">{player.team}</div>
            </div>
            <div className="text-xl font-bold text-[#D4AF37]">{player.goals}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}