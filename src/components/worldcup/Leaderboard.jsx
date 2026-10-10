import React from 'react';
import { motion } from 'framer-motion';

export default function Leaderboard({ data }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-3">Final Standings</h2>
      
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="divide-y divide-white/5">
          {data.map((player, index) => (
            <motion.div
              key={player.position}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02 }}
              className={`flex items-center justify-between px-4 py-2 hover:bg-white/5 transition-colors ${
                player.position <= 3 ? 'bg-gradient-to-r from-[#D4AF37]/10 to-transparent' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm ${
                  player.position === 1 ? 'bg-gradient-to-br from-[#D4AF37] to-[#F0D060] text-[#0a0e1a]' :
                  player.position === 2 ? 'bg-gradient-to-br from-[#C0C0C0] to-[#E0E0E0] text-[#0a0e1a]' :
                  player.position === 3 ? 'bg-gradient-to-br from-[#CD7F32] to-[#E0965A] text-[#0a0e1a]' :
                  'bg-white/5 text-white/60'
                }`}>
                  {player.position}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base">{player.country}</span>
                    <span className="text-slate-900 font-semibold text-sm">{player.name}</span>
                    {player.medal && <span className="text-base ml-1">{player.medal}</span>}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}