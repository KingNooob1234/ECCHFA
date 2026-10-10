import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import PitchLineup from './PitchLineup';

export default function CLMatchDetail({ match, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Semi Finals
      </button>

      {/* Match Header */}
      <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden mb-6">
        <div className="px-6 pt-5 pb-2 flex items-center justify-between text-xs">
          <span className="text-[#0066FF] font-semibold">Champions League · Semi Final</span>
          <span className="text-white/40">Result coming soon</span>
        </div>

        <div className="px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            {/* Team 1 */}
            <div className="flex-1 flex flex-col items-center gap-2">
              {match.logo1
                ? <img src={match.logo1} alt={match.team1} className="w-16 h-16 object-contain" style={{ mixBlendMode: 'screen' }} />
                : <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-2xl">🏆</div>
              }
              <span className="text-slate-900 font-bold text-center text-sm leading-tight">{match.team1}</span>
              {match.teamRating1 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#60a5fa]">
                  {match.teamRating1} OVR
                </span>
              )}
            </div>

            {/* Score */}
            <div className="flex items-center gap-3">
              <span className="text-slate-900 text-5xl font-black">
                {match.score1 !== undefined ? match.score1 : '-'}
              </span>
              <span className="text-white/30 text-2xl font-bold">-</span>
              <span className="text-slate-900 text-5xl font-black">
                {match.score2 !== undefined ? match.score2 : '-'}
              </span>
            </div>

            {/* Team 2 */}
            <div className="flex-1 flex flex-col items-center gap-2">
              {match.logo2
                ? <img src={match.logo2} alt={match.team2} className="w-16 h-16 object-contain" style={{ mixBlendMode: 'screen' }} />
                : <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-2xl">🏆</div>
              }
              <span className="text-slate-900 font-bold text-center text-sm leading-tight">{match.team2}</span>
              {match.teamRating2 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#60a5fa]">
                  {match.teamRating2} OVR
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pitch Lineups side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PitchLineup
          teamName={match.team1}
          lineup={match.lineup1}
          teamRating={match.teamRating1}
          logo={match.logo1}
        />
        <PitchLineup
          teamName={match.team2}
          lineup={match.lineup2}
          teamRating={match.teamRating2}
          logo={match.logo2}
        />
      </div>
    </motion.div>
  );
}