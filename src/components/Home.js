import React, { Component } from 'react';
import QuestionCard from './QuestionCard';
import { connect } from 'react-redux';

export class Home extends Component {
  showAndHide = e => {
    e.preventDefault();
    if (e.target.name === 'unanswered') {
      document.getElementById('unanswered').style.display = 'block';
      document.getElementById('answered').style.display = 'none';
    } else if (e.target.name === 'answered') {
      document.getElementById('unanswered').style.display = 'none';
      document.getElementById('answered').style.display = 'block';
    }
  };

  render() {
    const { authedUser, questions } = this.props;
    return (
      <div>
        <div className='showandhide'>
          <button onClick={this.showAndHide} name='unanswered' className='btn'>
            Unanswered Questions
          </button>
          <button onClick={this.showAndHide} name='answered' className='btn'>
            answered Questions
          </button>
        </div>
        <div id='unanswered' className='questions-block'>
          {Object.keys(questions).map(key => {
            if (!Object.keys(authedUser.answers).includes(key)) {
              return <QuestionCard key={key} id={key} />;
            }
            return '';
          })}
        </div>

        <div id='answered' className='questions-block'>
          {Object.keys(questions).map(key => {
            if (Object.keys(authedUser.answers).includes(key)) {
              return <QuestionCard key={key} id={key} />;
            }
            return '';
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authedUser: state.users[state.authedUser.id],
    questions: state.questions
  };
}

export default connect(mapStateToProps)(Home);
