import React, { Component } from 'react';
import { State } from 'duxanator';

import UserList from '../UserList/UserList'

export default class App extends Component {
  getUsers({ users }) {
    return users;
  }

  render() {
    return (
      <State pluck={this.getUsers}>
        <UserList />
      </State>
    )
  }
}
