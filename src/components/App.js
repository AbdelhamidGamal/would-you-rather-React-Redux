import React, { Component, Fragment } from 'react';
import Login from './Login';
import New from './New';
import { connect } from 'react-redux';
import { handleReciveData } from '../actions/shared';
import Home from './Home';
import Leaderboard from './Leaderboard';
import ViewQuestion from './ViewQuestion';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './Nav';

export class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleReciveData());
  }

  render() {
    const { authedUser } = this.props;
    if (!authedUser.name) {
      return <Login />;
    }

    return (
      <BrowserRouter>
        <Fragment>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/new' component={New} />
            <Route exact path='/leaderboard' component={Leaderboard} />
            <Route exact path='/questions/:id' component={ViewQuestion} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    authedUser: state.authedUser
  };
}

export default connect(mapStateToProps)(App);
