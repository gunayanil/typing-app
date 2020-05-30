import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import HighScores from './pages/HighScores';
import GameOver from './pages/GameOver';
import Navbar from './components/Navbar';
import { useAuth0 } from './auth';
import { Container } from './styled/Container';
import { Main } from './styled/Main';
import GlobalStyle from './styled/Global';

function App() {
  const { loading } = useAuth0();

  return (
    <Router>
      <GlobalStyle />
      <Main>
        {loading && <p>Loading</p>}
        {!loading && (
          <Container>
            <Navbar />
            <Switch>
              <Route path='/game' component={Game} />
              <Route path='/highscores' component={HighScores} />
              <Route path='/gameover' component={GameOver} />
              <Route path='/' component={Home} />
            </Switch>
          </Container>
        )}
      </Main>
    </Router>
  );
}

export default App;
