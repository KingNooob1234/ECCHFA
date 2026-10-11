import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Users, User } from 'lucide-react';
import PlayerCard from '../components/players/PlayerCard';
import PlayerFilters from '../components/players/PlayerFilters';
import TopScorers from '../components/players/TopScorers';
import { getTrophyCount } from '../components/players/TrophyCabinet';

export default function Players() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('trophies');

  const { data: players = [], isLoading: playersLoading } = useQuery({
    queryKey: ['players'],
    queryFn: () => base44.entities.Player.list('-updated_date', 100),
  });

  const { data: teams = [] } = useQuery({
    queryKey: ['teams'],
    queryFn: () => base44.entities.Team.list(),
  });

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.team?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'trophies') {
      return getTrophyCount(b.name) - getTrophyCount(a.name);
    }
    return (b.overall_rating || 0) - (a.overall_rating || 0);
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#16a34a] to-[#15803d]">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-100">Player Statistics</h1>
              <p className="text-white/50 mt-1">{players.length} registered players</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <PlayerFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />

              {playersLoading ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-80 bg-white/5 rounded-2xl animate-pulse" />
                  ))}
                </div>
              ) : filteredPlayers.length === 0 ? (
                <div className="text-center py-20">
                  <User className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">No Players Found</h3>
                  <p className="text-white/50">
                    {players.length === 0 
                      ? 'Player data will appear here once added' 
                      : 'Try adjusting your search or filters'}
                  </p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPlayers.map((player, index) => (
                    <PlayerCard key={player.id} player={player} index={index} />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <TopScorers players={players} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}