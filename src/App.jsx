import { Route } from 'react-router';
import './App.css';
import Header from './components/Header';
import ChattingPage from './pages/ChattingPage';
import MainPage from './pages/MainPage';
import SelectGamePage from './pages/SelectGamePage';
import ChimeSdkWrapper from './lib/ChimeSdkWrapper';
import * as config from './config';
import Welcome from './components/Welcome';
import ChatTest from './components/ChatTest';
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
      {/* <Route path="/test" render={() => <Welcome chime={chime} />} />
      <Route
        path={`${baseHref}/meeting`}
        render={() => <ChatTest chime={chime} />}
      /> */}
      <Route path={`${baseHref}/meeting`}>
        <Meeting chime={chime} />
      </Route>
      <Route path={`${baseHref}/test`}>
        <Home chime={chime} />
      </Route>
    </>
  );
}

export default App;
