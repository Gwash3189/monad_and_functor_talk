import { polyfill } from 'es6-promise';
import React, { Component } from 'react';
import { updateState, middleware, seedState, State } from 'duxanator';
import ReactDOM from 'react-dom';
polyfill();

import App from './components/App/App'
import { STORAGE_KEY } from './constants';
import { doc, users, json } from './global';
import styles from './main.css';

const appElement = doc.map(document => document.getElementById('app'))

const state = users.perform()
            ? users.perform()
            : { users: [] };

seedState(state);

middleware((state) => {
  return storage
    .flatMap(storage => {
      return json.map(json => {
        storage.setItem(STORAGE_KEY, json.stringify(state))
      });
    }).perform();
});

ReactDOM.render(<App />, appElement.perform())
