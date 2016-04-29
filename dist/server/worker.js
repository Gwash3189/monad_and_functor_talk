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
  var over_18 = _ref2$data.over_18;
  return { body: body, author: author, id: id, over_18: over_18 };
};
var toMakers = function toMakers(comments) {
  return comments.map(maker);
};
var seconds = function seconds(x) {
  return x * 1000;
};

var work = exports.work = function work(State, Fetch, Logger) {
  Logger.ap('Fetching comments');
  return Fetch.map(toJson).map(getComments).map(toMakers).map(function (comments) {
    Logger.ap('Running State Update');
    return State.map((0, _helpers.updateState)(function (state) {
      return _extends({}, state.comments, { comments: comments });
    }));
  }).map((0, _helpers.perform)()).map(function () {
    return Logger.ap('Finished fetching comments');
  });
};

exports.default = function (State, Fetch, Logger) {
  return (0, _IO2.default)(function () {
    Logger.ap('Worker running');
    (0, _helpers.repeat)(function () {
      return (0, _helpers.run)(work(State, Fetch, Logger));
    }).every(seconds(30));
  });
};