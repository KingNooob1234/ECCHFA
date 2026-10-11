import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp } from 'lucide-react';

export default function StatsBoard({ pointsBoard, topScorers }) {
  return (
    <div className="space-y-8">
      {/* Points Board */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-[#16a34a]" />
          <h2 className="text-2xl font-bold text-slate-100">Points Board</h2>
        </div>
        
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="grid grid-cols-4 gap-4 px-6 py-4 bg-white/5 text-xs font-medium text-white/50 uppercase">
            <div>Player</div>
            <div className="text-center">Goals</div>
            <div className="text-center">Conceded</div>
            <div className="text-center">Points</div>
          </div>
          <div className="divide-y divide-white/5">
            {pointsBoard.map((player, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.02 }}
                className="grid grid-cols-4 gap-4 px-6 py-3 hover:bg-white/5"
              >
                <div className="flex items-center gap-2 text-slate-100">
                  <span className="text-xl">{player.country}</span>
                  <span className="font-medium">{player.name}</span>
                </div>
                <div className="text-center text-white/80">{player.goals}</div>
                <div className="text-center text-white/80">{player.concede}</div>
                <div className={`text-center font-bold ${
                  player.points > 0 ? 'text-green-400' : 
                  player.points < 0 ? 'text-red-400' : 'text-white/40'
                }`}>
                  {player.points > 0 ? '+' : ''}{player.points}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Scorers */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-6 h-6 text-[#D4AF37]" />
          <h2 className="text-2xl font-bold text-slate-100">Top Goal Scorers</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topScorers.slice(0, 8).map((player, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-4 rounded-xl border ${
                idx === 0 ? 'bg-gradient-to-br from-[#D4AF37]/20 to-transparent border-[#D4AF37]' :
                idx === 1 ? 'bg-gradient-to-br from-[#C0C0C0]/10 to-transparent border-[#C0C0C0]/30' :
                idx === 2 ? 'bg-gradient-to-br from-[#CD7F32]/10 to-transparent border-[#CD7F32]/30' :
                'bg-white/5 border-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{player.country}</span>
                  <span className="text-slate-100 font-medium">{player.name}</span>
                </div>
                <div className={`text-2xl font-black ${
                  idx === 0 ? 'text-[#D4AF37]' : 
                  idx === 1 ? 'text-[#C0C0C0]' : 
                  idx === 2 ? 'text-[#CD7F32]' : 'text-white/60'
                }`}>
                  {player.goals}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}