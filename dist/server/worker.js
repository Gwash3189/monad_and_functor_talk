'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.work = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _IO = require('../shared/IO');

var _IO2 = _interopRequireDefault(_IO);

var _helpers = require('../shared/helpers');

var _Continuation = require('../shared/Continuation');

var _Continuation2 = _interopRequireDefault(_Continuation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var work = exports.work = (0, _helpers.thunk)(function (State, Fetch) {
  return (0, _Continuation2.default)(Fetch).map(toJson).map(getComments).map(toMakers).map((0, _helpers.map)(State, (0, _helpers.updateState)({ comments: comments }))).map(_helpers.perform);
});

exports.default = function (State, Fetch) {
  return (0, _IO2.default)(function () {
    (0, _helpers.repeat)(work(State, Fetch)).every(seconds(30));
  });
};