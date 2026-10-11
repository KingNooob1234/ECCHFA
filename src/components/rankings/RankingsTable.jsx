import React from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function RankingsTable({ teams, isLoading }) {
  // Sort teams by points, then goal difference
  const sortedTeams = [...teams].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const gdA = (a.goals_for || 0) - (a.goals_against || 0);
    const gdB = (b.goals_for || 0) - (b.goals_against || 0);
    return gdB - gdA;
  });

  const getPositionStyle = (position) => {
    if (position === 1) return 'bg-gradient-to-r from-[#D4AF37]/20 to-transparent border-l-4 border-[#D4AF37]';
    if (position === 2) return 'bg-gradient-to-r from-[#C0C0C0]/10 to-transparent border-l-4 border-[#C0C0C0]';
    if (position === 3) return 'bg-gradient-to-r from-[#CD7F32]/10 to-transparent border-l-4 border-[#CD7F32]';
    return 'border-l-4 border-transparent';
  };

  const getPositionBadge = (position) => {
    if (position <= 3) {
      const colors = {
        1: 'from-[#D4AF37] to-[#F0D060]',
        2: 'from-[#C0C0C0] to-[#E0E0E0]',
        3: 'from-[#CD7F32] to-[#E0965A]'
      };
      return (
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colors[position]} flex items-center justify-center text-sm font-bold text-[#18181b]`}>
          {position}
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm font-medium text-white/60">
        {position}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="text-center py-20">
        <Shield className="w-16 h-16 text-white/20 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-100 mb-2">No Teams Yet</h3>
        <p className="text-white/50">Team data will appear here once added</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
      {/* Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-white/5 text-xs font-medium text-white/50 uppercase tracking-wider">
        <div className="col-span-1">#</div>
        <div className="col-span-4 sm:col-span-3">Team</div>
        <div className="hidden sm:block col-span-1 text-center">P</div>
        <div className="hidden sm:block col-span-1 text-center">W</div>
        <div className="hidden sm:block col-span-1 text-center">D</div>
        <div className="hidden sm:block col-span-1 text-center">L</div>
        <div className="hidden md:block col-span-1 text-center">GF</div>
        <div className="hidden md:block col-span-1 text-center">GA</div>
        <div className="col-span-3 sm:col-span-1 text-center">GD</div>
        <div className="col-span-4 sm:col-span-1 text-center">PTS</div>
      </div>

      {/* Teams */}
      <div className="divide-y divide-white/5">
        {sortedTeams.map((team, index) => {
          const position = index + 1;
          const gd = (team.goals_for || 0) - (team.goals_against || 0);
          
          return (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`grid grid-cols-12 gap-4 px-6 py-4 hover:bg-white/5 transition-colors ${getPositionStyle(position)}`}
            >
              <div className="col-span-1 flex items-center">
                {getPositionBadge(position)}
              </div>
              <div className="col-span-4 sm:col-span-3 flex items-center gap-3">
                {team.logo_url ? (
                  <img src={team.logo_url} alt={team.name} className="w-8 h-8 rounded-lg object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#16a34a] to-[#15803d] flex items-center justify-center text-xs font-bold">
                    {team.name?.charAt(0)}
                  </div>
                )}
                <span className="font-medium text-slate-100 truncate">{team.name}</span>
              </div>
              <div className="hidden sm:flex col-span-1 items-center justify-center text-white/70">{team.played || 0}</div>
              <div className="hidden sm:flex col-span-1 items-center justify-center text-green-400">{team.won || 0}</div>
              <div className="hidden sm:flex col-span-1 items-center justify-center text-white/50">{team.drawn || 0}</div>
              <div className="hidden sm:flex col-span-1 items-center justify-center text-red-400">{team.lost || 0}</div>
              <div className="hidden md:flex col-span-1 items-center justify-center text-white/70">{team.goals_for || 0}</div>
              <div className="hidden md:flex col-span-1 items-center justify-center text-white/70">{team.goals_against || 0}</div>
              <div className="col-span-3 sm:col-span-1 flex items-center justify-center gap-1">
                {gd > 0 && <TrendingUp className="w-3 h-3 text-green-400" />}
                {gd < 0 && <TrendingDown className="w-3 h-3 text-red-400" />}
                {gd === 0 && <Minus className="w-3 h-3 text-white/30" />}
                <span className={gd > 0 ? 'text-green-400' : gd < 0 ? 'text-red-400' : 'text-white/50'}>
                  {gd > 0 ? '+' : ''}{gd}
                </span>
              </div>
              <div className="col-span-4 sm:col-span-1 flex items-center justify-center">
                <span className="px-3 py-1 rounded-lg bg-[#16a34a]/20 text-[#16a34a] font-bold">
                  {team.points || 0}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
