import { polyfill } from 'es6-promise';
import { seedState, updateState, getState } from 'duxanator'
import fs from 'fs';
import fetch from 'isomorphic-fetch';
import IO from '../shared/IO';
import Continuation from '../shared/Continuation';
polyfill();

const joinState = (updateState) => (x) => updateState((state) => ({ ...state.comments, comments: x }))
const toJson = (r) => r.json();
const getComments = ({ data: { children }}) => children
const maker = ({ data : { body, author, id }}) => ({ body, author, id })
const toMakers = (comments) => comments.map(maker);
const seconds = (x) => x * 1000

const repeat = (f) => {
  return {
    every: (every) => {
      f();
      setInterval(f, every)
    }
  }
}

repeat(() => {
  Continuation(() => fetch('https://www.reddit.com/r/AskReddit/comments/.json?limit=100'))
    .map(toJson)
    .map(getComments)
    .map(toMakers)
    .map(joinState(updateState))
    .perform();
})
.every(seconds(30));
