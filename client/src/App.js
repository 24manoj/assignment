import Header from './components/Header.jsx';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Home from './home/Home';
import ViewData from './viewData/ViewData';

function App() {
  return (
    <div className='app-main'>
      <div className='app-container'>
        <div className='app-header'>
          <Header />
        </div>
        <div className='app-main-content-wrapper'>
          <Router>
            <Route exact path='/' render={() => <Redirect to='/home' />} />
            <Route exact path='/Home' component={Home} />
            <Route exact path='/View' component={ViewData} />
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
