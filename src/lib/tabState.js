// Maps route path segments to their parent bottom-tab.
// Detail pages (PlayerProfile, TeamRoster) belong to a primary tab
// so the tab bar highlights correctly and tab clicks restore the
// last visited subpage of that tab.
export const ROUTE_TO_TAB = {
  '': 'Home',
  Home: 'Home',
  Rankings: 'Rankings',
  Players: 'Players',
  PlayerProfile: 'Players',
  MiniWorldCup: 'MiniWorldCup',
  TeamRoster: 'MiniWorldCup',
  Account: 'Account',
};

const STORAGE_PREFIX = 'ecchfa_tab_state_';

export function getTabFromPath(pathname) {
  const segment = pathname.replace('/', '').split('/')[0] || 'Home';
  return ROUTE_TO_TAB[segment] || segment;
}

export function saveTabState(pathname, search = '') {
  const tab = getTabFromPath(pathname);
  try {
    sessionStorage.setItem(STORAGE_PREFIX + tab, pathname + search);
  } catch (e) {
    /* sessionStorage unavailable — silently ignore */
  }
}

export function getTabState(tab) {
  try {
    return sessionStorage.getItem(STORAGE_PREFIX + tab);
  } catch (e) {
    return null;
  }
}