import React, { Component, useState } from 'react';
import propTypes from 'prop-types';
import { Card, CardContent, Grid, makeStyles, Typography, withStyles } from '@material-ui/core';
import FB from '../Assets/FB.png';
import GOOGL from '../Assets/GOOGL.png';
import AMZN from '../Assets/AMZN.svg';

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

const style = theme => ({
  root: {
    backgroundColor: '#efefef',
    border: '1px dotted #d0d0d0',
  },
  content: {
    minHeight: 150,
    paddingTop: '27px',
  },
  flexCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
  },
});
class HeroCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dragindex: 0,
      cards: cardList,
    };
  }
  // const [cards, setCards] = useState(cardList);
  // const onDrop = (start, drop) => {
  //   let temp = cards[start];
  //   cards[start] = cards[drop];
  //   cards[drop] = temp;
  //   console.log('dddf', cards);

  //   setCards(cards);
  // };
  dragstart = e => {
    // e.preventDefault();
    this.setState({ dragindex: e.currentTarget.id });
  };
  dragsover = (e, i) => {
    let id = e.currentTarget?.id;
    let { dragindex, cards } = this.state;
    if (id !== undefined) {
      let temp = cards[dragindex];
      cards[dragindex] = cards[id];
      cards[id] = temp;
      this.setState({ cards: cards });
    }
  };
  render() {
    const { cards } = this.state;
    const { classes } = this.props;
    console.log('cards', cards);
    return (
      <Grid container spacing={3} style={{ width: '100%', marginBottom: '20px' }}>
        <Grid item lg={12} sm={12} md={12} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {cards.map((card, i) => {
            return (
              <Grid item lg={3} sm={5} md={3} xs={12} style={{ marginBottom: 10 }}>
                <Card className={classes.root} key={`${card.title}${i}`} id={i} draggable onDragOver={ev => ev.preventDefault()} onDrop={this.dragsover} onDragStart={this.dragstart}>
                  <CardContent className={classes.content}>
                    <div style={{ textAlign: 'center' }}>
                      <div className={classes.flexCard}>
                        <Typography>{card.title || ''}</Typography>
                        {card.img && <img src={card.img} width='50' height='50' />}
                      </div>
                      {card.amt && <h1> {card.amt} </h1>}
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    );
  }
}
HeroCards.propTypes = {
  cards: propTypes.array.isRequired,
};
export default withStyles(style)(HeroCards);
