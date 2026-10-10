import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, RefreshCw } from 'lucide-react';
import { queryClientInstance } from '@/lib/query-client';

const THRESHOLD = 70;
const MAX_PULL = 110;

export default function PullToRefresh({ children }) {
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(null);
  const active = useRef(false);

  useEffect(() => {
    // Only enable on touch / small screens
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch) return;

    const onTouchStart = (e) => {
      if (window.scrollY > 0 || refreshing) return;
      startY.current = e.touches[0].clientY;
      active.current = true;
    };

    const onTouchMove = (e) => {
      if (!active.current || startY.current === null || refreshing) return;
      if (window.scrollY > 0) { active.current = false; setPull(0); return; }
      const delta = e.touches[0].clientY - startY.current;
      if (delta <= 0) { setPull(0); return; }
      //阻尼
      const damped = Math.min(MAX_PULL, delta * 0.5);
      setPull(damped);
    };

    const onTouchEnd = async () => {
      if (!active.current) return;
      active.current = false;
      if (pull >= THRESHOLD && !refreshing) {
        setRefreshing(true);
        setPull(THRESHOLD);
        try {
          await queryClientInstance.invalidateQueries();
        } catch (e) {
          // ignore
        }
        await new Promise((r) => setTimeout(r, 600));
        setRefreshing(false);
      }
      setPull(0);
      startY.current = null;
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [pull, refreshing]);

  const progress = Math.min(1, pull / THRESHOLD);

  return (
    <>
      {(pull > 0 || refreshing) && (
        <div
          className="fixed left-0 right-0 z-[60] flex items-center justify-center pointer-events-none"
          style={{ top: `calc(env(safe-area-inset-top) + ${pull}px)` }}
        >
          <motion.div
            animate={{ rotate: refreshing ? 360 : 0 }}
            transition={{ duration: refreshing ? 0.8 : 0, repeat: refreshing ? Infinity : 0, ease: 'linear' }}
            className={`w-9 h-9 rounded-full flex items-center justify-center border ${
              refreshing ? 'border-[#0066FF] bg-[#0066FF]/10' : 'border-white/20 bg-white/5'
            }`}
          >
            {refreshing ? (
              <Loader2 className="w-5 h-5 text-[#0066FF] animate-spin" />
            ) : (
              <RefreshCw className="w-5 h-5 text-white/60" style={{ opacity: progress }} />
            )}
          </motion.div>
        </div>
      )}
      {children}
    </>
  );
}