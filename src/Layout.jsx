import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Menu, X, Trophy, Users, Home, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileTabBar from './components/MobileTabBar';

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', page: 'Home', icon: Home },
    { name: 'Rankings', page: 'Rankings', icon: Trophy },
    { name: 'Players', page: 'Players', icon: Users },
    { name: 'Tournaments', page: 'MiniWorldCup', icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-[#18181b] text-slate-100">
      <style>{`
        :root {
          --space-gray: #242428;
          --space-gray-light: #2e2e33;
          --accent-green: #16a34a;
          --accent-green-light: #22c55e;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .gradient-text {
          background: linear-gradient(135deg, #fff 0%, #22c55e 50%, #fff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-glow:hover {
          text-shadow: 0 0 20px rgba(22, 163, 74, 0.5);
        }
      `}</style>

      {/* Navigation */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[#18181b]/95 backdrop-blur-xl border-b border-white/5 select-none"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand */}
            <h1 className="text-2xl font-bold tracking-tight">ECCHFA</h1>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
              {navItems.map((item) => {
                const isActive = currentPageName === item.page;
                return (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 nav-glow ${
                      isActive
                        ? 'text-slate-100 bg-white/10'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-[#16a34a] to-[#22c55e] rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="sm:hidden p-2.5 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center"
              style={{ minHeight: 44, minWidth: 44 }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden border-t border-white/5 bg-[#18181b]/98 backdrop-blur-xl select-none"
            >
              <nav className="px-4 py-4 space-y-1" aria-label="Mobile">
                {navItems.map((item) => {
                  const isActive = currentPageName === item.page;
                  return (
                    <Link
                      key={item.page}
                      to={createPageUrl(item.page)}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-[#16a34a]/20 to-transparent text-slate-100'
                          : 'text-white/60 hover:bg-white/5 hover:text-white'
                      }`}
                      style={{ minHeight: 44 }}
                    >
                      <span className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        {item.name}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {children}
        {/* Spacer to clear the fixed bottom tab bar (tablet widths only) */}
        <div className="hidden sm:block lg:hidden" style={{ height: 'calc(env(safe-area-inset-bottom) + 72px)' }} />
      </main>

      {/* Footer */}
      <footer className="hidden md:block bg-[#18181b] border-t border-white/5 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#16a34a] to-[#22c55e] flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold">ECCHFA</p>
                <p className="text-[14px] text-white/60">Education City Community Housing Football Association</p>
              </div>
            </div>
            <p className="text-[14px] text-white/60">© 2024 ECCHFA. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Mobile bottom tab bar */}
      <MobileTabBar />
    </div>
  );
}