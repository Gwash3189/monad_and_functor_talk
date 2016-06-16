'use strict';

var _es6Promise = require('es6-promise');

var _repl = require('repl');

var _repl2 = _interopRequireDefault(_repl);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _worker = require('./worker');

var _worker2 = _interopRequireDefault(_worker);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _es6Promise.polyfill)();

var tree = new _baobab2.default({ comments: {} });
var app = (0, _express2.default)();
var http = (0, _http.Server)(app);
var socket = (0, _socket2.default)(http);
var logs = [];
var logger = function logger() {
  for (var _len = arguments.length, x = Array(_len), _key = 0; _key < _len; _key++) {
    x[_key] = arguments[_key];
  }

  logs.push([].concat(x, [new Date()]));
  return logger;
};

var Logger = (0, _Applicative2.default)(logger);
var Socket = (0, _Container2.default)(socket);
var Http = (0, _Container2.default)(http);
var Fetch = (0, _Continuation2.default)('https://www.reddit.com/r/AskReddit/comments/.json?limit=100');
var State = (0, _IO2.default)({ tree: tree, comments: tree.select('comments') });
var App = (0, _Container2.default)({ app: app }).map(function (_ref) {
  var app = _ref.app;
  var express = _ref.express;

  app.use(express.static(__dirname + '/public'));
  return { app: app, express: express };
});
var replServer = _repl2.default.start({ prompt: 'CommentStream > ' });

replServer.context.map = function (fun, mon) {
  return mon.map(fun);
};
replServer.context.Logs = logs;
replServer.context.State = State;
replServer.context.Fetch = Fetch;
replServer.context.App = App;
replServer.context.Socket = Socket;
replServer.context.Http = Http;

(0, _helpers.run)((0, _worker2.default)({ State: State, Fetch: Fetch, Logger: Logger }), (0, _api2.default)({
  App: App,
  Socket: Socket,
  Http: Http,
  Logger: Logger,
  State: State
}));