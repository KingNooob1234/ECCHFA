import React from 'react';
import { motion } from 'framer-motion';

export default function KnockoutStage({ data }) {
  // Helper to determine winner of a match
  const getWinner = (match) => {
    if (match.penalties) {
      // Check penalties result
      const penaltiesMatch = match.penalties.match(/\((\d+)\)-\((\d+)\)/);
      if (penaltiesMatch) {
        return parseInt(penaltiesMatch[1]) > parseInt(penaltiesMatch[2]) ? match.team1 : match.team2;
      }
    }
    return match.score1 > match.score2 ? match.team1 : match.team2;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-100 mb-6">Knockout Stage</h2>
      
      <div className="space-y-8">
        {/* Round of 16 */}
        <div>
          <h3 className="text-xl font-bold text-slate-100 mb-4">Round of 16</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {data.roundOf16.map((match, idx) => {
              const winner = getWinner(match);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="relative p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="relative flex items-center">
                      {winner === match.team1 && (
                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#16a34a] rounded" />
                      )}
                      <span className="text-white/80">{match.team1}</span>
                    </div>
                    <span className="text-slate-100 font-bold px-3">
                      {match.score1} - {match.score2}
                      {match.penalties && <span className="text-xs ml-1">{match.penalties}</span>}
                    </span>
                    <div className="relative flex items-center">
                      {winner === match.team2 && (
                        <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#16a34a] rounded" />
                      )}
                      <span className="text-white/80">{match.team2}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quarter Finals */}
        <div>
          <h3 className="text-xl font-bold text-slate-100 mb-4">Quarter Finals</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {data.quarterFinals.map((match, idx) => {
              const winner = getWinner(match);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="relative p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="relative flex items-center">
                      {winner === match.team1 && (
                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#16a34a] rounded" />
                      )}
                      <span className="text-white/80">{match.team1}</span>
                    </div>
                    <span className="text-slate-100 font-bold px-3">{match.score1} - {match.score2}</span>
                    <div className="relative flex items-center">
                      {winner === match.team2 && (
                        <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#16a34a] rounded" />
                      )}
                      <span className="text-white/80">{match.team2}</span>
                    </div>
                  </div>
                  {match.redCard && (
                    <div className="text-xs text-red-400 mt-2">{match.redCard}</div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Semi Finals */}
        <div>
          <h3 className="text-xl font-bold text-slate-100 mb-4">Semi Finals</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {data.semiFinals.map((match, idx) => {
              const winner = match.score1 !== undefined ? getWinner(match) : null;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="relative p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="relative flex items-center">
                      {winner === match.team1 && (
                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#16a34a] rounded" />
                      )}
                      <span className="text-white/80">{match.team1}</span>
                    </div>
                    {match.score1 !== undefined ? (
                      <span className="text-slate-100 font-bold px-3">{match.score1} - {match.score2}</span>
                    ) : (
                      <span className="text-[#D4AF37] text-sm px-3">{match.note}</span>
                    )}
                    <div className="relative flex items-center">
                      {winner === match.team2 && (
                        <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#16a34a] rounded" />
                      )}
                      <span className="text-white/80">{match.team2}</span>
                    </div>
                  </div>
                  {match.redCard && (
                    <div className="text-xs text-red-400 mt-2">{match.redCard}</div>
                  )}
                  {match.note && match.score1 !== undefined && (
                    <div className="text-xs text-[#D4AF37] mt-2 italic">{match.note}</div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Final */}
        <div>
          <h3 className="text-xl font-bold text-slate-100 mb-4">Final</h3>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-transparent border-2 border-[#D4AF37]"
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-100 text-lg font-bold">{data.final.team1}</span>
              <span className="text-slate-100 text-2xl font-black px-4">
                {data.final.score1} - {data.final.score2}
              </span>
              <span className="text-slate-100 text-lg font-bold">{data.final.team2}</span>
            </div>
            <div className="text-center mt-4">
              <span className="text-[#D4AF37] text-sm font-medium">🏆 Champion: Rami 🇱🇧</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}