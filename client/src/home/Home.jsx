import axios from 'axios';
import React, { Component } from 'react';
import { Button, Chip, CircularProgress, Grid, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight, Search } from '@material-ui/icons';
import './home.css';
import CircularLoader from '../components/CircularLoader';
import { abbreviate_number } from '../components/abbreviate_number';
import HeroCards from '../components/HeroCards';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptoList: [],
      uiList: [],
      startIndex: 0,
      endIndex: 5,
      isLoader: true,
      pagination: {
        rowsPerPage: 5,
        page: 0,
        search: '',
        count: 0,
      },
    };
  }
  componentDidMount() {
    axios
      .get('/api/fetchstockdetails')
      .then(result => {
        const { pagination, startIndex, endIndex } = this.state;
        this.setState({ cryptoList: result.data.data, isLoader: false, pagination: { ...pagination, count: result.data?.data?.length }, uiList: result.data.data.slice(startIndex, endIndex) });
      })
      .catch(err => {
        console.error(err);
      });
  }
  saveData = cryptodata => {
    axios
      .post('/api/insert', cryptodata, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(result => {
        alert('Data Saved Sucessfully');
        this.setState({ uiList: this.state.uiList.map(ele => (ele.details.symbol === cryptodata.details.symbol ? { ...ele, id: result.data.id } : ele)) });
      })
      .catch(err => console.error(err));
  };
  viewData = e => {
    e.preventDefault();
    this.props.history.push('/view');
  };
  handleSearch = e => {
    try {
      const { cryptoList, startIndex, endIndex, pagination } = this.state;
      let value = e.target.value;
      let matched = cryptoList.filter(ele => ele.details.name.match(value.trim()));
      this.setState({
        uiList: matched.slice(startIndex, endIndex),
        pagination: { ...this.state.pagination, search: value, count: matched.length },
      });
    } catch (e) {}
  };
  handlePage = (e, page, start, end) => {
    try {
      e.preventDefault();
      const { pagination, cryptoList, count } = this.state;
      end = count < end ? count : end;
      this.setState({ pagination: { ...pagination, page: page }, startIndex: start, endIndex: end, uiList: cryptoList.slice(start, end) });
    } catch (e) {}
  };
  render() {
    const {
      uiList,
      pagination: { rowsPerPage, search, count, page },
      startIndex,
      endIndex,
      isLoader,
    } = this.state;
    return (
      <Grid container spacing={3}>
        {isLoader ? (
          <CircularLoader />
        ) : (
          <Grid item xs>
            <HeroCards />
            <TableContainer component={Paper} className='table-container'>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell size='small' align='center'>
                      <strong> Stock Details Table</strong>
                    </TableCell>
                    <TableCell size='small' align='left' colSpan={3}>
                      <TextField
                        placeholder='search by company name'
                        variant='filled'
                        margin='dense'
                        fullWidth
                        value={search}
                        inputProps={{
                          style: { padding: '10px' },
                        }}
                        className='text-field'
                        InputProps={{
                          disableUnderline: true,
                          startAdornment: (
                            <InputAdornment position='start' style={{ margin: 0 }}>
                              <Search style={{ fontSize: '25px', opacity: '0.5' }} />
                            </InputAdornment>
                          ),
                        }}
                        onChange={this.handleSearch}
                      />
                    </TableCell>
                    <TableCell />
                  </TableRow>
                  <TableRow className='table-head'>
                    <TableCell align='center' size='small'>
                      Company Name
                    </TableCell>
                    <TableCell align='center' size='small'>
                      symbol
                    </TableCell>
                    <TableCell align='center' size='small'>
                      Market Cap
                    </TableCell>
                    <TableCell align='center' size='small'></TableCell>
                    <TableCell align='center' size='small'>
                      Current price
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {uiList.length === 0 && (
                    <TableRow>
                      <TableCell size='small' align='center' colSpan={5}>
                        <Typography>No Records</Typography>
                      </TableCell>
                    </TableRow>
                  )}

                  {uiList.map(ele => (
                    <TableRow>
                      <TableCell size='small' align='center'>
                        {ele.details.name}
                      </TableCell>
                      <TableCell size='small' align='center'>
                        <Chip
                          size='small'
                          style={{ color: '#4A4AFF', padding: '5px' }}
                          label={
                            <strong>
                              <li>{ele.details.symbol}</li>
                            </strong>
                          }
                        />
                      </TableCell>
                      <TableCell size='small' align='center'>
                        {abbreviate_number(ele.rates.cap || 0, 0)}
                      </TableCell>
                      <TableCell size='small' align='center'>
                        {ele.id ? (
                          <Button variant='contained' className='view-button' onClick={this.viewData}>
                            View
                          </Button>
                        ) : (
                          <Button variant='contained' className='save-button' onClick={() => this.saveData(ele)}>
                            Save Data
                          </Button>
                        )}
                      </TableCell>
                      <TableCell size='small' align='center'>
                        {abbreviate_number(ele.rates.rate || 0)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter className='footer-head'>
                  <TableRow>
                    <TableCell colSpan={3}></TableCell>
                    <TableCell colSpan={2} align='right'>
                      {count && page * rowsPerPage + 1}-{count >= (page + 1) * rowsPerPage ? (page + 1) * rowsPerPage : count} of {count}
                      <IconButton disabled={page === 0} onClick={e => this.handlePage(e, page - 1, startIndex - 5, endIndex - 5)}>
                        <KeyboardArrowLeft />
                      </IconButton>
                      <IconButton disabled={count === 0 || count <= endIndex} onClick={e => this.handlePage(e, page + 1, startIndex + 5, endIndex + 5)}>
                        <KeyboardArrowRight />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Grid>
        )}
      </Grid>
    );
  }
}

export default Home;
