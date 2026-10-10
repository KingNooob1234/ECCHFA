import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Repeat, Star } from 'lucide-react';
import TeamLogo from './TeamLogo';

function teamColor(name, teams) {
  return teams.find((t) => t.name === name)?.color || 'from-[#6B7280] to-[#4B5563]';
}

function Centerpoint({ event }) {
  if (event.type === 'sub') {
    return <Repeat className="w-4 h-4 text-[#0066FF] shrink-0" />;
  }

  let bg = 'bg-white';
  if (event.type === 'missed_penalty') bg = 'bg-red-500';
  else if (event.type === 'yellow') bg = 'bg-yellow-400';
  else if (event.type === 'red') bg = 'bg-red-500';

  return (
    <div className="relative shrink-0">
      <div className={`w-3.5 h-3.5 rounded-full ${bg} ring-2 ring-[#0a0e1a] flex items-center justify-center`}>
        {event.type === 'penalty_goal' && (
          <span className="text-[8px] font-black text-black leading-none">P</span>
        )}
      </div>
    </div>
  );
}

function EventLabel({ event }) {
  const label = {
    goal: `${event.player} goal`,
    penalty_goal: `${event.player} goal`,
    missed_penalty: `${event.player} missed penalty`,
    yellow: `${event.player} yellow card`,
    red: `${event.player} red card`,
    sub: `${event.player} on for ${event.for_player}`,
  }[event.type];

  return <span className="text-white/80 text-xs">{label}</span>;
}

export default function FixtureDetail({ match, teams, onBack }) {
  const homeColor = teamColor(match.home, teams);
  const awayColor = teamColor(match.away, teams);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm select-none"
        style={{ minHeight: 44 }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to fixtures
      </button>

      {/* Date */}
      <p className="text-white/50 text-sm text-center">{match.date}</p>

      {/* Score header */}
      <div className="flex items-stretch rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
        <div className={`w-2 sm:w-3 bg-gradient-to-b ${homeColor}`} />
        <div className="flex-1 flex items-center justify-between gap-4 py-6 px-4">
          <div className="flex-1 flex flex-col items-center gap-3">
            <TeamLogo teamName={match.home} teams={teams} className="w-14 h-14" />
            <span className="text-slate-900 font-bold text-sm sm:text-base text-center">{match.home}</span>
          </div>
          <div className="text-center px-4">
            <span className="text-slate-900 font-black text-3xl sm:text-4xl">{match.score.home} – {match.score.away}</span>
            <p className="text-white/40 text-xs mt-1">Full Time</p>
          </div>
          <div className="flex-1 flex flex-col items-center gap-3">
            <TeamLogo teamName={match.away} teams={teams} className="w-14 h-14" />
            <span className="text-slate-900 font-bold text-sm sm:text-base text-center">{match.away}</span>
          </div>
        </div>
        <div className={`w-2 sm:w-3 bg-gradient-to-b ${awayColor}`} />
      </div>

      {/* Event Timeline */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
        <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-5 text-center">Event Timeline</h3>
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
          <div className="space-y-4">
            {match.events.map((e, i) => {
              const isHome = e.side === 'home';
              return (
                <div key={i} className="relative flex items-center">
                  {/* Home side (left) */}
                  <div className="flex-1 pr-6">
                    {isHome && (
                      <div className="flex items-center gap-2 justify-end">
                        <EventLabel event={e} />
                      </div>
                    )}
                  </div>
                  {/* Centerpoint */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <Centerpoint event={e} />
                  </div>
                  {/* Away side (right) */}
                  <div className="flex-1 pl-6">
                    {!isHome && (
                      <div className="flex items-center gap-2">
                        <EventLabel event={e} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* POTM */}
      {match.potm && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-[#D4AF37]/15 to-transparent border border-[#D4AF37]/30">
          <Star className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
          <p className="text-sm text-slate-900">
            <span className="text-[#D4AF37] font-semibold">POTM:</span> {match.potm}
          </p>
        </div>
      )}

      {/* Lineups */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
        <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4 text-center">Lineups</h3>
        <div className="grid grid-cols-2 gap-6">
          {/* Home lineup */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${homeColor}`} />
              <span className="text-slate-900 font-semibold text-xs">{match.home}</span>
            </div>
            <div className="space-y-2">
              {match.lineups.home.map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className="text-white/80">{p.name}</span>
                  {p.captain && <span className="text-[#D4AF37] font-bold">(C)</span>}
                  {p.role === 'GK' && <span className="text-white/40">(GK)</span>}
                  {p.sub && <Repeat className="w-3 h-3 text-[#0066FF]" />}
                </div>
              ))}
            </div>
          </div>
          {/* Away lineup */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${awayColor}`} />
              <span className="text-slate-900 font-semibold text-xs">{match.away}</span>
            </div>
            <div className="space-y-2">
              {match.lineups.away.map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className="text-white/80">{p.name}</span>
                  {p.captain && <span className="text-[#D4AF37] font-bold">(C)</span>}
                  {p.role === 'GK' && <span className="text-white/40">(GK)</span>}
                  {p.sub && <Repeat className="w-3 h-3 text-[#0066FF]" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}