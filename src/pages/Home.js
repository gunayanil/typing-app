import React from 'react';
import CTA from '../styled/CTA';
import { StyledTitle } from '../styled/Misc';

const Home = () => {
  return (
    <div>
      <StyledTitle>Ready to type?</StyledTitle>
      <CTA to='/game'>Click here to start!</CTA>
    </div>
  );
};

export default Home;
