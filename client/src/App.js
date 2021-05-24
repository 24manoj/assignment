import logo from './logo.svg';
import Header from './components/Header.jsx';
import './App.css';
import HeroCards from './components/HeroCards';
import FB from './Assets/FB.png';
import GOOGL from './Assets/GOOGL.png';
import AMZN from './Assets/AMZN.svg';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Home from './home/Home';
import { useState } from 'react';
import { Grid } from '@material-ui/core';
import ViewData from './viewData/ViewData';
const cardList = [
  {
    title: 'GOOGL',
    img: GOOGL,
    amt: '1515USD',
  },
  {
    title: 'FB',
    img: FB,
    amt: '266USD',
  },
  {
    title: 'AMZN',
    img: AMZN,
    amt: '3116USD',
  },
];

function App() {
  // let match = useRouteMatch();

  const [cards, setCards] = useState(cardList);
  const onDrop = (start, drop) => {
    let temp = cards[start];
    cards[start] = cards[drop];
    cards[drop] = temp;
    setCards(cards);
  };
  return (
    <div className='app-main'>
      <div className='app-container'>
        <div className='app-header'>
          <Header />
        </div>
        <div className='app-main-content-wrapper'>
          <HeroCards cards={cards} onDrop={onDrop} key={Date.now()} />
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
