import { useEffect, useRef, useState } from 'react';

// Detail pages that should slide in/out rather than fade.
const DETAIL_PAGES = new Set(['PlayerProfile', 'TeamRoster']);

function getPathSegment(path) {
  return path.replace('/', '').split('/')[0] || 'Home';
}

function isDetailPath(path) {
  return DETAIL_PAGES.has(getPathSegment(path));
}

/**
 * Tracks navigation history to determine whether a route change is a
 * "forward" push (slide right-to-left), a "backward" pop (slide left-to-right),
 * or a "fade" (tab switch between main pages).
 *
 * Returns one of: 'forward' | 'backward' | 'fade'
 */
export function useNavigationDirection(location) {
  const historyRef = useRef([location.pathname]);
  const [direction, setDirection] = useState('fade');

  useEffect(() => {
    const stack = historyRef.current;
    const newPath = location.pathname;
    const lastPath = stack[stack.length - 1];

    if (newPath === lastPath) return;

    const newIsDetail = isDetailPath(newPath);
    const lastIsDetail = isDetailPath(lastPath);

    if (stack.length >= 2 && stack[stack.length - 2] === newPath) {
      // Browser back — popping the stack
      setDirection('backward');
      historyRef.current = stack.slice(0, -1);
    } else if (!newIsDetail && !lastIsDetail) {
      // Switching between main tabs — fade
      setDirection('fade');
      historyRef.current = [newPath];
    } else if (newIsDetail) {
      // Navigating into a detail page — slide forward
      setDirection('forward');
      historyRef.current = [...stack, newPath];
    } else {
      // Coming back from a detail page to a different main page
      setDirection('backward');
      historyRef.current = [newPath];
    }
  }, [location.pathname]);

  return direction;
}