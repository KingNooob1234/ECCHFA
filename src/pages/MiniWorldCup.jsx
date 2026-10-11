import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Target, Award, Shield, Waves, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GroupStage from '../components/worldcup/GroupStage';
import MiniWorldCupStats from '../components/worldcup/MiniWorldCupStats';
import KnockoutStage from '../components/worldcup/KnockoutStage';
import Leaderboard from '../components/worldcup/Leaderboard';
import HexagonLeague from '../components/worldcup/HexagonLeague';


const tournament2026Data = {
  groupStage: [
    { name: 'Rami', country: '🇪🇸', goals: 8, concede: 0, group: 1 },
    { name: 'Muhamed', country: '🇾🇪', goals: 0, concede: 0, group: 1 },
    { name: 'Karim', country: '🇯🇴', goals: 0, concede: 8, group: 1 },
    { name: 'Ben', country: '🇧🇷', goals: 12, concede: 3, group: 2 },
    { name: 'Sanad', country: '🇸🇰', goals: 5, concede: 6, group: 2 },
    { name: 'Ayden', country: '🇪🇸', goals: 2, concede: 10, group: 2 },
    { name: 'Muhammad', country: '🇾🇪', goals: 9, concede: 1, group: 3 },
    { name: 'Amir', country: '🇱🇧', goals: 3, concede: 4, group: 3, pts: 1 },
    { name: 'Jaad', country: '🇯🇴', goals: 0, concede: 7, group: 3 },
    { name: 'Ahmed', country: '🇪🇬', goals: 0, concede: 0, group: 4 },
    { name: 'Kamal', country: '🇱🇧', goals: 0, concede: 0, group: 4 },
    { name: 'Art', country: '🇺🇸', goals: 0, concede: 0, group: 4 },
    { name: 'Mahmoud', country: '🇪🇬', goals: 0, concede: 0, group: 5 },
    { name: 'Elyes', country: '🇹🇳', goals: 0, concede: 0, group: 5 },
    { name: 'Kinan', country: '🇱🇧', goals: 0, concede: 0, group: 5 },
    { name: 'Yazan', country: '🇯🇴', goals: 7, concede: 3, group: 6 },
    { name: 'Zain', country: '🇱🇧', goals: 3, concede: 4, group: 6 },
    { name: 'Yusuf', country: '🇮🇳', goals: 0, concede: 3, group: 6 },
    { name: 'Mohamede', country: '🇲🇷', goals: 0, concede: 0, group: 7 },
    { name: 'Jassim', country: '🇶🇦', goals: 0, concede: 0, group: 7 },
    { name: 'Loay', country: '🇱🇾', goals: 0, concede: 0, group: 7 },
    { name: 'Jawhar', country: '🇯🇴', goals: 4, concede: 0, group: 8 },
    { name: 'Camrick', country: '🇵🇭', goals: 0, concede: 0, group: 8 },
    { name: 'Seif', country: '🇯🇴', goals: 0, concede: 4, group: 8 },
  ],
  groupMatches: [
    { group: 1, team1: 'Rami🇪🇸', score1: 8, team2: 'Karim🇯🇴', score2: 0 },
    { group: 2, team1: 'Sanad🇸🇰', score1: 3, team2: 'Ayden🇪🇸', score2: 1 },
    { group: 2, team1: 'Ben🇧🇷', score1: 7, team2: 'Ayden🇪🇸', score2: 1 },
    { group: 2, team1: 'Ben🇧🇷', score1: 5, team2: 'Sanad🇸🇰', score2: 2 },
    { group: 3, team1: 'Muhammad🇾🇪', score1: 4, team2: 'Amir🇱🇧', score2: 1 },
    { group: 3, team1: 'Muhammad🇾🇪', score1: 5, team2: 'Jaad🇯🇴', score2: 0 },
    { group: 3, team1: 'Amir🇱🇧', score1: 2, team2: 'Jaad🇯🇴', score2: 0, note: 'Win by forfeit (+2 pts)' },
    { group: 6, team1: 'Yazan🇯🇴', score1: 3, team2: 'Yusuf🇮🇳', score2: 0 },
    { group: 6, team1: 'Yazan🇯🇴', score1: 4, team2: 'Zain🇱🇧', score2: 3 },
    { group: 8, team1: 'Jawhar🇯🇴', score1: 4, team2: 'Seif🇯🇴', score2: 0 },
  ],
};

const tournament2024Data = {
  groupStage: [
    { name: 'Boston', country: '🇺🇸', goals: 6, concede: 3, group: 1 },
    { name: 'Rami', country: '🇪🇸', goals: 4, concede: 3, group: 1, pts: 3 },
    { name: 'Zein', country: '🇵🇸', goals: 0, concede: 4, group: 1 },
    { name: 'Sanad', country: '🇸🇰', goals: 8, concede: 1, group: 2 },
    { name: 'Muhammad', country: '🇾🇪', goals: 3, concede: 3, group: 2 },
    { name: 'Ayden', country: '🇺🇸', goals: 0, concede: 7, group: 2 },
    { name: 'Bissan', country: '🇵🇸', goals: 2, concede: 1, group: 3 },
    { name: 'Maryam', country: '🇦🇫', goals: 2, concede: 2, group: 3 },
    { name: 'Eleen', country: '🇯🇴', goals: 1, concede: 2, group: 3 },
    { name: 'Abdulrahman', country: '🇵🇸', goals: 7, concede: 0, group: 4 },
    { name: 'Ahmad', country: '🇵🇸', goals: 3, concede: 3, group: 4 },
    { name: 'Theo', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', goals: 0, concede: 7, group: 4 },
    { name: 'Walid', country: '🇩🇿', goals: 4, concede: 0, group: 5 },
    { name: 'Yousef', country: '🇲🇦', goals: 3, concede: 1, group: 5 },
    { name: 'Armaan', country: '🇿🇦', goals: 0, concede: 6, group: 5 },
    { name: 'Elyes', country: '🇹🇳', goals: 6, concede: 1, group: 6 },
    { name: 'Nuh', country: '🇦🇫', goals: 4, concede: 4, group: 6 },
    { name: 'Sheese', country: '🇦🇫', goals: 2, concede: 7, group: 6 },
  ],
  groupMatches: [
    { group: 1, team1: 'Boston🇺🇸', score1: 3, team2: 'Rami🇪🇸', score2: 3 },
    { group: 1, team1: 'Boston🇺🇸', score1: 3, team2: 'Zein🇵🇸', score2: 0 },
    { group: 1, team1: 'Rami🇪🇸', score1: 1, team2: 'Zein🇵🇸', score2: 0, note: 'Win by forfeit (+2 pts)' },
    { group: 2, team1: 'Sanad🇸🇰', score1: 3, team2: 'Muhammad🇾🇪', score2: 1 },
    { group: 2, team1: 'Sanad🇸🇰', score1: 5, team2: 'Ayden🇺🇸', score2: 0 },
    { group: 2, team1: 'Muhammad🇾🇪', score1: 2, team2: 'Ayden🇺🇸', score2: 0 },
    { group: 3, team1: 'Bissan🇵🇸', score1: 2, team2: 'Maryam🇦🇫', score2: 0 },
    { group: 3, team1: 'Bissan🇵🇸', score1: 0, team2: 'Eleen🇯🇴', score2: 1 },
    { group: 3, team1: 'Maryam🇦🇫', score1: 2, team2: 'Eleen🇯🇴', score2: 0 },
    { group: 4, team1: 'Abdulrahman🇵🇸', score1: 3, team2: 'Ahmad🇵🇸', score2: 0 },
    { group: 4, team1: 'Abdulrahman🇵🇸', score1: 4, team2: 'Theo🏴󠁧󠁢󠁥󠁮󠁧󠁿', score2: 0 },
    { group: 4, team1: 'Ahmad🇵🇸', score1: 3, team2: 'Theo🏴󠁧󠁢󠁥󠁮󠁧󠁿', score2: 0 },
    { group: 5, team1: 'Walid🇩🇿', score1: 1, team2: 'Yousef🇲🇦', score2: 0 },
    { group: 5, team1: 'Yousef🇲🇦', score1: 3, team2: 'Armaan🇿🇦', score2: 0 },
    { group: 5, team1: 'Walid🇩🇿', score1: 3, team2: 'Armaan🇿🇦', score2: 0 },
    { group: 6, team1: 'Elyes🇹🇳', score1: 2, team2: 'Nuh🇦🇫', score2: 1 },
    { group: 6, team1: 'Sheese🇦🇫', score1: 2, team2: 'Nuh🇦🇫', score2: 3 },
    { group: 6, team1: 'Elyes🇹🇳', score1: 4, team2: 'Sheese🇦🇫', score2: 0 },
  ],
  knockout: {
    roundOf16: [
      { team1: 'Boston🇺🇸', score1: 8, team2: 'Bissan🇵🇸', score2: 2 },
      { team1: 'Sanad🇸🇰', score1: 1, team2: 'Abdulrahman🇵🇸', score2: 3 },
      { team1: 'Rami🇪🇸', score1: 4, team2: 'Maryam🇦🇫', score2: 2 },
      { team1: 'Muhammad🇾🇪', score1: 1, team2: 'Ahmad🇵🇸', score2: 3 },
      { team1: 'Walid🇩🇿', score1: 3, team2: 'Elyes🇹🇳', score2: 2 },
      { team1: 'Zein🇵🇸', score1: 3, team2: 'Eleen🇯🇴', score2: 0 },
      { team1: 'Yousef🇲🇦', score1: 3, team2: 'Nuh🇦🇫', score2: 1 },
      { team1: 'Armaan🇿🇦', score1: 1, team2: 'Sheese🇦🇫', score2: 1, penalties: '(2)-(0)' },
    ],
    quarterFinals: [
      { team1: 'Boston🇺🇸', score1: 3, team2: 'Abdulrahman🇵🇸', score2: 4 },
      { team1: 'Ahmad🇵🇸', score1: 3, team2: 'Rami🇪🇸', score2: 4, redCard: 'Ahmad🇵🇸 🟥' },
      { team1: 'Walid🇩🇿', score1: 4, team2: 'Zein🇵🇸', score2: 0 },
      { team1: 'Yousef🇲🇦', score1: 4, team2: 'Armaan🇿🇦', score2: 1 },
    ],
    semiFinals: [
      { team1: 'Abdulrahman🇵🇸', team2: 'Rami🇪🇸', note: 'Skip to Final*' },
      { team1: 'Yousef🇲🇦', score1: 3, team2: 'Walid🇩🇿', score2: 2, redCard: 'Both teams 🟥', note: '*Fight in Semi-Final' },
    ],
    final: { team1: 'Abdulrahman🇵🇸', score1: 1, team2: 'Rami🇪🇸', score2: 3 },
  },
  leaderboard: [
    { position: 1, name: 'Rami', country: '🇪🇸', medal: '🥇' },
    { position: 2, name: 'Abdulrahman', country: '🇵🇸', medal: '🥈' },
    { position: 3, name: 'Yousef', country: '🇲🇦', medal: '🥉' },
    { position: 4, name: 'Walid', country: '🇩🇿' },
    { position: 5, name: 'Ahmad', country: '🇵🇸' },
    { position: 6, name: 'Boston', country: '🇺🇸' },
    { position: 7, name: 'Armaan', country: '🇿🇦' },
    { position: 8, name: 'Zein', country: '🇵🇸' },
    { position: 9, name: 'Sanad', country: '🇸🇰' },
    { position: 10, name: 'Elyes', country: '🇹🇳' },
    { position: 11, name: 'Muhammad', country: '🇾🇪' },
    { position: 12, name: 'Maryam', country: '🇦🇫' },
    { position: 13, name: 'Nuh', country: '🇦🇫' },
    { position: 14, name: 'Eleen', country: '🇯🇴' },
    { position: 15, name: 'Sheese', country: '🇦🇫' },
    { position: 16, name: 'Bissan', country: '🇵🇸' },
    { position: 17, name: 'Theo', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { position: 18, name: 'Ayden', country: '🇺🇸' },
  ],
  pointsBoard: [
    { name: 'Boston', country: '🇺🇸', goals: 14, concede: 5, points: 9 },
    { name: 'Abdulrahman', country: '🇵🇸', goals: 15, concede: 7, points: 8 },
    { name: 'Walid', country: '🇩🇿', goals: 13, concede: 5, points: 8 },
    { name: 'Yousef', country: '🇲🇦', goals: 13, concede: 5, points: 8 },
    { name: 'Rami', country: '🇪🇸', goals: 15, concede: 9, points: 6 },
    { name: 'Sanad', country: '🇸🇰', goals: 9, concede: 4, points: 5 },
    { name: 'Elyes', country: '🇹🇳', goals: 8, concede: 4, points: 4 },
    { name: 'Ahmad', country: '🇵🇸', goals: 9, concede: 8, points: 1 },
    { name: 'Muhammad', country: '🇾🇪', goals: 4, concede: 6, points: -2 },
    { name: 'Maryam', country: '🇦🇫', goals: 4, concede: 6, points: -2 },
    { name: 'Nuh', country: '🇦🇫', goals: 5, concede: 7, points: -2 },
    { name: 'Eleen', country: '🇯🇴', goals: 1, concede: 4, points: -3 },
    { name: 'Armaan', country: '🇿🇦', goals: 3, concede: 7, points: -4 },
    { name: 'Zein', country: '🇵🇸', goals: 3, concede: 8, points: -5 },
    { name: 'Sheese', country: '🇦🇫', goals: 2, concede: 7, points: -5 },
    { name: 'Bissan', country: '🇵🇸', goals: 4, concede: 9, points: -5 },
    { name: 'Theo', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', goals: 0, concede: 7, points: -7 },
    { name: 'Ayden', country: '🇺🇸', goals: 0, concede: 7, points: -7 },
  ],
  topScorers: [
    { name: 'Rami', country: '🇪🇸', goals: 15 },
    { name: 'Abdulrahman', country: '🇵🇸', goals: 15 },
    { name: 'Boston', country: '🇺🇸', goals: 14 },
    { name: 'Walid', country: '🇩🇿', goals: 13 },
    { name: 'Yousef', country: '🇲🇦', goals: 13 },
    { name: 'Ahmad', country: '🇵🇸', goals: 9 },
    { name: 'Sanad', country: '🇸🇰', goals: 9 },
    { name: 'Elyes', country: '🇹🇳', goals: 8 },
    { name: 'Nuh', country: '🇦🇫', goals: 5 },
    { name: 'Bissan', country: '🇵🇸', goals: 5 },
    { name: 'Maryam', country: '🇦🇫', goals: 5 },
    { name: 'Muhammad', country: '🇾🇪', goals: 4 },
    { name: 'Zein', country: '🇵🇸', goals: 3 },
    { name: 'Armaan', country: '🇿🇦', goals: 3 },
    { name: 'Sheese', country: '🇦🇫', goals: 3 },
    { name: 'Eleen', country: '🇯🇴', goals: 1 },
    { name: 'Theo', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', goals: 0 },
    { name: 'Ayden', country: '🇺🇸', goals: 0 },
  ],
  fouls: [
    { name: 'Walid', country: '🇩🇿', green: 2, yellow: 5, red: 1 },
    { name: 'Ahmad', country: '🇵🇸', green: 2, yellow: 3, red: 1 },
    { name: 'Abdulrahman', country: '🇵🇸', green: 3, yellow: 2, red: 0 },
    { name: 'Bissan', country: '🇵🇸', green: 3, yellow: 2, red: 0 },
    { name: 'Yousef', country: '🇲🇦', green: 2, yellow: 2, red: 1 },
    { name: 'Sanad', country: '🇸🇰', green: 0, yellow: 1, red: 0 },
    { name: 'Armaan', country: '🇿🇦', green: 2, yellow: 0, red: 0 },
    { name: 'Rami', country: '🇪🇸', green: 2, yellow: 0, red: 0 },
    { name: 'Boston', country: '🇺🇸', green: 1, yellow: 0, red: 0 },
    { name: 'Zein', country: '🇵🇸', green: 1, yellow: 0, red: 0 },
    { name: 'Theo', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', green: 1, yellow: 0, red: 0 },
    { name: 'Ayden', country: '🇺🇸', green: 0, yellow: 0, red: 0 },
    { name: 'Eleen', country: '🇯🇴', green: 0, yellow: 0, red: 0 },
    { name: 'Maryam', country: '🇦🇫', green: 0, yellow: 0, red: 0 },
    { name: 'Nuh', country: '🇦🇫', green: 0, yellow: 0, red: 0 },
    { name: 'Sheese', country: '🇦🇫', green: 0, yellow: 0, red: 0 },
    { name: 'Elyes', country: '🇹🇳', green: 0, yellow: 0, red: 0 },
    { name: 'Muhammad', country: '🇾🇪', green: 0, yellow: 0, red: 0 },
  ],
};

const tournaments = [
  {
    id: 'elite-eight',
    name: 'Hexagon League',
    icon: Trophy,
    color: 'from-[#16a34a] to-[#15803d]',
    glow: '#16a34a',
    available: true,
  },
  {
    id: 'mini-world-cup',
    name: 'Mini World Cup',
    icon: Trophy,
    color: 'from-[#D4AF37] to-[#B8952D]',
    glow: '#D4AF37',
    available: true,
  },
  {
    id: 'fa-cup',
    name: 'Super Cup',
    icon: Trophy,
    color: 'from-[#DC2626] to-[#991B1B]',
    glow: '#DC2626',
    available: true,
  },
  {
    id: 'games-archive',
    name: 'Games Archive',
    icon: Award,
    color: 'from-[#6B7280] to-[#4B5563]',
    glow: '#6B7280',
    available: true,
  },
];

const faCupBracket = {
  semiFinals: [
    { label: 'Semi Final 1', team1: 'League 1st', team2: 'League 3rd' },
    { label: 'Semi Final 2', team1: 'League 2nd', team2: 'League 4th' },
  ],
  final: { team1: 'Winner SF1', team2: 'Winner SF2' },
};

function BracketMatch({ match, accent }) {
  return (
    <div className={`rounded-2xl border p-6 w-full max-w-md mx-auto ${accent === 'gold' ? 'bg-gradient-to-br from-[#D4AF37]/10 to-transparent border-[#D4AF37]/30' : 'bg-white/5 border-white/10'}`}>
      <p className={`text-xs font-semibold uppercase tracking-wider mb-4 text-center ${accent === 'gold' ? 'text-[#D4AF37]' : 'text-[#16a34a]'}`}>{match.label}</p>
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${accent === 'gold' ? 'bg-gradient-to-br from-[#D4AF37] to-[#B8952D] shadow-lg shadow-[#D4AF37]/30' : 'bg-white/10'}`}>🏆</div>
          <span className="text-slate-100 font-semibold text-center text-sm">{match.team1}</span>
        </div>
        <span className={`font-bold text-sm px-4 py-2 rounded-lg border ${accent === 'gold' ? 'text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/30' : 'text-white/40 bg-white/5 border-white/10'}`}>VS</span>
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${accent === 'gold' ? 'bg-gradient-to-br from-[#D4AF37] to-[#B8952D] shadow-lg shadow-[#D4AF37]/30' : 'bg-white/10'}`}>🏆</div>
          <span className="text-slate-100 font-semibold text-center text-sm">{match.team2}</span>
        </div>
      </div>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex justify-center">
      <div className="w-1 h-16 bg-gradient-to-b from-[#16a34a]/60 via-[#22c55e]/60 to-[#16a34a]/60 rounded-full" />
    </div>
  );
}

function FACupSection() {
  return (
    <div className="flex flex-col items-center">
      <BracketMatch match={faCupBracket.semiFinals[0]} />
      <Connector />
      <BracketMatch match={{ label: 'Final', ...faCupBracket.final }} accent="gold" />
      <Connector />
      <BracketMatch match={faCupBracket.semiFinals[1]} />
    </div>
  );
}

export default function MiniWorldCup() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTournament = searchParams.get('tournament') || 'elite-eight';

  const setActiveTournament = (id) => {
    const next = new URLSearchParams(searchParams);
    next.set('tournament', id);
    setSearchParams(next);
  };

  const scorers2024 = [...tournament2024Data.topScorers].sort((a, b) => b.goals - a.goals).slice(0, 5).map(p => ({ name: p.name, country: p.country, value: p.goals }));
  const yellowCards2024 = [...tournament2024Data.fouls].sort((a, b) => (b.yellow || 0) - (a.yellow || 0)).slice(0, 5).map(p => ({ name: p.name, country: p.country, value: p.yellow || 0 }));
  const points2024 = [...tournament2024Data.pointsBoard].sort((a, b) => b.points - a.points).slice(0, 5).map(p => ({ name: p.name, country: p.country, value: p.points }));

  const scorers2026 = [...tournament2026Data.groupStage].sort((a, b) => b.goals - a.goals).slice(0, 5).map(p => ({ name: p.name, country: p.country, value: p.goals }));
  const yellowCards2026 = [...tournament2026Data.groupStage].slice(0, 5).map(p => ({ name: p.name, country: p.country, value: 0 }));
  const points2026 = [...tournament2026Data.groupStage].map(p => ({ name: p.name, country: p.country, value: p.pts !== undefined ? p.pts : p.goals - p.concede })).sort((a, b) => b.value - a.value).slice(0, 5);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#16a34a]/10 to-transparent" />
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#16a34a]/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8952D]">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-100">Tournaments</h1>
              <p className="text-white/50 mt-1">All Competitions • ECCHFA</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tournament Selector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {tournaments.map((t) => {
            const Icon = t.icon;
            const isActive = activeTournament === t.id;
            return (
              <motion.button
                key={t.id}
                onClick={() => t.available && setActiveTournament(t.id)}
                whileHover={{ scale: t.available ? 1.03 : 1 }}
                whileTap={{ scale: t.available ? 0.97 : 1 }}
                className={`relative p-5 rounded-2xl border text-left transition-all duration-300 select-none ${
                  isActive
                    ? 'border-white/30 bg-white/10'
                    : t.available
                    ? 'border-white/10 bg-white/5 hover:bg-white/8 cursor-pointer'
                    : 'border-white/5 bg-white/[0.02] cursor-not-allowed opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-slate-100 font-bold text-lg">{t.name}</p>
                {!t.available && (
                  <span className="text-xs text-white/40 mt-1 block">Data coming soon</span>
                )}
                {isActive && (
                  <div className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full" style={{ background: `linear-gradient(to right, ${t.glow}, transparent)` }} />
                )}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTournament === 'mini-world-cup' && (
          <Tabs
            value={searchParams.get('season') || '2025-26'}
            onValueChange={(v) => {
              const next = new URLSearchParams(searchParams);
              next.set('season', v);
              setSearchParams(next);
            }}
            className="w-full"
          >
            <TabsList className="flex w-full max-w-lg mx-auto mb-8 h-auto">
              <TabsTrigger value="2025-26" className="flex-1 text-[14px]" style={{ minHeight: 44 }}>2026</TabsTrigger>
              <TabsTrigger value="2023-24" className="flex-1 text-[14px]" style={{ minHeight: 44 }}>2024</TabsTrigger>
            </TabsList>

            <TabsContent value="2023-24" className="space-y-8">
              <Leaderboard data={tournament2024Data.leaderboard} />
              <MiniWorldCupStats scorers={scorers2024} yellowCards={yellowCards2024} pointsLeaders={points2024} />
              <GroupStage data={tournament2024Data.groupStage} matches={tournament2024Data.groupMatches} showQualified={true} />
              <KnockoutStage data={tournament2024Data.knockout} />
            </TabsContent>

            <TabsContent value="2025-26" className="space-y-8">
              <p className="text-lg sm:text-xl text-[#D4AF37]/90 text-center font-semibold">Delayed due to the Iranian strikes in Spring and Summer Break</p>
              <MiniWorldCupStats scorers={scorers2026} yellowCards={yellowCards2026} pointsLeaders={points2026} />
              <GroupStage data={tournament2026Data.groupStage} matches={tournament2026Data.groupMatches} showQualified={true} qualifiedPlayers={['Muhammad', 'Ben']} />
              {/* Disciplinary Qualifying Match */}
              <div>
                <h3 className="text-xl font-bold text-slate-100 mb-4">Disciplinary Qualifying Match</h3>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">Walid 🇩🇿</span>
                    <span className="text-slate-100 font-bold px-3">1 - 2</span>
                    <span className="text-white/80">Yazan 🇯🇴</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {activeTournament === 'fa-cup' && (
          <FACupSection />
        )}

        {activeTournament === 'elite-eight' && (
          <HexagonLeague />
        )}

        {activeTournament === 'games-archive' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-100 mb-6">Games Archive</h2>
            {/* Match: Recent */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex-1">
                  <p className="text-slate-100 font-bold text-sm mb-1">Team A</p>
                  <p className="text-white/60 text-xs">Rami, Elyes, Muhammad, Camrick</p>
                </div>
                <div className="text-center px-4">
                  <span className="text-slate-100 font-black text-2xl">7 – 1</span>
                </div>
                <div className="flex-1 text-right">
                  <p className="text-slate-100 font-bold text-sm mb-1">Team B</p>
                  <p className="text-white/60 text-xs">Walid, Amir, Seif, Ben</p>
                </div>
              </div>
              <div className="border-t border-white/10 pt-3 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-[#D4AF37] font-semibold mb-1">⚽ Team A Scorers</p>
                  <p className="text-white/70">Rami (5), Muhammad (1), Elyes (1)</p>
                </div>
                <div className="text-right">
                  <p className="text-[#D4AF37] font-semibold mb-1">Team B Scorers ⚽</p>
                  <p className="text-white/70">Walid (1)</p>
                </div>
              </div>
              <div className="border-t border-white/10 pt-3 mt-3 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-[#D4AF37] font-semibold mb-1">Team A Discipline</p>
                  <p className="text-white/70">Muhammad (1 🟨)</p>
                </div>
                <div className="text-right">
                  <p className="text-[#D4AF37] font-semibold mb-1">Team B Discipline</p>
                  <p className="text-white/70">Walid (1 🟥)</p>
                </div>
              </div>
            </div>
            {/* Match: Aug 27 2025 */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-xs text-white/40 mb-3">August 27, 2025</div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex-1">
                  <p className="text-slate-100 font-bold text-sm mb-1">Team A</p>
                  <p className="text-white/60 text-xs">Mazen, Rami, Muhammad, Sanad, Seif</p>
                </div>
                <div className="text-center px-4">
                  <span className="text-slate-100 font-black text-2xl">4 – 3</span>
                </div>
                <div className="flex-1 text-right">
                  <p className="text-slate-100 font-bold text-sm mb-1">Team B</p>
                  <p className="text-white/60 text-xs">Mohamede, Yazan, Ahmed, Amir</p>
                </div>
              </div>
              <div className="border-t border-white/10 pt-3 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-[#D4AF37] font-semibold mb-1">⚽ Team A Scorers</p>
                  <p className="text-white/70">Rami (1), Mazen (3)</p>
                </div>
                <div className="text-right">
                  <p className="text-[#D4AF37] font-semibold mb-1">Team B Scorers ⚽</p>
                  <p className="text-white/70">Mohamede (1), Yazan (1), Ahmed (1)</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}