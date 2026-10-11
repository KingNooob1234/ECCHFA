import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TARGET = new Date('2026-10-02T19:00:00').getTime();

function getTimeLeft() {
  const diff = TARGET - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  };
}

const units = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
];

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    let id;
    const start = () => {
      setTime(getTimeLeft());
      id = setInterval(() => setTime(getTimeLeft()), 1000);
    };
    const stop = () => { if (id) clearInterval(id); };
    const onVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };
    start();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  if (time.done) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#16a34a]/10 via-[#22c55e]/10 to-[#16a34a]/10 backdrop-blur-sm px-5 py-4"
    >
      <p className="text-center text-[14px] font-semibold uppercase tracking-widest text-white/60 mb-3">
        {time.done ? 'Hexagon League has started' : 'Hexagon League kicks off in'}
      </p>
      <div className="flex items-center justify-center gap-3 sm:gap-5">
        {units.map((u, i) => (
          <div key={u.key} className="flex items-center gap-3 sm:gap-5">
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-4xl font-black text-slate-100 tabular-nums leading-none">
                {String(time[u.key]).padStart(2, '0')}
              </span>
              <span className="text-[14px] sm:text-sm uppercase tracking-wider text-white/60 mt-1">{u.label}</span>
            </div>
            {i < units.length - 1 && <span className="text-2xl sm:text-3xl font-bold text-white/30">:</span>}
          </div>
        ))}
      </div>
    </motion.div>
  );
}