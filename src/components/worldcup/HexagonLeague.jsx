import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Hexagon } from 'lucide-react';
import CountdownTimer from '@/components/shared/CountdownTimer';
import StatsSection from '@/components/home/StatsSection';
import FixtureDetail from './FixtureDetail';
import TeamLogo from './TeamLogo';

const teams = [
  { name: 'Dangel Bangel FC', color: 'from-[#16a34a] to-[#15803d]', logo: 'https://media.base44.com/images/public/695fedaf221961da99c26968/292b604be_Screenshot_2026-10-03_at_225343-removebg-preview.png' },
  { name: 'Royal Falcons FC', color: 'from-[#DC2626] to-[#991B1B]', logo: 'https://media.base44.com/images/public/695fedaf221961da99c26968/75647a9b1_Gemini_Generated_Image_4s7lo34s7lo34s7l-removebg-preview.png' },
  { name: 'Chutti Butti FC', color: 'from-[#8B5CF6] to-[#6D28D9]', logo: 'https://media.base44.com/images/public/695fedaf221961da99c26968/59d54759c_Gemini_Generated_Image_qtr2zbqtr2zbqtr2-removebg-preview.png' },
  { name: 'Tiki Taka FC', color: 'from-[#0066FF] to-[#004BB5]', logo: 'https://media.base44.com/images/public/695fedaf221961da99c26968/68130d96b_Gemini_Generated_Image_55r6jn55r6jn55r6-removebg-preview.png' },
  { name: 'Favela Boys', color: 'from-[#D4AF37] to-[#B8952D]', logo: 'https://media.base44.com/images/public/695fedaf221961da99c26968/04910ff7d_Gemini_Generated_Image_1s0raf1s0raf1s0r-removebg-preview.png' },
  { name: 'Team 6', color: 'from-[#6B7280] to-[#4B5563]' },
];

const standings = [
  { name: 'Dangel Bangel FC', color: 'from-[#16a34a] to-[#15803d]', played: 1, won: 1, drawn: 0, lost: 0, gf: 5, ga: 4, gd: 1, points: 3 },
  { name: 'Chutti Butti FC', color: 'from-[#8B5CF6] to-[#6D28D9]', played: 2, won: 1, drawn: 0, lost: 1, gf: 13, ga: 13, gd: 0, points: 3 },
  { name: 'Royal Falcons FC', color: 'from-[#DC2626] to-[#991B1B]', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 },
  { name: 'Tiki Taka FC', color: 'from-[#0066FF] to-[#004BB5]', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 },
  { name: 'Team 6', color: 'from-[#6B7280] to-[#4B5563]', played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 },
  { name: 'Favela Boys', color: 'from-[#D4AF37] to-[#B8952D]', played: 1, won: 0, drawn: 0, lost: 1, gf: 8, ga: 9, gd: -1, points: 0 },
];

const matchdays = [
  {
    number: 1,
    date: 'October 2, 18:30 - 20:00',
    teams: 'Teams 1, 3, 5',
    matches: [
      { home: 'Dangel Bangel FC', away: 'Chutti Butti FC' },
      { home: 'Chutti Butti FC', away: 'Favela Boys' },
    ],
  },
  {
    number: 2,
    date: 'October 9, 18:30 - 20:00',
    teams: 'Teams 2, 4, 6',
    matches: [
      { home: 'Royal Falcons FC', away: 'Tiki Taka FC' },
      { home: 'Tiki Taka FC', away: 'Team 6' },
      { home: 'Royal Falcons FC', away: 'Team 6' },
    ],
  },
  {
    number: 3,
    date: 'October 16, 18:30 - 20:00',
    teams: 'Teams 1, 2, 4',
    matches: [
      { home: 'Dangel Bangel FC', away: 'Royal Falcons FC' },
      { home: 'Dangel Bangel FC', away: 'Tiki Taka FC' },
      { home: 'Royal Falcons FC', away: 'Tiki Taka FC' },
    ],
  },
  {
    number: 4,
    date: 'October 23, 18:30 - 20:00',
    teams: 'Teams 3, 5, 6',
    matches: [
      { home: 'Chutti Butti FC', away: 'Team 6' },
      { home: 'Favela Boys', away: 'Team 6' },
      { home: 'Chutti Butti FC', away: 'Favela Boys' },
    ],
  },
  {
    number: 5,
    date: 'October 30, 18:30 - 20:00',
    teams: 'Teams 1, 3, 6',
    matches: [
      { home: 'Dangel Bangel FC', away: 'Team 6' },
      { home: 'Chutti Butti FC', away: 'Team 6' },
      { home: 'Dangel Bangel FC', away: 'Chutti Butti FC' },
    ],
  },
  {
    number: 6,
    date: 'November 6, 19:00 - 20:00',
    teams: 'Teams 2, 4, 5',
    matches: [
      { home: 'Dangel Bangel FC', away: 'Favela Boys' },
      { home: 'Royal Falcons FC', away: 'Favela Boys' },
      { home: 'Tiki Taka FC', away: 'Favela Boys' },
    ],
  },
  {
    number: 7,
    date: 'November 13, 18:30 - 20:00',
    teams: 'Teams 1, 4, 5',
    matches: [
      { home: 'Dangel Bangel FC', away: 'Favela Boys' },
      { home: 'Tiki Taka FC', away: 'Favela Boys' },
      { home: 'Dangel Bangel FC', away: 'Tiki Taka FC' },
    ],
  },
  {
    number: 8,
    date: 'November 20, 18:30 - 20:00',
    teams: 'Teams 2, 3, 6',
    matches: [
      { home: 'Royal Falcons FC', away: 'Chutti Butti FC' },
      { home: 'Chutti Butti FC', away: 'Team 6' },
      { home: 'Royal Falcons FC', away: 'Team 6' },
    ],
  },
  {
    number: 9,
    date: 'November 27, 18:30 - 20:00',
    teams: 'Teams 1, 2, 6',
    matches: [
      { home: 'Dangel Bangel FC', away: 'Royal Falcons FC' },
      { home: 'Royal Falcons FC', away: 'Team 6' },
      { home: 'Dangel Bangel FC', away: 'Team 6' },
    ],
  },
  {
    number: 10,
    date: 'December 4, 19:00 - 20:00',
    teams: 'Teams 3, 4, 5',
    matches: [
      { home: 'Chutti Butti FC', away: 'Tiki Taka FC' },
      { home: 'Tiki Taka FC', away: 'Favela Boys' },
    ],
  },
  {
    number: 11,
    date: 'December 11, 19:00 - 20:30',
    teams: 'Teams 2, 3, 4, 5',
    matches: [
      { home: 'Royal Falcons FC', away: 'Favela Boys' },
      { home: 'Chutti Butti FC', away: 'Tiki Taka FC' },
    ],
  },
];

function teamColor(name) {
  return teams.find((t) => t.name === name)?.color || 'from-[#6B7280] to-[#4B5563]';
}

// Match data for played fixtures, keyed by "matchday-matchIndex"
const matchData = {
  '1-0': {
    home: 'Dangel Bangel FC',
    away: 'Chutti Butti FC',
    date: 'October 2, 2025 • 18:30 - 20:00',
    score: { home: 5, away: 4 },
    potm: 'Rami',
    events: [
      { side: 'home', type: 'goal', player: 'Rami' },
      { side: 'home', type: 'goal', player: 'Rami' },
      { side: 'home', type: 'penalty_goal', player: 'Rami' },
      { side: 'home', type: 'goal', player: 'Muhammad' },
      { side: 'away', type: 'goal', player: 'Omar' },
      { side: 'away', type: 'goal', player: 'Mahmoud' },
      { side: 'away', type: 'goal', player: 'Mahmoud' },
      { side: 'away', type: 'yellow', player: 'Mahmoud' },
      { side: 'away', type: 'penalty_goal', player: 'Mahmoud' },
      { side: 'home', type: 'sub', player: 'Elyes', for_player: 'Muhammad' },
      { side: 'home', type: 'goal', player: 'Elyes' },
    ],
    lineups: {
      home: [
        { name: 'Rami', captain: true, role: 'outfield' },
        { name: 'Muhammad', role: 'outfield' },
        { name: 'Sanad', role: 'GK' },
        { name: 'Elyes', sub: true },
      ],
      away: [
        { name: 'Mahmoud', captain: true, role: 'outfield' },
        { name: 'Omar', role: 'outfield' },
        { name: "Mo'min", role: 'GK' },
      ],
    },
  },
  '1-1': {
    home: 'Chutti Butti FC',
    away: 'Favela Boys',
    date: 'October 2, 2025 • 18:30 - 20:00',
    score: { home: 9, away: 8 },
    potm: 'Mahmoud',
    events: [
      { side: 'home', type: 'goal', player: 'Mahmoud' },
      { side: 'home', type: 'goal', player: 'Mahmoud' },
      { side: 'away', type: 'goal', player: 'Mazen' },
      { side: 'home', type: 'goal', player: 'Omar' },
      { side: 'away', type: 'goal', player: 'Mazen' },
      { side: 'away', type: 'goal', player: 'Mazen' },
      { side: 'away', type: 'goal', player: 'Mazen' },
      { side: 'home', type: 'goal', player: 'Mahmoud' },
      { side: 'home', type: 'goal', player: 'Mahmoud' },
      { side: 'away', type: 'goal', player: 'Mazen' },
      { side: 'away', type: 'goal', player: 'Mazen' },
      { side: 'home', type: 'goal', player: 'Mahmoud' },
      { side: 'away', type: 'goal', player: 'Mazen' },
      { side: 'home', type: 'yellow', player: "Mo'min" },
      { side: 'home', type: 'goal', player: 'Omar' },
      { side: 'away', type: 'goal', player: 'Ben' },
      { side: 'home', type: 'goal', player: 'Omar' },
      { side: 'home', type: 'goal', player: 'Mahmoud' },
    ],
    lineups: {
      home: [
        { name: 'Mahmoud', captain: true, role: 'outfield' },
        { name: 'Omar', role: 'outfield' },
        { name: "Mo'min", role: 'GK' },
      ],
      away: [
        { name: 'Mazen', captain: true, role: 'outfield' },
        { name: 'Ayden', role: 'outfield' },
        { name: 'Ben', role: 'GK' },
      ],
    },
  },
};

export default function HexagonLeague() {
  const [selectedFixture, setSelectedFixture] = useState(null);
  const showDetail = selectedFixture && matchData[selectedFixture];

  return (
    <AnimatePresence mode="wait">
      {showDetail ? (
        <motion.div
          key="fixture-detail"
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          <FixtureDetail
            match={matchData[selectedFixture]}
            teams={teams}
            onBack={() => setSelectedFixture(null)}
          />
        </motion.div>
      ) : (
        <motion.div
          key="fixture-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="space-y-10"
        >
          <CountdownTimer />

          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
          >
            <div className="flex items-center gap-3 p-5 border-b border-white/10">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#004BB5]">
                <Hexagon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">League Standings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white/50 text-xs uppercase tracking-wider border-b border-white/10">
                    <th className="px-4 py-3 text-left font-semibold">#</th>
                    <th className="px-2 py-3 text-center font-semibold"></th>
                    <th className="px-4 py-3 text-left font-semibold">Team</th>
                    <th className="px-3 py-3 text-center font-semibold">P</th>
                    <th className="px-3 py-3 text-center font-semibold">W</th>
                    <th className="px-3 py-3 text-center font-semibold">D</th>
                    <th className="px-3 py-3 text-center font-semibold">L</th>
                    <th className="px-3 py-3 text-center font-semibold">GF</th>
                    <th className="px-3 py-3 text-center font-semibold">GA</th>
                    <th className="px-3 py-3 text-center font-semibold">GD</th>
                    <th className="px-4 py-3 text-center font-semibold text-[#D4AF37]">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((row, i) => (
                    <tr key={row.name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 text-white/40 font-medium">{i + 1}</td>
                      <td className="px-2 py-3">
                        <TeamLogo teamName={row.name} teams={teams} className="w-8 h-8" />
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          to={`/TeamRoster?team=${encodeURIComponent(row.name)}`}
                          className="flex items-center gap-3 group"
                        >
                          <div className={`w-2 h-8 rounded-full bg-gradient-to-b ${row.color}`} />
                          <span className="text-slate-900 font-medium group-hover:text-[#0066FF] transition-colors">{row.name}</span>
                        </Link>
                      </td>
                      <td className="px-3 py-3 text-center text-white/60">{row.played}</td>
                      <td className="px-3 py-3 text-center text-white/60">{row.won}</td>
                      <td className="px-3 py-3 text-center text-white/60">{row.drawn}</td>
                      <td className="px-3 py-3 text-center text-white/60">{row.lost}</td>
                      <td className="px-3 py-3 text-center text-white/60">{row.gf}</td>
                      <td className="px-3 py-3 text-center text-white/60">{row.ga}</td>
                      <td className="px-3 py-3 text-center text-white/60">{row.gd}</td>
                      <td className="px-4 py-3 text-center text-[#D4AF37] font-bold">{row.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <StatsSection />

          {/* Fixtures */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Fixtures</h2>
            <div className="space-y-6">
              {matchdays.map((md) => (
                <motion.div
                  key={md.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
                >
                  <div className="p-5 border-b border-white/10 bg-gradient-to-r from-[#0066FF]/10 to-transparent">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-slate-900">Matchday {md.number}</h3>
                      <span className="text-sm text-white/50">{md.date} • {md.teams}</span>
                    </div>
                  </div>
                  <div className="divide-y divide-white/5">
                    {md.matches.map((m, i) => {
                      const fixtureKey = `${md.number}-${i}`;
                      const hasData = !!matchData[fixtureKey];
                      return (
                        <button
                          key={i}
                          onClick={() => hasData && setSelectedFixture(fixtureKey)}
                          className={`w-full px-5 py-4 text-left transition-colors ${
                            hasData ? 'hover:bg-white/5 cursor-pointer' : 'cursor-default'
                          }`}
                          style={{ minHeight: 44 }}
                        >
                          <div className="flex items-center gap-2 sm:gap-4">
                            {/* Home */}
                            <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                              <span className="text-slate-900 font-medium text-sm truncate">{m.home}</span>
                              <TeamLogo teamName={m.home} teams={teams} className="w-6 h-6 shrink-0" />
                            </div>
                            {/* Score / VS */}
                            <div className="shrink-0 text-center min-w-[3rem]">
                              {hasData ? (
                                <div className="text-slate-900 font-bold text-sm whitespace-nowrap">
                                  {matchData[fixtureKey].score.home}-{matchData[fixtureKey].score.away}
                                </div>
                              ) : (
                                <span className="text-slate-400 text-xs font-bold">VS</span>
                              )}
                            </div>
                            {/* Away */}
                            <div className="flex items-center gap-2 flex-1 min-w-0 justify-start">
                              <TeamLogo teamName={m.away} teams={teams} className="w-6 h-6 shrink-0" />
                              <span className="text-slate-900 font-medium text-sm truncate">{m.away}</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}