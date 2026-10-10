import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Target, Trophy, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import TrophyCabinet from '../components/players/TrophyCabinet';

export default function PlayerProfile() {
  const urlParams = new URLSearchParams(window.location.search);
  const playerId = urlParams.get('id');

  const { data: player, isLoading } = useQuery({
    queryKey: ['player', playerId],
    queryFn: () => base44.entities.Player.get(playerId),
    enabled: !!playerId,
  });

  const positionColors = {
    'Goalkeeper': 'from-yellow-500 to-orange-500',
    'Defender': 'from-blue-500 to-indigo-500',
    'Midfielder': 'from-green-500 to-emerald-500',
    'Forward': 'from-red-500 to-pink-500',
  };

  const mainPosition = player?.position?.split('/')[0];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0066FF]" />
      </div>
    );
  }

  if (!player) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Player Not Found</h3>
          <Link to={createPageUrl('Players')} className="text-[#0066FF] hover:underline">
            Back to Players
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link 
          to={createPageUrl('Players')}
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Players
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${positionColors[mainPosition] || 'from-gray-500 to-gray-600'} opacity-10`} />
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.3
        }} />

        {/* Jersey Number Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-black text-white/5 pointer-events-none">
          {player.jersey_number || '--'}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Player Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {player.photo_url ? (
                <img 
                  src={player.photo_url} 
                  alt={player.name}
                  className="w-48 h-48 rounded-full object-cover border-4 border-white/20 shadow-2xl"
                />
              ) : (
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#1a1f36] to-[#252b45] border-4 border-white/20 flex items-center justify-center shadow-2xl">
                  <User className="w-20 h-20 text-slate-400" />
                </div>
              )}
            </motion.div>

            {/* Player Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-1 text-center md:text-left"
            >
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                {player.nationality && (
                  <span className="text-4xl">{player.nationality}</span>
                )}
                <span className={`px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${positionColors[mainPosition] || 'from-gray-500 to-gray-600'} text-white`}>
                  {player.position || 'Unknown'}
                </span>
              </div>

              <h1 className="text-5xl font-bold text-slate-900 mb-2">{player.name}</h1>
              {player.last_name && (
                <p className="text-xl text-white/60 mb-4">{player.last_name}</p>
              )}

              <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                {player.team && (
                  <div className="flex items-center gap-2">
                    {player.team_color && (
                      <div className={`w-4 h-4 rounded-full ${player.team_color === 'red' ? 'bg-red-500' : 'bg-blue-500'}`} />
                    )}
                    <span className="text-lg text-white/80">{player.team}</span>
                  </div>
                )}
                {player.jersey_number && (
                  <span className="text-lg text-white/60">#{player.jersey_number}</span>
                )}
              </div>

              {player.overall_rating !== undefined && player.overall_rating !== null && (
                <div className="inline-block px-6 py-3 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#B8952D] shadow-lg">
                  <span className="text-sm text-white/80 font-medium mr-2">Overall Rating</span>
                  <span className="text-3xl font-black text-white">{player.overall_rating}</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Average Goals Per Game */}
          {player.average_goals_per_game !== undefined && player.average_goals_per_game !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#0066FF]/20 border border-white/10"
            >
              <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
                <Target className="w-4 h-4" />
                <span className="uppercase tracking-wider">Avg Goals/Game</span>
              </div>
              <div className="text-4xl font-black text-slate-900">
                {player.average_goals_per_game.toFixed(2)}
              </div>
            </motion.div>
          )}

          {/* Goalkeeper Save Percentage */}
          {player.goalkeeper_save_percentage !== undefined && player.goalkeeper_save_percentage !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#0066FF]/20 to-[#0044CC]/20 border border-white/10"
            >
              <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
                <Trophy className="w-4 h-4" />
                <span className="uppercase tracking-wider">Goalkeeper Save %</span>
              </div>
              <div className="text-4xl font-black text-slate-900">
                {player.goalkeeper_save_percentage}%
              </div>
            </motion.div>
          )}

          {/* Clean Sheet Chance */}
          {player.clean_sheet_chance !== undefined && player.clean_sheet_chance !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-white/10"
            >
              <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
                <AlertCircle className="w-4 h-4" />
                <span className="uppercase tracking-wider">Chance of Clean Sheet</span>
              </div>
              <div className="text-4xl font-black text-slate-900">
                {player.clean_sheet_chance}%
              </div>
            </motion.div>
          )}

        </div>
      </section>

      {/* Trophy Cabinet */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrophyCabinet playerName={player.name} />
      </section>
    </div>
  );
}