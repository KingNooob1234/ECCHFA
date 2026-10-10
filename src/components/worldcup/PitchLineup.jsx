import React from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { createPageUrl } from '@/utils';

function PlayerDot({ player, playerId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (playerId) {
      navigate(createPageUrl(`PlayerProfile?id=${playerId}`));
    }
  };

  return (
    <div
      className={`flex flex-col items-center gap-1 ${playerId ? 'cursor-pointer group' : ''}`}
      onClick={handleClick}
    >
      <div className="relative">
        <div className={`w-11 h-11 rounded-full bg-[#1a3a6b] border-2 border-white/70 flex items-center justify-center shadow-lg transition-transform ${playerId ? 'group-hover:scale-110 group-hover:border-[#D4AF37]' : ''}`}>
          <span className="text-white font-black text-sm">{player.rating}</span>
        </div>
        {player.captain && (
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#D4AF37] flex items-center justify-center shadow">
            <span className="text-[#0a0e1a] text-[9px] font-black">C</span>
          </div>
        )}
      </div>
      <div className="text-center">
        <div className={`text-white font-semibold text-[11px] leading-tight drop-shadow-lg ${playerId ? 'group-hover:text-[#D4AF37]' : ''}`}>{player.name}</div>
        <div className="text-white/80 text-[10px] leading-tight">{player.nationality}</div>
      </div>
    </div>
  );
}

function arrangeRows(lineup) {
  const gk = lineup.filter(p => p.position === 'Goalkeeper');
  const def = lineup.filter(p => ['Defender', 'Left Back', 'Right Back'].includes(p.position));
  const mid = lineup.filter(p => ['Midfield', 'Left Wing', 'Right Wing'].includes(p.position));
  const fwd = lineup.filter(p => ['Attacker', 'Forward'].includes(p.position));
  const rows = [];
  if (fwd.length) rows.push(fwd);
  if (mid.length) rows.push(mid);
  if (def.length) rows.push(def);
  if (gk.length) rows.push(gk);
  return rows;
}

export default function PitchLineup({ teamName, lineup, teamRating, logo }) {
  const rows = arrangeRows(lineup || []);

  const { data: players = [] } = useQuery({
    queryKey: ['players-for-lineup'],
    queryFn: () => base44.entities.Player.list(),
  });

  const getPlayerId = (name) => {
    const found = players.find(p => p.name.toLowerCase() === name.toLowerCase());
    return found?.id || null;
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Team Header */}
      <div className="flex items-center gap-2 px-1">
        {logo && (
          <img src={logo} alt={teamName} className="w-7 h-7 object-contain flex-shrink-0" style={{ mixBlendMode: 'screen' }} />
        )}
        <span className="text-slate-900 font-bold text-sm truncate">{teamName}</span>
        <span className="ml-auto flex-shrink-0 text-xs font-black px-2 py-0.5 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#60a5fa]">
          {teamRating} OVR
        </span>
      </div>

      {/* Pitch */}
      <div className="relative rounded-xl overflow-hidden" style={{ minHeight: '300px' }}>
        {/* Green pitch stripes */}
        <div className="absolute inset-0" style={{
          background: 'repeating-linear-gradient(180deg, #2d7a2d 0px, #2d7a2d 37px, #266a26 37px, #266a26 74px)',
        }} />

        {/* Pitch SVG markings */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 300" preserveAspectRatio="none">
          <rect x="8" y="8" width="264" height="284" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <line x1="8" y1="150" x2="272" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <circle cx="140" cy="150" r="32" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <circle cx="140" cy="150" r="2" fill="rgba(255,255,255,0.5)" />
          {/* Top box */}
          <rect x="72" y="8" width="136" height="52" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <rect x="104" y="8" width="72" height="22" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          {/* Bottom box */}
          <rect x="72" y="240" width="136" height="52" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <rect x="104" y="270" width="72" height="22" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        </svg>

        {/* Players */}
        <div className="relative z-10 flex flex-col justify-around h-full py-5" style={{ minHeight: '300px' }}>
          {rows.map((row, ri) => (
            <div key={ri} className="flex justify-around items-center px-2">
              {row.map((player, pi) => (
                <PlayerDot key={pi} player={player} playerId={getPlayerId(player.name)} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}