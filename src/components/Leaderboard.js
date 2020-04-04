import React, { Component } from 'react';
import LeaderboardItem from './LeaderboardItem';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import { Container } from '@material-ui/core';

export class Leaderboard extends Component {
  render() {
    const { users } = this.props;
    const usersSorted = Object.keys(users).sort(
      (a, b) =>
        users[b].questions.length +
        Object.keys(users[b].answers).length -
        (users[a].questions.length + Object.keys(users[a].answers).length)
    );

    return (
      <Container maxWidth='sm' style={{ marginTop: '10px' }}>
        <List>
          {usersSorted.map((id) => (
            <LeaderboardItem key={id} id={id} />
          ))}
        </List>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

export default connect(mapStateToProps)(Leaderboard);
