import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddAnswer } from '../actions/shared';

export class ViewQuestion extends Component {
  state = {
    seleted: ''
  };

  changeSelectedOption = e => {
    this.setState({ seleted: e.target.value });
  };

  submitChanges = e => {
    e.preventDefault();
    this.props.dispatch(
      handleAddAnswer({
        authedUser: this.props.authedUser.id,
        qid: this.props.question.id,
        answer: this.state.seleted
      })
    );
  };

  render() {
    const { question, author, authedUser } = this.props;

    if (!question) {
      return <div className='center bolder mt5'>404 Poll Dosn't exist!</div>;
    }

    const votesNum =
      question.optionOne.votes.length + question.optionTwo.votes.length;
    const optionOneNum = question.optionOne.votes.length;
    const optionTwoNum = question.optionTwo.votes.length;

    if (Object.keys(authedUser.answers).includes(question.id)) {
      return (
        <div id='questionansweredpage'>
          <h4>Asked By {author.name}:</h4>
          <div className='questionansweredcard'>
            <img src={author.avatarURL} alt='' />
            <div className='questionansweredcardtext'>
              <h2>Results</h2>
              <div>
                <p
                  style={
                    this.props.question.optionOne.votes.includes(authedUser.id)
                      ? { fontWeight: 600 }
                      : { fontWeight: 100 }
                  }
                >
                  would you rather {question.optionOne.text} ?
                </p>
                <p>{(optionOneNum / votesNum) * 100}%</p>
                <p>
                  {optionOneNum} votes out of {votesNum} votes
                </p>
              </div>
              <hr />
              <div>
                <p
                  style={
                    this.props.question.optionTwo.votes.includes(authedUser.id)
                      ? { fontWeight: 600 }
                      : { fontWeight: 100 }
                  }
                >
                  would you rather {question.optionTwo.text} ?
                </p>
                <p>{(optionTwoNum / votesNum) * 100}%</p>
                <p>
                  {optionTwoNum} out of {votesNum} votes
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='unansweredquestionpage'>
          <h3>{author.name} asks:</h3>
          <div className='unansweredquestioncard'>
            <img src={author.avatarURL} alt='' />
            <div className='unansweredquestiontext'>
              <h1>Would you rather</h1>
              <form onSubmit={this.submitChanges}>
                <input
                  type='radio'
                  id='optionOne'
                  name='choice'
                  value='optionOne'
                  onChange={this.changeSelectedOption}
                />
                <label htmlFor='optionOne'>{question.optionOne.text}</label>
                <br />
                <input
                  type='radio'
                  id='optionTwo'
                  name='choice'
                  value='optionTwo'
                  onChange={this.changeSelectedOption}
                />
                <label htmlFor='optionTwo'>{question.optionTwo.text}</label>
                <br />

                <input type='submit' className='btn' value='Submit' />
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state, props) {
  const question = state.questions[props.match.params.id];
  return {
    question,
    author: question ? state.users[question.author] : null,
    authedUser: state.users[state.authedUser.id]
  };
}

export default connect(mapStateToProps)(ViewQuestion);
