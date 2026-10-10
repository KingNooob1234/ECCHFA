import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CountdownTimer from '../components/shared/CountdownTimer';

export default function Home() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <CountdownTimer />
      </div>
      <HeroSection />
    </div>
  );
}