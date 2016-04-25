import { polyfill } from 'es6-promise';
import { seedState, updateState, getState } from 'duxanator'
import { pick, compose } from 'ramda';
import fs from 'fs';
import fetch from 'isomorphic-fetch';
import IO from './IO';
import Continuation from './Continuation';
polyfill();
seedState({
  comments: {}
});

const byId = (makers) => makers.reduce((obj, maker) => obj[maker.id] = maker, {});
const toJson = (r) => r.json();
const getComments = ({ data: { children }}) => children
const maker = ({ data : { body, author, id }}) => ({ body, author, id })
const toMakers = (comments) => comments.map(maker)
const containsAlphabet = (maker) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  return alphabet.every(letter => maker.body.indexOf(letter) > -1)
}
const onlyFullAlphabet = (makers) => makers.filter(containsAlphabet);

const repeat = (f, every) => {
  f();
  setInterval(f, every)
}

Continuation(() => fetch('https://www.reddit.com/r/AskReddit/comments/.json?limit=100'))
  .map(toJson)
  .map(getComments)
  .map(toMakers)
  .map((x) => {
    console.log(x);
  })
  .perform();
