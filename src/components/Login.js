import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authedUser';
import {
  Container,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';

export class Login extends Component {
  state = {
    user: '',
  };

  changeUser = (e) => {
    e.preventDefault();
    this.setState({ user: e.target.value });
  };

  loginUser = (e) => {
    e.preventDefault();
    this.props.dispatch(loginUser(this.props.users[this.state.user]));
  };

  render() {
    const users = this.props.users;
    return (
      <Container maxWidth='xs' style={{ marginTop: '20vh' }}>
        <FormControl required style={{ width: '100%' }}>
          <InputLabel id='PleaseLoginLabel'>Please Login</InputLabel>
          <Select
            labelId='PleaseLoginLabel'
            id='loginSelect'
            value={this.state.user}
            onChange={this.changeUser}
          >
            {Object.keys(users).map((key) => (
              <MenuItem key={key} value={key}>
                {users[key].name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Required</FormHelperText>
          <Button onClick={this.loginUser} variant='contained' color='primary'>
            Submit
          </Button>
        </FormControl>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

export default connect(mapStateToProps)(Login);
