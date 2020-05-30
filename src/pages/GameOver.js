import React, { useEffect, useState } from 'react';
import { useScore } from '../context/ScoreContext';
import { StyledLink } from '../styled/Navbar';
import { StyledCharacter } from '../styled/Game';

const GameOver = ({ history }) => {
  const [score] = useScore();
  const [message, setMessage] = useState('');

  if (score === -1) {
    history.push('/');
  }

  useEffect(() => {
    const saveHighScore = async () => {
      try {
        const options = {
          method: 'POST',
          body: JSON.stringify({ name: 'Emre', score }),
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
    saveHighScore();
  }, [score]);

  return (
    <div>
      <h1>Game Over!</h1>
      <StyledCharacter>{score}</StyledCharacter>
      <p>{message}</p>
      <StyledLink to='/'>Go Home</StyledLink>
      <StyledLink to='/game'>Play Again</StyledLink>
    </div>
  );
};

export default GameOver;
