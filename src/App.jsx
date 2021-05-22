import { Route } from 'react-router';
import './App.css';
import Header from './components/Header';
import ChattingPage from './pages/ChattingPage';
import SelectGamePage from './pages/SelectGamePage';
import ChimeSdkWrapper from './lib/ChimeSdkWrapper';
import * as config from './config';
import Home from './components/chat/Welcome';
import Meeting from './components/chat/Meeting';

function App() {
  const chime = new ChimeSdkWrapper();
  const baseHref = config.BASE_HREF;

  return (
    <>
      <Header />
      <Route path="/" exact render={() => <SelectGamePage chime={chime} />} />
      <Route path="/chat" render={() => <ChattingPage chime={chime} />} />
      <Route path="/meeting">
        <Meeting chime={chime} />
      </Route>
    </>
  );
}

export default App;
