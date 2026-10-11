import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, User, ArrowUp, ArrowDown } from 'lucide-react';

// Manual rank positions (overrides rating-based sort)
const MANUAL_RANK = {
  'Rami': 2,
  'Miles': 3,
  'Sami': 4,
  'Mazen': 5,
  'Abdurahman': 6,
  'Boston': 8,
  'Mahmoud': 9,
  'Malek': 10,
  'Yazan': 14,
  'Ben': 15,
  'Calel': 16,
  'Yousef': 17,
  'Ahmed': 18,
  'Jawhar': 19,
  'Muhammad': 20,
  'Abdulrahman': 21,
  'Brandon': 22,
  'Zein': 25,
  'Walid': 26,
  'Amir': 28,
};

// Rank change indicators: positive = moved up, negative = moved down
const RANK_CHANGES = {
  'Rami': +2,
  'Miles': +2,
  'Sami': +2,
  'Mazen': -3,
  'Abdurahman': -3,
  'Boston': +3,
  'Mahmoud': +2,
  'Malek': +1,
  'Mohamede': -3,
  'Younis': -2,
  'Eyad': -1,
  'Ben': -1,
  'Yazan': +1,
  'Calel': +2,
  'Abdulrahman': -4,
  'Jawhar': -3,
  'Yousef': +2,
  'Ahmed': +2,
  'Muhammad': +1,
  'Brandon': -1,
  'Amir': -1,
};

function RankChangeBadge({ change }) {
  if (!change) return null;
  const isUp = change > 0;
  return (
    <div className={`flex items-center gap-0.5 text-xs font-bold ml-1 ${isUp ? 'text-green-400' : 'text-red-400'}`}>
      {isUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
      <span>{Math.abs(change)}</span>
    </div>
  );
}

const getRatingColor = (rating) => {
  if (rating >= 90) return 'from-purple-500 to-purple-600'; // Purple - Elite
  if (rating >= 85) return 'from-red-500 to-red-600'; // Red - Epic
  if (rating >= 80) return 'from-green-500 to-green-600'; // Green - Amazing
  if (rating >= 76) return 'from-blue-500 to-blue-600'; // Blue - Great
  if (rating >= 71) return 'from-yellow-500 to-yellow-600'; // Yellow - Good
  if (rating >= 65) return 'from-gray-500 to-gray-600'; // Grey - Decent
  return 'from-amber-700 to-amber-800'; // Bronze - Bad
};

const getRatingBadgeStyle = (rating) => {
  if (rating >= 90) return 'bg-gradient-to-br from-purple-500 to-purple-600 text-white';
  if (rating >= 85) return 'bg-gradient-to-br from-red-500 to-red-600 text-white';
  if (rating >= 80) return 'bg-gradient-to-br from-green-500 to-green-600 text-white';
  if (rating >= 76) return 'bg-gradient-to-br from-blue-500 to-blue-600 text-white';
  if (rating >= 71) return 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white';
  if (rating >= 65) return 'bg-gradient-to-br from-gray-500 to-gray-600 text-white';
  return 'bg-gradient-to-br from-amber-700 to-amber-800 text-white';
};

const getPositionBadge = (position) => {
  if (position === 1) {
    return (
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#F0D060] flex items-center justify-center shadow-lg shadow-[#D4AF37]/50 text-xl font-black text-[#18181b]">
        1
      </div>
    );
  }
  if (position === 2) {
    return (
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C0C0C0] to-[#E0E0E0] flex items-center justify-center shadow-lg text-xl font-black text-[#18181b]">
        2
      </div>
    );
  }
  if (position === 3) {
    return (
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#CD7F32] to-[#E0965A] flex items-center justify-center shadow-lg text-xl font-black text-[#18181b]">
        3
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg font-bold text-white/60">
      {position}
    </div>
  );
};

const getPositionStyle = (position) => {
  if (position === 1) return 'bg-gradient-to-r from-[#D4AF37]/20 to-transparent border-l-4 border-[#D4AF37]';
  if (position === 2) return 'bg-gradient-to-r from-[#C0C0C0]/10 to-transparent border-l-4 border-[#C0C0C0]';
  if (position === 3) return 'bg-gradient-to-r from-[#CD7F32]/10 to-transparent border-l-4 border-[#CD7F32]';
  return 'border-l-4 border-transparent';
};

export default function PlayerRankingsTable({ players, isLoading }) {
  // Sort players: merge manual-ranked with rating-sorted unranked
  const manualRanked = {};
  Object.entries(MANUAL_RANK).forEach(([name, rank]) => {
    const p = players.find(pl => pl.name === name);
    if (p) manualRanked[rank] = p;
  });
  const unranked = [...players]
    .filter(p => MANUAL_RANK[p.name] === undefined)
    .sort((a, b) => (b.overall_rating || 0) - (a.overall_rating || 0));
  const totalSlots = Math.max(players.length, Math.max(...Object.values(MANUAL_RANK)));
  const sortedPlayers = [];
  let unrankedIdx = 0;
  for (let i = 1; i <= totalSlots; i++) {
    if (manualRanked[i]) {
      sortedPlayers.push(manualRanked[i]);
    } else if (unrankedIdx < unranked.length) {
      sortedPlayers.push(unranked[unrankedIdx++]);
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div className="text-center py-20">
        <User className="w-16 h-16 text-white/20 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-100 mb-2">No Players Ranked Yet</h3>
        <p className="text-white/50">Player rankings will appear here once added</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
      {/* Header */}
      <div className="grid grid-cols-12 gap-2 sm:gap-4 px-4 sm:px-6 py-4 bg-white/5 text-xs font-medium text-white/50 uppercase tracking-wider">
        <div className="col-span-2 sm:col-span-1">#</div>
        <div className="col-span-7 sm:col-span-5">Player</div>
        <div className="hidden sm:block col-span-3 text-center">Country</div>
        <div className="col-span-1 sm:col-span-2 text-center">Team</div>
        <div className="col-span-2 sm:col-span-1 text-center">Rating</div>
      </div>

      {/* Players */}
      <div className="divide-y divide-white/5">
        {sortedPlayers.map((player, index) => {
          const position = index + 1;
          const rating = player.overall_rating || 0;
          
          return (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              className={`grid grid-cols-12 gap-2 sm:gap-4 px-4 sm:px-6 py-5 hover:bg-white/5 transition-all duration-300 ${getPositionStyle(position)}`}
            >
              {/* Rank */}
              <div className="col-span-2 sm:col-span-1 flex items-center">
                {getPositionBadge(position)}
              </div>

              {/* Player Info */}
              <div className="col-span-7 sm:col-span-5 flex items-center gap-2 sm:gap-3 min-w-0">
                {player.photo_url ? (
                  <img 
                    src={player.photo_url} 
                    alt={player.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border-2 border-white/10 shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#16a34a] to-[#15803d] flex items-center justify-center border-2 border-white/10 shrink-0">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 min-w-0">
                    <div className="font-bold text-slate-100 text-base sm:text-lg truncate min-w-0">{player.name}</div>
                    <RankChangeBadge change={RANK_CHANGES[player.name]} />
                  </div>
                  {player.position && (
                    <div className="text-xs text-white/40">
                      {player.position.includes('/') ? player.position.split('/')[1] : player.position}
                    </div>
                  )}
                </div>
              </div>

              {/* Country */}
              <div className="hidden sm:flex col-span-3 items-center justify-center">
                <div className="text-2xl">{player.nationality || '🌍'}</div>
              </div>

              {/* Team */}
              <div className="col-span-1 sm:col-span-2 flex items-center justify-center">
                {player.team_color === 'red' && (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/50" />
                    <span className="hidden sm:inline text-sm text-white/60">UTA</span>
                  </div>
                )}
                {player.team_color === 'blue' && (
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/50" />
                    <span className="hidden sm:inline text-sm text-white/60">PAU</span>
                  </div>
                )}
                {!player.team_color && (
                  <span className="text-sm text-white/30">-</span>
                )}
              </div>

              {/* Rating */}
              <div className="col-span-2 sm:col-span-1 flex items-center justify-center">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${getRatingBadgeStyle(rating)} flex items-center justify-center font-black text-xl sm:text-2xl shadow-lg shrink-0`}>
                  {rating}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}