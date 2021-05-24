import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import logo from '../Assets/quickapps.png';
import './Header.css';
const Header = props => {
  return (
    <Grid item lg={12} md={12} sm={12} className='header'>
      <img src={logo} width={100} />
    </Grid>
  );
};
export default Header;
