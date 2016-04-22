import React, { Component } from 'react';
import { map } from 'ramda';

import User from './../User/User'

export default class App extends Component {
  render() {
    return (
      <ul>
        {map(this.props.users, (user) => {
          return <User key={user.id}  {...user}/>
        })}
      </ul>
    )
  }
}
