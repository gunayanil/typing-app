import React, { useState, useEffect } from 'react';
import { ScoresList, ScoreLI } from '../styled/HighScores';
import { StyledTitle } from '../styled/Misc';

const HighScores = () => {
  const [highScores, setHighScores] = useState([]);

  // callback func itself shouldn't be async, however, we can call async func inside it
  useEffect(() => {
    const loadHighScores = async () => {
      try {
        const res = await fetch('/.netlify/functions/getHighScores');
        const scores = await res.json();
        setHighScores(scores);
      } catch (err) {
        console.error(err);
      }
    };
    loadHighScores();
  }, []);

  return (
    <div>
      <StyledTitle>High Scores</StyledTitle>
      <ScoresList>
        {highScores.map((score, index) => (
          <ScoreLI key={score.id}>
            {index + 1}. {score.fields.name} - {score.fields.score}
          </ScoreLI>
        ))}
      </ScoresList>
    </div>
  );
};

export default HighScores;
