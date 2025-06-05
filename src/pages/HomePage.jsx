import React from 'react';
import NavigationBar from '../components/NavigationBar';
import SpinningGlobe from '../components/SpinningGlobe';

const HomePage = () => {
  return (
    <div>
      <NavigationBar />
      <SpinningGlobe />
      {/* Other content goes here */}
    </div>
  );
};

export default HomePage;