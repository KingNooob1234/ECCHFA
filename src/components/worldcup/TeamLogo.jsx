import React from 'react';

// Renders a team's logo image, falling back to a color-coded initial
// badge (matching RankingsTable's team avatar style) when no logo is
// available for that team.
export default function TeamLogo({ teamName, teams = [], className = 'w-8 h-8' }) {
  const team = teams.find((t) => t.name === teamName);

  if (team?.logo) {
    return (
      <img
        src={team.logo}
        alt={teamName}
        className={`${className} rounded-lg object-contain shrink-0`}
      />
    );
  }

  const gradient = team?.color || 'from-[#6B7280] to-[#4B5563]';

  return (
    <div
      className={`${className} rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-xs font-bold shrink-0`}
    >
      {teamName?.charAt(0) || '?'}
    </div>
  );
}
