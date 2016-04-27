'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _es6Promise = require('es6-promise');

var _duxanator = require('duxanator');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _IO = require('../shared/IO');

var _IO2 = _interopRequireDefault(_IO);

var _Continuation = require('../shared/Continuation');

var _Continuation2 = _interopRequireDefault(_Continuation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _es6Promise.polyfill)();

var joinState = function joinState(updateState) {
  return function (x) {
    return updateState(function (state) {
      return _extends({}, state.comments, { comments: x });
    });
  };
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
var seconds = function seconds(x) {
  return x * 1000;
};

var repeat = function repeat(f) {
  return {
    every: function every(_every) {
      f();
      setInterval(f, _every);
    }
  };
};

repeat(function () {
  (0, _Continuation2.default)(function () {
    return (0, _isomorphicFetch2.default)('https://www.reddit.com/r/AskReddit/comments/.json?limit=100');
  }).map(toJson).map(getComments).map(toMakers).map(joinState(_duxanator.updateState)).perform();
}).every(seconds(30));