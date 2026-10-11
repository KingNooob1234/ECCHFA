import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Trophy, Users, Award } from 'lucide-react';
import { createPageUrl } from '../utils';
import { getTabFromPath, getTabState } from '@/lib/tabState';

const tabs = [
  { name: 'Home', page: 'Home', icon: Home },
  { name: 'Rankings', page: 'Rankings', icon: Trophy },
  { name: 'Players', page: 'Players', icon: Users },
  { name: 'Tournaments', page: 'MiniWorldCup', icon: Award },
];

export default function MobileTabBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentTab = getTabFromPath(location.pathname);

  const handleTabClick = (tab) => {
    const saved = getTabState(tab.page);
    navigate(saved || createPageUrl(tab.page));
  };

  return (
    <nav
      aria-label="Primary"
      className="hidden sm:block lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#18181b]/95 backdrop-blur-xl border-t border-white/10 select-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-stretch justify-around">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.page;
          const Icon = tab.icon;
          return (
            <button
              key={tab.page}
              type="button"
              onClick={() => handleTabClick(tab)}
              aria-label={tab.name}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-colors ${
                isActive ? 'text-slate-100' : 'text-white/60'
              }`}
              style={{ minHeight: 44 }}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-full bg-gradient-to-r from-[#16a34a] to-[#22c55e]" />
              )}
              <Icon className="w-5 h-5" />
              <span className="text-[14px] font-medium leading-none">{tab.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}