import { Button, Chip, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import Axios from 'axios';
import React, { Component } from 'react';
import { abbreviate_number } from '../components/abbreviate_number';
import CircularLoader from '../components/CircularLoader';
import '../home/home.css';
export default class ViewData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uiList: [],
      startIndex: 0,
      endIndex: 5,
      isLoader: true,
    };
  }
  componentDidMount() {
    Axios.get('/api/fetchviewdata')
      .then(result => {
        this.setState({ uiList: result.data.data, isLoader: false });
      })
      .catch(err => {
        console.error(err);
      });
  }
  goBack = () => {
    this.props.history.goBack();
  };
  deleteData = id => {
    try {
      Axios.post('/api/delete', { id: id })
        .then(deleted => {
          const { uiList } = this.state;
          let list = uiList.filter(ele => ele._id !== id);
          alert('Record Deleted sucessfully');
          this.setState({ uiList: list });
        })
        .catch(err => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  };
  render() {
    const { uiList, isLoader } = this.state;
    return (
      <Grid container spacing={3}>
        {isLoader ? (
          <CircularLoader />
        ) : (
          <Grid item xs>
            <TableContainer component={Paper} className='table-container'>
              <Table>
                <TableHead className='table-head'>
                  <TableRow>
                    <TableCell size='small' align='center' colSpan={5}>
                      <strong> SAVED DATA TABLE</strong>
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
                        {ele.companyName}
                      </TableCell>
                      <TableCell size='small' align='center'>
                        <Chip
                          size='small'
                          style={{ color: '#6690E3', padding: '5px' }}
                          label={
                            <strong>
                              <li>{ele.symbols}</li>
                            </strong>
                          }
                        />
                      </TableCell>
                      <TableCell size='small' align='center'>
                        {abbreviate_number((ele.marketCap && ele.marketCap.$numberDecimal) || 0, 2)}
                      </TableCell>
                      <TableCell size='small' align='center'>
                        {ele._id && (
                          <Button variant='contained' className='view-button' onClick={() => this.deleteData(ele._id)}>
                            DELETE
                          </Button>
                        )}
                      </TableCell>
                      <TableCell size='small' align='center'>
                        {abbreviate_number((ele.currentRate && ele.currentRate.$numberDecimal) || 0, 2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter className='footer-head'>
                  <TableRow>
                    <TableCell colSpan={5} align='center'>
                      <Button className='view-button' style={{ margin: 5 }} onClick={this.goBack}>
                        Back
                      </Button>
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
