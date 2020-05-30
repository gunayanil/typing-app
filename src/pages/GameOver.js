import React, { useEffect, useState } from 'react';
import { useScore } from '../context/ScoreContext';
import { useAuth0 } from '../auth';
import { StyledLink } from '../styled/Navbar';
import { StyledCharacter } from '../styled/Game';
import { StyledTitle } from '../styled/Misc';

const GameOver = ({ history }) => {
  const [score] = useScore();
  const [message, setMessage] = useState('');
  const { getTokenSilently, isAuthenticated } = useAuth0();

  if (score === -1) {
    history.push('/');
  }

  useEffect(() => {
    const saveHighScore = async () => {
      try {
        const token = await getTokenSilently();
        const options = {
          method: 'POST',
          body: JSON.stringify({ name: 'Emre', score }),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await fetch('/.netlify/functions/saveHighScore', options);
        const data = await res.json();

        if (data.id) {
          setMessage('Congrats! You got a high score.');
        } else {
          setMessage('Not enough. Keep trying!');
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (isAuthenticated) {
      saveHighScore();
    }
  }, [getTokenSilently, isAuthenticated, score]);

  return (
    <div>
      <StyledTitle>Game Over!</StyledTitle>
      <h2>{message}</h2>
      {!isAuthenticated && (
        <h3>
          You should log in or sign up to save your score and compete others.
        </h3>
      )}
      <StyledCharacter>{score}</StyledCharacter>
      <div>
        <StyledLink to='/'>Go Home</StyledLink>
      </div>
      <div>
        <StyledLink to='/game'>Play Again</StyledLink>
      </div>
    </div>
  );
};

export default GameOver;
