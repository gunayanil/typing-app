import React, { useState, useEffect } from 'react';
import { ScoresList, ScoreLI } from '../styled/HighScores';

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
      <h1>High Scoress</h1>
      <ScoresList>
        {highScores.map(score => (
          <ScoreLI key={score.id}>
            {score.fields.name} - {score.fields.score}
          </ScoreLI>
        ))}
      </ScoresList>
    </div>
  );
};

export default HighScores;
