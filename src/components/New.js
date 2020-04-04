import React, { Component } from 'react';
import { handleCreateNewQuestion } from '../actions/shared';
import { connect } from 'react-redux';
import { Container, Typography, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

export class New extends Component {
  state = {
    optionA: '',
    optionB: '',
  };

  changeValues = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addPoll = (e) => {
    e.preventDefault();
    if (this.state.optionA !== '' && this.state.optionB !== '') {
      this.props.dispatch(
        handleCreateNewQuestion({
          author: this.props.authedUser.id,
          optionOneText: this.state.optionA,
          optionTwoText: this.state.optionB,
        })
      );
      this.props.history.push('/');
    } else {
      alert('Please Fill Both Options');
    }
  };

  render() {
    return (
      <Container maxWidth='sm' style={{ marginTop: '10px' }}>
        <Typography style={{ textAlign: 'center' }} variant='h5'>
          Create New Question
        </Typography>
        <form onSubmit={this.addPoll}>
          <Typography style={{ textAlign: 'center' }}>
            Would you rather ..
          </Typography>
          <TextField
            value={this.state.optionA}
            onChange={this.changeValues}
            name='optionA'
            placeholder='Enter option 1 text here'
            variant='outlined'
            fullWidth
          />
          <Typography style={{ textAlign: 'center' }}>or</Typography>
          <TextField
            value={this.state.optionB}
            onChange={this.changeValues}
            name='optionB'
            placeholder='Enter option 2 text here'
            variant='outlined'
            fullWidth
          />
          <Button
            style={{ marginTop: '10px' }}
            onClick={this.addPoll}
            fullWidth
            variant='contained'
            color='primary'
            type='submit'
          >
            Add poll
          </Button>
        </form>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    authedUser: state.authedUser,
  };
}

export default connect(mapStateToProps)(New);

{
  /* <div id='newquestion'>
<h1>Create New Question</h1>
<form onSubmit={this.addPoll}>
  <p></p>
  <input
    type='text'
    value={this.state.optionA}
    onChange={this.changeValues}
    name='optionA'
    placeholder='Enter option 1 text here'
  />
  <p>or</p>
  <input
    type='text'
    value={this.state.optionB}
    onChange={this.changeValues}
    name='optionB'
    placeholder='Enter option 2 text here'
  />
  <input className='btn' type='submit' value='Submit' />
</form>
</div> */
}
