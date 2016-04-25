'use strict';

var _es6Promise = require('es6-promise');

var _duxanator = require('duxanator');

var _ramda = require('ramda');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _IO = require('./IO');

var _IO2 = _interopRequireDefault(_IO);

var _Continuation = require('./Continuation');

var _Continuation2 = _interopRequireDefault(_Continuation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _es6Promise.polyfill)();
(0, _duxanator.seedState)({
  comments: {}
});

var byId = function byId(makers) {
  return makers.reduce(function (obj, maker) {
    return obj[maker.id] = maker;
  }, {});
};
var toJson = function toJson(r) {
  return r.json();
};
var getComments = function getComments(_ref) {
  var children = _ref.data.children;
  return children;
};
var maker = function maker(_ref2) {
  var _ref2$data = _ref2.data;
  var body = _ref2$data.body;
  var author = _ref2$data.author;
  var id = _ref2$data.id;
  return { body: body, author: author, id: id };
};
var toMakers = function toMakers(comments) {
  return comments.map(maker);
};
var containsAlphabet = function containsAlphabet(maker) {
  var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  return alphabet.every(function (letter) {
    return maker.body.indexOf(letter) > -1;
  });
};
var onlyFullAlphabet = function onlyFullAlphabet(makers) {
  return makers.filter(containsAlphabet);
};

var repeat = function repeat(f, every) {
  f();
  setInterval(f, every);
};

(0, _Continuation2.default)(function () {
  return (0, _isomorphicFetch2.default)('https://www.reddit.com/r/AskReddit/comments/.json?limit=100');
}).map(toJson).map(getComments).map(toMakers).map(function (x) {
  console.log(x);
}).perform();