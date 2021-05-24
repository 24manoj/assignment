import React, { Component, useState } from 'react';
import propTypes from 'prop-types';
import { Card, CardContent, Grid, makeStyles, Typography, withStyles } from '@material-ui/core';

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
    };
  }
  dragstart = e => {
    // e.preventDefault();
    this.setState({ dragindex: e.currentTarget.id });
  };
  dragsover = (e, i) => {
    console.log('drag stiopp', e.currentTarget.id);
    this.props.onDrop(this.state.dragindex, e.currentTarget.id);
    // e.preventDefault();
    // setdragindex(i);
  };
  render() {
    const { cards } = this.props;
    const { dragindex } = this.state;
    const { classes } = this.props;

    return (
      <Grid container spacing={3} style={{ width: '100%' }}>
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
