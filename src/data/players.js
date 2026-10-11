import players from './players.json';

// Local replacement for the base44 Player entity API. Player data now lives
// in players.json, committed to the repo, so it's editable here directly
// instead of through a backend.

export function listPlayers(sortKey, limit) {
  let result = [...players];

  if (sortKey) {
    const desc = sortKey.startsWith('-');
    const field = desc ? sortKey.slice(1) : sortKey;
    result.sort((a, b) => {
      const av = a[field] ?? 0;
      const bv = b[field] ?? 0;
      if (av < bv) return desc ? 1 : -1;
      if (av > bv) return desc ? -1 : 1;
      return 0;
    });
  }

  if (limit) {
    result = result.slice(0, limit);
  }

  return result;
}

export function getPlayer(id) {
  return players.find((p) => p.id === id) ?? null;
}
