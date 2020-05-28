import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link to='/'>Type!</Link>
      </div>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/highscores'>High Scores</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
