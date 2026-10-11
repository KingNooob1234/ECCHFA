import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';

const positionColors = {
  'Goalkeeper': 'from-yellow-500 to-orange-500',
  'Defender': 'from-blue-500 to-indigo-500',
  'Midfielder': 'from-green-500 to-emerald-500',
  'Forward': 'from-red-500 to-pink-500',
};

export default function PlayerCard({ player, index }) {
  const mainPosition = player.position?.split('/')[0];
  
  return (
    <Link to={`${createPageUrl('PlayerProfile')}?id=${player.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 hover:scale-105 transition-all duration-500 cursor-pointer"
      >
        {/* Top Section */}
        <div className="relative h-40 overflow-hidden">
          {/* Background Pattern */}
          <div className={`absolute inset-0 bg-gradient-to-br ${positionColors[mainPosition] || 'from-gray-500 to-gray-600'} opacity-20`} />
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.5
          }} />

          {/* Jersey Number */}
          <div className="absolute top-4 right-4 text-6xl font-black text-white/10">
            {player.jersey_number || '--'}
          </div>

          {/* Player Photo */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8">
            {player.photo_url ? (
              <img 
                src={player.photo_url} 
                alt={player.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-[#18181b] shadow-xl"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#242428] to-[#2e2e33] border-4 border-[#18181b] flex items-center justify-center shadow-xl">
                <User className="w-12 h-12 text-slate-400" />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="pt-12 pb-6 px-6 text-center">
          <h3 className="text-lg font-bold text-slate-100 mb-1">{player.name}</h3>
          {player.last_name && (
            <p className="text-sm text-white/60 mb-2">{player.last_name}</p>
          )}
          
          {player.nationality && (
            <span className="text-2xl mb-3 block">{player.nationality}</span>
          )}

          {player.position && (
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${positionColors[mainPosition] || 'from-gray-500 to-gray-600'} text-white mb-3`}>
              {player.position.includes('/') ? player.position.split('/')[1] : player.position}
            </span>
          )}

          {player.team && (
            <div className="flex items-center justify-center gap-2">
              {player.team_color && (
                <div className={`w-3 h-3 rounded-full ${player.team_color === 'red' ? 'bg-red-500' : 'bg-blue-500'}`} />
              )}
              <span className="text-sm text-white/60">{player.team}</span>
            </div>
          )}
        </div>

        {/* Hover Glow */}
        <div className={`absolute inset-0 bg-gradient-to-br ${positionColors[mainPosition] || 'from-gray-500 to-gray-600'} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />
      </motion.div>
    </Link>
  );
}