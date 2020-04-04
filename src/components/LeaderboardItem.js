import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export class LeaderboardItem extends Component {
  render() {
    const { user } = this.props;
    return (
      <Box
        border={1}
        style={{ width: '400px', margin: '5px auto', padding: '10px' }}
      >
        <ListItem
          alignItems='flex-start'
          style={{ width: '250px', margin: 'auto' }}
        >
          <ListItemAvatar>
            <Avatar alt='Remy Sharp' src={user.avatarURL} />
          </ListItemAvatar>
          <ListItemText
            primary={user.name}
            secondary={
              <React.Fragment>
                <Typography component='span' variant='body2'>
                  Answered questions {Object.keys(user.answers).length}
                </Typography>
                <br />
                <Typography component='span' variant='body2'>
                  Created questions {user.questions.length}
                </Typography>
                <br />
                <Typography component='span'>
                  Score :{' '}
                  <Typography color='primary' component='span'>
                    {Object.keys(user.answers).length + user.questions.length}
                  </Typography>{' '}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </Box>
    );
  }
}

function mapStateToPros(state, props) {
  const { id } = props;
  return {
    user: state.users[id],
  };
}

export default connect(mapStateToPros)(LeaderboardItem);

// <div>
// <div className='leadercard'>
//   <img src={user.avatarURL} alt='' />
//   <div>
//     <h2>{user.name}</h2>
//     <p>Answered questions {Object.keys(user.answers).length}</p>
//     <p>Created questions {user.questions.length}</p>
//   </div>
// <div>
//   <span>Score :</span>{' '}
//   <span className='score'>
//     {Object.keys(user.answers).length + user.questions.length}
//   </span>
// </div>
// </div>
// </div>
