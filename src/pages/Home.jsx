import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CountdownTimer from '../components/shared/CountdownTimer';

export default function Home() {
  return (
    <div className="h-[calc(100dvh-5rem)] overflow-hidden flex flex-col sm:h-auto sm:overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 shrink-0">
        <CountdownTimer />
      </div>
      <HeroSection />
    </div>
  );
}