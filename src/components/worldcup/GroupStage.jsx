import React from 'react';
import { motion } from 'framer-motion';

export default function GroupStage({ data, matches, showQualified = false, qualifiedPlayers: qualifiedPlayersProp }) {
  // Determine number of groups based on data
  const maxGroup = Math.max(...data.map(p => p.group));
  const groups = Array.from({ length: maxGroup }, (_, i) => i + 1);
  const groupLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
  const qualifiedPlayers = showQualified ? (qualifiedPlayersProp || [
    'Boston', 'Rami', 'Zein', 'Sanad', 'Muhammad', 'Bissan', 'Maryam', 
    'Eleen', 'Abdulrahman', 'Ahmad', 'Walid', 'Yousef', 'Armaan', 
    'Elyes', 'Nuh', 'Sheese'
  ]) : [];

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-100 mb-6">Group Stage</h2>
      
      {showQualified && (
        <div className="mb-6 flex items-center gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#16a34a] rounded" />
            <span className="text-white/80">Qualified for next round</span>
          </div>
        </div>
      )}
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((groupNum) => {
          const groupPlayers = data
            .filter(p => p.group === groupNum)
            .map(p => ({
              ...p,
              gd: p.goals - p.concede,
              pts: p.pts !== undefined ? p.pts : (p.goals - p.concede),
            }))
            .sort((a, b) => b.pts - a.pts);
          const groupMatches = matches.filter(m => m.group === groupNum);
          
          return (
            <motion.div
              key={groupNum}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupNum * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <h3 className="text-lg font-bold text-slate-100 mb-4">Group {groupLabels[groupNum - 1]}</h3>
              
              {/* Table */}
              <div className="mb-4">
                <div className="grid grid-cols-6 gap-2 px-3 py-2 bg-white/5 rounded-lg text-xs font-medium text-white/50 uppercase mb-2">
                  <div className="col-span-1">#</div>
                  <div className="col-span-2">Player</div>
                  <div className="text-center">GF</div>
                  <div className="text-center">GA</div>
                  <div className="text-center">PTS</div>
                </div>
                <div className="space-y-1">
                  {groupPlayers.map((player, idx) => {
                    const isQualified = qualifiedPlayers.includes(player.name);
                    const pts = player.pts !== undefined ? player.pts : player.gd;
                    return (
                      <div key={idx} className="relative grid grid-cols-6 gap-2 px-3 py-2 rounded-lg hover:bg-white/5 text-sm">
                        {isQualified && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#16a34a] rounded-l-lg" />
                        )}
                        <div className="text-white/60 font-bold">{idx + 1}</div>
                        <div className="col-span-2 flex items-center gap-1">
                          <span className="text-lg">{player.country}</span>
                          <span className="text-white/80 truncate">{player.name}</span>
                        </div>
                        <div className="text-center text-white/80">{player.goals}</div>
                        <div className="text-center text-white/80">{player.concede}</div>
                        <div className={`text-center font-bold ${
                          pts > 0 ? 'text-green-400' : 
                          pts < 0 ? 'text-red-400' : 'text-white/40'
                        }`}>
                          {pts > 0 ? '+' : ''}{pts}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Matches */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                {groupMatches.map((match, idx) => (
                  <div key={idx} className="text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">{match.team1}</span>
                      <span className="text-slate-100 font-bold px-2">{match.score1} - {match.score2}</span>
                      <span className="text-white/60">{match.team2}</span>
                    </div>
                    {match.note && (
                      <div className="text-xs text-[#D4AF37] mt-1 italic">{match.note}</div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}