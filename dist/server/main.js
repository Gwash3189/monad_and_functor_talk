'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _baobab = require('baobab');

var _baobab2 = _interopRequireDefault(_baobab);

var _helpers = require('../shared/helpers');

var _Container = require('../shared/Container');

var _Container2 = _interopRequireDefault(_Container);

var _Applicative = require('../shared/Applicative');

var _Applicative2 = _interopRequireDefault(_Applicative);

var _Continuation = require('../shared/Continuation');

var _Continuation2 = _interopRequireDefault(_Continuation);

var _IO = require('../shared/IO');

var _IO2 = _interopRequireDefault(_IO);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tree = new _baobab2.default({ comments: {} });
var app = (0, _express2.default)();
var http = (0, _http.Server)(app);
var socket = (0, _socket2.default)(http);
var logger = function logger() {
  var _console;

  for (var _len = arguments.length, x = Array(_len), _key = 0; _key < _len; _key++) {
    x[_key] = arguments[_key];
  }

  (_console = console).log.apply(_console, x.concat([new Date()]));
  return logger;
};

exports.default = function (worker, api) {
  var Logger = (0, _Applicative2.default)(logger);
  var Socket = (0, _Container2.default)(socket);
  var Http = (0, _Container2.default)(http);
  var Fetch = (0, _Continuation2.default)('https://www.reddit.com/r/AskReddit/comments/.json?limit=100');
  var State = (0, _IO2.default)({ tree: tree, comments: tree.select('comments') });
  var App = (0, _Container2.default)({ app: app, express: _express2.default }).map(function (_ref) {
    var app = _ref.app;
    var express = _ref.express;

    app.use(express.static(__dirname + '/public'));
    app.use(_bodyParser2.default.json());
    app.use(_bodyParser2.default.urlencoded({ extended: true }));
    return { app: app, express: express };
  });

  (0, _helpers.run)(worker(State, Fetch, Logger), api(App, Socket, Http, Logger, State));
};