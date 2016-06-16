'use strict';

var _bootstrapMin = require('bootstrap/dist/css/bootstrap.min.css');

var bootstrap = _interopRequireWildcard(_bootstrapMin);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _socket = require('socket.io-client');

var _socket2 = _interopRequireDefault(_socket);

var _baobab = require('baobab');

var _baobab2 = _interopRequireDefault(_baobab);

var _IO = require('../shared/IO');

var _IO2 = _interopRequireDefault(_IO);

var _Continuation = require('../shared/Continuation');

var _Continuation2 = _interopRequireDefault(_Continuation);

var _CommentsList = require('./CommentsList');

var _CommentsList2 = _interopRequireDefault(_CommentsList);

var _helpers = require('../shared/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Deps = (0, _IO2.default)({
  document: document,
  dom: _reactDom2.default,
  socket: (0, _IO2.default)((0, _socket2.default)()),
  state: (0, _IO2.default)(new _baobab2.default({ comments: {} })),
  comments: (0, _Continuation2.default)('/comments')
});

(0, _helpers.run)(Deps.map(function (_ref) {
  var document = _ref.document;
  var dom = _ref.dom;
  var socket = _ref.socket;
  var state = _ref.state;
  var comments = _ref.comments;

  dom.render((0, _CommentsList2.default)({ socket: socket, state: state }), document.getElementById('main'));

  return { state: state, comments: comments };
}).map(function (_ref2) {
  var comments = _ref2.comments;
  var state = _ref2.state;
  return { comments: comments.map(_helpers.toJson), state: state };
}).map(function (_ref3) {
  var comments = _ref3.comments;
  var state = _ref3.state;
  return comments.map(function (comments) {
    return state.map((0, _helpers.merge)({ comments: comments }));
  }).map(_helpers.run);
}).map(_helpers.run));