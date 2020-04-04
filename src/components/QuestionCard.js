import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export class QuestionCard extends Component {
  render() {
    const { id, name, avatar, text } = this.props;
    return (
      <Card style={{ margin: '5px', width: '100%' }}>
        <CardHeader avatar={<Avatar src={avatar} />} title={`${name} asks`} />

        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            Would you rather {text}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color='primary' variant='contained'>
            {' '}
            <Link to={`/questions/${id}`}>View Poll</Link>{' '}
          </Button>
        </CardActions>
      </Card>
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
    text: optionOne.text,
  };
}

export default connect(mapStateToProps)(QuestionCard);

/* <div>
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
      </div> */
