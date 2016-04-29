'use strict';

var _repl = require('repl');

var _repl2 = _interopRequireDefault(_repl);

var _es6Promise = require('es6-promise');

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _http = require('http');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _duxanator = require('duxanator');

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _worker = require('./worker');

var _worker2 = _interopRequireDefault(_worker);

var _Container = require('../shared/Container');

var _Container2 = _interopRequireDefault(_Container);

var _Applicative = require('../shared/Applicative');

var _Applicative2 = _interopRequireDefault(_Applicative);

var _Continuation = require('../shared/Continuation');

var _Continuation2 = _interopRequireDefault(_Continuation);

var _IO = require('../shared/IO');

var _IO2 = _interopRequireDefault(_IO);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _es6Promise.polyfill)();

var app = (0, _express2.default)();
var http = (0, _http.Server)(app);
var socket = (0, _socket2.default)(http);
var logs = [];
var logger = function logger() {
  for (var _len = arguments.length, x = Array(_len), _key = 0; _key < _len; _key++) {
    x[_key] = arguments[_key];
  }

  logs.push.apply(logs, x.concat([new Date()]));
  return logger;
};
var Logger = (0, _Applicative2.default)(logger);
var Socket = (0, _Container2.default)(socket);
var Http = (0, _Container2.default)(http);
var Fetch = (0, _Continuation2.default)('https://www.reddit.com/r/AskReddit/comments/.json?limit=100');
var State = (0, _IO2.default)({ listen: _duxanator.listen, middleware: _duxanator.middleware, seedState: _duxanator.seedState, updateState: _duxanator.updateState, getState: _duxanator.getState });
var App = (0, _Container2.default)({ app: app, express: _express2.default }).map(function (_ref) {
  var app = _ref.app;
  var express = _ref.express;

  app.use(express.static(__dirname + '/public'));
  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  return { app: app, express: express };
});
var replServer = _repl2.default.start({
  prompt: "CommentStream > "
});

replServer.context.getState = _duxanator.getState;
replServer.context.State = State;
replServer.context.Logs = logs;
replServer.context.Fetch = Fetch;
replServer.context.App = App;
replServer.context.Socket = Socket;
replServer.context.Http = Http;

(0, _main2.default)(_state2.default, _worker2.default, _api2.default)(State, Logger, Fetch, App, Socket, Http);