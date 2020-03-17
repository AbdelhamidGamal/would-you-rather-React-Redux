import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class QuestionCard extends Component {
  render() {
    const { id, name, avatar, text } = this.props;
    return (
      <div>
        <div className='question-card'>
          <div>
            <p>{name} asks:</p>
          </div>
          <div className='question-card-info'>
            <img src={avatar} alt='' />
            <div className='question-card-text'>
              <p>Would you rather</p>
              <p>..{text}...</p>
              <Link to={`/questions/${id}`} className='btn'>
                View Poll
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { id } = props;
  const { author, optionOne } = state.questions[id];
  const user = state.users[author];

  return {
    id,
    name: user.name,
    avatar: user.avatarURL,
    text: optionOne.text
  };
}

export default connect(mapStateToProps)(QuestionCard);
