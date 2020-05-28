import React from 'react';
import { Link } from 'react-router-dom';
import {
  StyledNavbar,
  StyledNavBrand,
  StyledNavItems,
  StyledLink,
} from '../styled/Navbar';

const Navbar = () => {
  return (
    <StyledNavbar>
      <StyledNavBrand>
        <Link to='/'>Type!</Link>
      </StyledNavBrand>
      <StyledNavItems>
        <li>
          <StyledLink to='/'>Home</StyledLink>
        </li>
        <li>
          <StyledLink to='/highscores'>High Scores</StyledLink>
        </li>
      </StyledNavItems>
    </StyledNavbar>
  );
};

export default Navbar;
