import { Route } from 'react-router';
import './App.css';
import Header from './components/Header';
import ChattingPage from './pages/ChattingPage';
import MainPage from './pages/MainPage';
import SelectGamePage from './pages/SelectGamePage';

function App() {
  return (
    <>
      <Header />
      <Route path="/" exact component={SelectGamePage} />
      <Route path="/chat" component={ChattingPage} />
    </>
  );
}

export default App;
