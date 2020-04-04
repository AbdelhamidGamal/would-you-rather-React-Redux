import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddAnswer } from '../actions/shared';
import { Typography, Divider, Box, Avatar, Container } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

export class ViewQuestion extends Component {
  state = {
    seleted: '',
  };

  changeSelectedOption = (e) => {
    this.setState({ seleted: e.target.value });
  };

  submitChanges = (e) => {
    e.preventDefault();
    this.props.dispatch(
      handleAddAnswer({
        authedUser: this.props.authedUser.id,
        qid: this.props.question.id,
        answer: this.state.seleted,
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
        <Container maxWidth='sm'>
          <Box border={1}>
            <Box display='flex' m={3}>
              <Avatar src={author.avatarURL} />
              <Typography variant='h5'>Asked By {author.name}:</Typography>
            </Box>
            <Divider />
            <Box m={3} textAlign='center'>
              <Typography variant='h6'>Results</Typography>
            </Box>
            <Box border={1} display='flex'>
              <Box border={2} width='50%' textAlign='center' p={2}>
                <Typography>
                  would you rather {question.optionOne.text}
                </Typography>
                <Box>
                  <Box
                    width={optionOneNum / votesNum}
                    bgcolor='grey.300'
                    p={1}
                    my={0.5}
                  >
                    {(optionOneNum / votesNum) * 100}%
                  </Box>
                </Box>
                <Typography>
                  {optionOneNum} votes out of {votesNum} votes
                </Typography>
              </Box>

              <Box border={2} width='50%' textAlign='center' p={2}>
                <Typography>
                  would you rather {question.optionTwo.text}
                </Typography>
                <Box>
                  <Box
                    width={optionTwoNum / votesNum}
                    bgcolor='grey.300'
                    p={1}
                    my={0.5}
                  >
                    {(optionTwoNum / votesNum) * 100}%
                  </Box>
                </Box>
                <Typography>
                  {optionTwoNum} votes out of {votesNum} votes
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      );
    } else {
      return (
        <Container maxWidth='sm'>
          <Box>
            <Box border={1}>
              <Box display='flex' alignContent='center' justifyContent='center'>
                <Avatar src={author.avatarURL} />
                <Typography variant='h6' style={{ paddingTop: '5px' }}>
                  {author.name} asks:{' '}
                </Typography>
              </Box>
              <Box textAlign='center' p={2}>
                <form onSubmit={this.submitChanges}>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>Would you rather</FormLabel>
                    <RadioGroup
                      aria-label='quiz'
                      name='choice'
                      value={this.state.selected}
                      onChange={this.changeSelectedOption}
                    >
                      <FormControlLabel
                        control={<Radio />}
                        label={question.optionOne.text}
                        value='optionOne'
                      />
                      <FormControlLabel
                        control={<Radio />}
                        label={question.optionTwo.text}
                        value='optionTwo'
                      />
                    </RadioGroup>

                    <Button type='submit' variant='outlined' color='primary'>
                      SubmitAnswer
                    </Button>
                  </FormControl>
                </form>
              </Box>
            </Box>
          </Box>
        </Container>
      );
    }
  }
}

function mapStateToProps(state, props) {
  const question = state.questions[props.match.params.id];
  return {
    question,
    author: question ? state.users[question.author] : null,
    authedUser: state.users[state.authedUser.id],
  };
}

export default connect(mapStateToProps)(ViewQuestion);
