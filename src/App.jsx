import { Route } from 'react-router';
import './App.css';
import MainPage from './pages/MainPage';

function App() {
  return (
    <>
      <Route path="/" exact component={MainPage} />
    </>
  );
}

export default App;
