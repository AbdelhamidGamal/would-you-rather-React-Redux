import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/authedUser';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      justifyContent: 'center'
    },
    mr2: {
      marginRight: theme.spacing(2),
      marginTop: '5px'
    },
    title: {
      flexGrow: 1
    }
  })
);

const Nav = props => {
  const logoutU = e => {
    e.preventDefault();
    props.dispatch(logoutUser());
  };

  const classes = useStyles();

  return (
    <Container maxWidth='md'>
      <div>
        <AppBar position='static'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignContent: 'center',
              alignItems: 'center',
              padding: '10px'
            }}
          >
            <div>
              <Link className={classes.mr2} to='/'>
                Home
              </Link>

              <Link className={classes.mr2} to='/leaderboard'>
                Leaderboard
              </Link>

              <Link className={classes.mr2} to='/new'>
                New Question
              </Link>
            </div>
            <div style={{ display: 'flex' }}>
              <Typography className={classes.mr2}>
                Welcome {props.authedUser.name}
              </Typography>
              <Button onClick={logoutU}>logout</Button>
            </div>
          </div>
        </AppBar>
      </div>
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    authedUser: state.authedUser
  };
}

export default connect(mapStateToProps)(Nav);
