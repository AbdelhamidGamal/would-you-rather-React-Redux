import React, { Component, Fragment } from 'react';
import QuestionCard from './QuestionCard';
import { connect } from 'react-redux';
import { Button, Paper, Container } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export class Home extends Component {
  render() {
    const { authedUser, questions } = this.props;
    return (
      <Container maxWidth='sm' style={{ marginTop: '10px' }}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography>Unanswered Questions</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div style={{ width: '100%' }}>
              {' '}
              {Object.keys(questions)
                .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
                .map((key) => {
                  if (!Object.keys(authedUser.answers).includes(key)) {
                    return <QuestionCard key={key} id={key} />;
                  }
                  return '';
                })}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography>Answered Questions</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div style={{ width: '100%' }}>
              {Object.keys(questions)
                .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
                .map((key) => {
                  if (Object.keys(authedUser.answers).includes(key)) {
                    return <QuestionCard key={key} id={key} />;
                  }
                  return '';
                })}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    authedUser: state.users[state.authedUser.id],
    questions: state.questions,
  };
}

export default connect(mapStateToProps)(Home);
