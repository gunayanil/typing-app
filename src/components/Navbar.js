import React from 'react';
import { Link } from 'react-router-dom';
import {
  StyledNavbar,
  StyledNavBrand,
  StyledNavItems,
  StyledLink,
  StyledButtonLink,
} from '../styled/Navbar';
import { StyledButton } from '../styled/Button';
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
            <StyledButtonLink onClick={loginWithRedirect}>
              Login
            </StyledButtonLink>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <StyledButtonLink onClick={logout}>Logout</StyledButtonLink>
          </li>
        )}
        <StyledButton onClick={toggleTheme}>
          {' '}
          {theme === 'dark' ? 'Light' : 'Dark'} Theme
        </StyledButton>
      </StyledNavItems>
    </StyledNavbar>
  );
};

export default Navbar;
