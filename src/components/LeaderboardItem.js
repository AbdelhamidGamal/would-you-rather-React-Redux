import React, { Component } from 'react';
import { connect } from 'react-redux';

export class LeaderboardItem extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <div className='leadercard'>
          <img src={user.avatarURL} alt='' />
          <div>
            <h2>{user.name}</h2>
            <p>Answered questions {Object.keys(user.answers).length}</p>
            <p>Created questions {user.questions.length}</p>
          </div>
          <div>
            <span>Score :</span>{' '}
            <span className='score'>
              {Object.keys(user.answers).length + user.questions.length}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToPros(state, props) {
  const { id } = props;
  return {
    user: state.users[id]
  };
}

export default connect(mapStateToPros)(LeaderboardItem);
