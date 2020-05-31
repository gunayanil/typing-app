import React, { useState, useEffect, useCallback } from 'react';
import {
  StyledGame,
  StyledScore,
  StyledTimer,
  StyledCharacter,
} from '../styled/Game';
import { Strong } from '../styled/Misc';
import { useScore } from '../context/ScoreContext';

const Game = ({ history }) => {
  const MAX_SECONDS = 13;
  const characters = 'abcdefghijklmnoprstuvwxyz0123456789';
  const [currentChar, setCurrentChar] = useState('');
  const [score, setScore] = useScore(0);
  const [ms, setMs] = useState(0);
  const [seconds, setSeconds] = useState(MAX_SECONDS);

  useEffect(() => {
    setRandomChar();
    setScore(0);
    const currentTime = new Date().getTime();
    const interval = setInterval(() => updateTime(currentTime), 1);
    return () => clearInterval(interval);
  }, []);

  const setRandomChar = () => {
    const randomInt = Math.floor(Math.random() * 35);
    setCurrentChar(characters[randomInt]);
  };

  const updateTime = startTime => {
    const endTime = new Date().getTime();
    const msDiff = (endTime - startTime).toString();
    const formattedMSDiff = ('0000' + msDiff).slice(-5);
    const updatedSeconds =
      MAX_SECONDS - parseInt(formattedMSDiff.substring(0, 2)) - 1;
    const updatedMs =
      1000 - parseInt(formattedMSDiff.substring(formattedMSDiff.length - 3));
    // better formatting
    setSeconds(updatedSeconds.toString().padStart(2, '0'));
    setMs(updatedMs.toString().padStart(3, '0'));
  };

  useEffect(() => {
    if (seconds <= -1) {
      history.push('/gameover');
    }
  }, [ms, seconds, history]);

  const keyUpHandler = useCallback(
    e => {
      if (e.key === currentChar) {
        setScore(prevScore => prevScore + 1);
      } else {
        if (score > 0) {
          setScore(prevScore => prevScore - 1);
        }
      }
      setRandomChar();
    },
    [currentChar]
  );

  useEffect(() => {
    document.addEventListener('keyup', keyUpHandler);
    return () => {
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, [keyUpHandler]);

  return (
    <StyledGame>
      <StyledScore>
        Score: <Strong>{score}</Strong>
      </StyledScore>
      <StyledCharacter>{currentChar}</StyledCharacter>
      <StyledTimer>
        Time:{' '}
        <Strong>
          {seconds}: {ms}
        </Strong>
      </StyledTimer>
    </StyledGame>
  );
};

export default Game;
