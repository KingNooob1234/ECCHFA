import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users } from 'lucide-react';

const teamColors = {
  'Dangel Bangel FC': 'from-[#16a34a] to-[#15803d]',
  'Royal Falcons FC': 'from-[#DC2626] to-[#991B1B]',
  'Chutti Butti FC': 'from-[#8B5CF6] to-[#6D28D9]',
  'Tiki Taka FC': 'from-[#0066FF] to-[#004BB5]',
  'Favela Boys': 'from-[#D4AF37] to-[#B8952D]',
  'Team 6': 'from-[#6B7280] to-[#4B5563]',
};

const teamLogos = {
  'Dangel Bangel FC': 'https://media.base44.com/images/public/695fedaf221961da99c26968/292b604be_Screenshot_2026-10-03_at_225343-removebg-preview.png',
  'Royal Falcons FC': 'https://media.base44.com/images/public/695fedaf221961da99c26968/75647a9b1_Gemini_Generated_Image_4s7lo34s7lo34s7l-removebg-preview.png',
  'Chutti Butti FC': 'https://media.base44.com/images/public/695fedaf221961da99c26968/59d54759c_Gemini_Generated_Image_qtr2zbqtr2zbqtr2-removebg-preview.png',
  'Tiki Taka FC': 'https://media.base44.com/images/public/695fedaf221961da99c26968/68130d96b_Gemini_Generated_Image_55r6jn55r6jn55r6-removebg-preview.png',
  'Favela Boys': 'https://media.base44.com/images/public/695fedaf221961da99c26968/04910ff7d_Gemini_Generated_Image_1s0raf1s0raf1s0r-removebg-preview.png',
};

const rosters = {
  'Dangel Bangel FC': {
    players: [
      { name: 'Rami', country: '🇪🇸', role: 'captain' },
      { name: 'Muhammad', country: '🇾🇪' },
      { name: 'Elyes', country: '🇹🇳' },
      { name: 'Sanad', country: '🇸🇰', role: 'goalkeeper' },
    ],
  },
  'Royal Falcons FC': {
    players: [
      { name: 'Yazan', country: '🇯🇴', role: 'captain' },
      { name: 'Sami', country: '🇸🇾' },
      { name: 'Muhamed', country: '🇾🇪' },
      { name: 'Loay', country: '🇱🇾', role: 'goalkeeper' },
    ],
  },
  'Favela Boys': {
    players: [
      { name: 'Mazen', country: '🇺🇸', role: 'captain' },
      { name: 'Ahmed', country: '🇪🇬' },
      { name: 'Ayden', country: '🇺🇸' },
      { name: 'Ben', country: '🇧🇷', role: 'goalkeeper' },
    ],
  },
  'Chutti Butti FC': {
    players: [
      { name: 'Mahmoud', country: '🇪🇬', role: 'captain' },
      { name: "Mo'min", country: '🇪🇬', role: 'goalkeeper' },
      { name: 'Omar', country: '🇱🇧' },
    ],
  },
  'Tiki Taka FC': {
    players: [
      { name: 'Mohamede', country: '🇲🇷', role: 'captain' },
      { name: 'Jawhar', country: '🇯🇴' },
      { name: 'Zain', country: '🇱🇧' },
      { name: 'Yusuf', country: '🇮🇳', role: 'goalkeeper' },
    ],
  },
};

export default function TeamRoster() {
  const urlParams = new URLSearchParams(window.location.search);
  const teamName = urlParams.get('team') || 'Team';
  const color = teamColors[teamName] || 'from-[#6B7280] to-[#4B5563]';
  const logo = teamLogos[teamName];
  const roster = rosters[teamName];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [teamName]);

  return (
    <div className="min-h-screen pb-20">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#16a34a]/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/MiniWorldCup"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tournaments
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            {logo ? (
              <img src={logo} alt={teamName} className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0" />
            ) : (
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${color}`}>
                <Users className="w-8 h-8 text-white" />
              </div>
            )}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-100">{teamName}</h1>
              <p className="text-white/50 mt-1">Hexagon League • Team Roster</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {roster ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {roster.players.map((player, i) => (
              <motion.div
                key={player.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-lg shrink-0`}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xl">{player.country}</span>
                    <span className="text-slate-100 font-semibold text-lg">{player.name}</span>
                  </div>
                  {player.role === 'captain' && (
                    <p className="text-xs text-[#D4AF37]/80 mt-0.5">Captain</p>
                  )}
                  {player.role === 'goalkeeper' && (
                    <p className="text-xs text-[#16a34a]/80 mt-0.5">Goalkeeper</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
            <Users className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/50 text-lg">Roster coming soon</p>
            <p className="text-white/30 text-sm mt-2">Players will be added here.</p>
          </div>
        )}
      </section>
    </div>
  );
}