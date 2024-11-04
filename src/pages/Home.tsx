import React from 'react';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import Features from '../components/home/Features';
import Pricing from '../components/home/Pricing';

const Home = () => {
  return (
    <div className="bg-white">
      <Hero />
      <Stats />
      <Features />
      <Pricing />
    </div>
  );
};

export default Home;