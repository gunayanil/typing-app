import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import HighScores from './pages/HighScores';
import GameOver from './pages/GameOver';
import Navbar from './components/Navbar';
import { useAuth0 } from './auth';
import useTheme from './hooks/UseTheme';
import { Container } from './styled/Container';
import { Main } from './styled/Main';
import GlobalStyle from './styled/Global';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styled/Themes';

function App() {
  const { loading } = useAuth0();
  const [theme, toggleTheme] = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <Router>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle />
        <Main>
          {loading && <p>Loading</p>}
          {!loading && (
            <Container>
              <Navbar theme={theme} toggleTheme={toggleTheme} />
              <Switch>
                <Route path='/game' component={Game} />
                <Route path='/highscores' component={HighScores} />
                <Route path='/gameover' component={GameOver} />
                <Route path='/' component={Home} />
              </Switch>
            </Container>
          )}
        </Main>
      </ThemeProvider>
    </Router>
  );
}

export default App;
