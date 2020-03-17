import React, { Component } from 'react';
import { handleCreateNewQuestion } from '../actions/shared';
import { connect } from 'react-redux';

export class New extends Component {
  state = {
    optionA: '',
    optionB: ''
  };

  changeValues = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addPoll = e => {
    e.preventDefault();
    if (this.state.optionA !== '' && this.state.optionB !== '') {
      this.props.dispatch(
        handleCreateNewQuestion({
          author: this.props.authedUser.id,
          optionOneText: this.state.optionA,
          optionTwoText: this.state.optionB
        })
      );
      this.props.history.push('/');
    } else {
      alert('Please Fill Both Options');
    }
  };

  render() {
    return (
      <div id='newquestion'>
        <h1>Create New Question</h1>
        <form onSubmit={this.addPoll}>
          <p>Would you rather ..</p>
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authedUser: state.authedUser
  };
}

export default connect(mapStateToProps)(New);
