import React from 'react';
import { Link } from 'react-router-dom';
import {
  StyledNavbar,
  StyledNavBrand,
  StyledNavItems,
  StyledLink,
} from '../styled/Navbar';
import { useAuth0 } from '../auth';

const Navbar = ({ toggleTheme, theme }) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

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
        {!isAuthenticated && (
          <li>
            <button onClick={loginWithRedirect}>Login</button>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        )}
        <button onClick={toggleTheme}>
          {' '}
          {theme === 'dark' ? 'Light' : 'Dark'} Theme
        </button>
      </StyledNavItems>
    </StyledNavbar>
  );
};

export default Navbar;
