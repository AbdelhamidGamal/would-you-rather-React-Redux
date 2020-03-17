import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/authedUser';

export class Nav extends Component {
  logoutUser = e => {
    e.preventDefault();
    this.props.dispatch(logoutUser());
  };

  render() {
    return (
      <ul className='container'>
        <nav className='navbar'>
          <ul className='navlist'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/leaderboard'>Leaderboard</Link>
            </li>
            <li>
              <Link to='/new'>New Question</Link>
            </li>
          </ul>
          <div className='navuser'>
            <p>Welcome {this.props.authedUser.name}</p>
            <button onClick={this.logoutUser} className='btn'>
              logout
            </button>
          </div>
        </nav>
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    authedUser: state.authedUser
  };
}

export default connect(mapStateToProps)(Nav);
