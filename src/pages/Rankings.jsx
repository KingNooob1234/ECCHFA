import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Trophy, Award, Medal } from 'lucide-react';
import PlayerRankingsTable from '../components/rankings/PlayerRankingsTable';

export default function Rankings() {
  const { data: players = [], isLoading } = useQuery({
    queryKey: ['players'],
    queryFn: () => base44.entities.Player.list('-overall_rating', 100),
  });

  // Top 3 based on manual ranking (rank 1 = highest rated non-manually-ranked, rank 2 = Rami, rank 3 = Miles)
  const MANUAL_RANK_TOP3 = [null, 'Rami', 'Miles']; // index = position-1
  const manuallyRanked2And3 = new Set(['Rami', 'Miles']);
  const rank1Player = [...players]
    .filter(p => !manuallyRanked2And3.has(p.name))
    .sort((a, b) => (b.overall_rating || 0) - (a.overall_rating || 0))[0];
  const rank2Player = players.find(p => p.name === 'Rami');
  const rank3Player = players.find(p => p.name === 'Miles');
  const topPlayers = [rank1Player, rank2Player, rank3Player].filter(Boolean);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8952D]">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">Player Rankings</h1>
              <p className="text-white/50 mt-1">Overall Ratings • Season 2025/26</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Update Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-8 text-sm">
            <span className="text-white/50">Last updated: <span className="text-white/80 font-medium">12 March, 2026</span></span>
            <span className="text-white/50">Next update: <span className="text-white/80 font-medium">December 24th, 2026</span></span>
          </div>

          {/* Top 3 Podium */}
          {topPlayers.length >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid md:grid-cols-3 gap-4 mb-12"
            >
              {/* 2nd Place */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="md:order-1 flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-[#C0C0C0]/20 to-transparent border border-[#C0C0C0]/30"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C0C0C0] to-[#E0E0E0] flex items-center justify-center text-3xl font-black text-[#0a0e1a] mb-4">
                  2
                </div>
                <div className="text-4xl mb-2">{topPlayers[1]?.nationality || '🌍'}</div>
                <div className="text-lg font-bold text-slate-900 text-center">{topPlayers[1]?.name}</div>
                <div className="text-sm text-white/40 mb-4">
                  {topPlayers[1]?.position?.includes('/') ? topPlayers[1]?.position.split('/')[1] : topPlayers[1]?.position}
                </div>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#C0C0C0] to-[#E0E0E0] flex items-center justify-center text-3xl font-black text-[#0a0e1a]">
                  {topPlayers[1]?.overall_rating || 0}
                </div>
              </motion.div>

              {/* 1st Place */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="md:order-2 flex flex-col items-center p-8 rounded-2xl bg-gradient-to-br from-[#D4AF37]/30 to-transparent border-2 border-[#D4AF37] relative"
              >
                <div className="absolute -top-4 bg-[#D4AF37] text-[#0a0e1a] px-4 py-1 rounded-full text-xs font-bold">
                  #1 RANKED
                </div>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#F0D060] flex items-center justify-center text-4xl font-black text-[#0a0e1a] mb-4 shadow-xl shadow-[#D4AF37]/50">
                  1
                </div>
                <div className="text-5xl mb-2">{topPlayers[0]?.nationality || '🌍'}</div>
                <div className="text-2xl font-bold text-slate-900 text-center">{topPlayers[0]?.name}</div>
                <div className="text-sm text-white/50 mb-4">
                  {topPlayers[0]?.position?.includes('/') ? topPlayers[0]?.position.split('/')[1] : topPlayers[0]?.position}
                </div>
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#F0D060] flex items-center justify-center text-4xl font-black text-[#0a0e1a] shadow-xl shadow-[#D4AF37]/50">
                  {topPlayers[0]?.overall_rating || 0}
                </div>
              </motion.div>

              {/* 3rd Place */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="md:order-3 flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-[#CD7F32]/20 to-transparent border border-[#CD7F32]/30"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#CD7F32] to-[#E0965A] flex items-center justify-center text-3xl font-black text-[#0a0e1a] mb-4">
                  3
                </div>
                <div className="text-4xl mb-2">{topPlayers[2]?.nationality || '🌍'}</div>
                <div className="text-lg font-bold text-slate-900 text-center">{topPlayers[2]?.name}</div>
                <div className="text-sm text-white/40 mb-4">
                  {topPlayers[2]?.position?.includes('/') ? topPlayers[2]?.position.split('/')[1] : topPlayers[2]?.position}
                </div>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#CD7F32] to-[#E0965A] flex items-center justify-center text-3xl font-black text-[#0a0e1a]">
                  {topPlayers[2]?.overall_rating || 0}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Rating Legend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-8 p-4 rounded-xl bg-white/5 border border-white/10"
          >
            <div className="text-sm text-white/40">Rating Tiers:</div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-purple-600" />
              <span className="text-white/60">90+ Elite</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-red-500 to-red-600" />
              <span className="text-white/60">85-89 Epic</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-green-500 to-green-600" />
              <span className="text-white/60">80-84 Amazing</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-blue-600" />
              <span className="text-white/60">76-79 Great</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-yellow-500 to-yellow-600" />
              <span className="text-white/60">71-75 Good</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-gray-500 to-gray-600" />
              <span className="text-white/60">66-70 Decent</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-700 to-amber-800" />
              <span className="text-white/60">40-65 Bad</span>
            </div>
          </motion.div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <PlayerRankingsTable players={players} isLoading={isLoading} />
          </motion.div>
        </div>
      </section>
    </div>
  );
}