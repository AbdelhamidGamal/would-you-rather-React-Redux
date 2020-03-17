import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authedUser';

export class Login extends Component {
  state = {
    user: ''
  };

  changeUser = e => {
    e.preventDefault();
    this.setState({ user: e.target.value });
  };

  loginUser = e => {
    e.preventDefault();
    this.props.dispatch(loginUser(this.props.users[this.state.user]));
  };

  render() {
    const users = this.props.users;
    return (
      <div className='login'>
        <label htmlFor='usernames'>
          <p className='logintext'>Please Login</p>
        </label>
        <form onSubmit={this.loginUser}>
          <select
            defaultValue={this.state.user}
            onChange={this.changeUser}
            id='usernames'
          >
            <option hidden value=''></option>
            {Object.keys(users).map(key => (
              <option key={key} value={key}>
                {users[key].name}
              </option>
            ))}
          </select>
          <button className='btn btn-dark login-button'>Login</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

export default connect(mapStateToProps)(Login);
