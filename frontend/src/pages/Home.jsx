import React from 'react';

import Hero from '../components/home/hero';
import Features from '../components/home/features';
import Reviews from '../components/home/Reviews';
const Home = () => {
  return (
    <div>
      <Hero />
      <Features/>
      <Reviews/>
    </div>
  );
};

export default Home;
