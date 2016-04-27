'use strict';

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
var logger = function logger() {
  var _console;

  (_console = console).log.apply(_console, arguments);
  return logger;
};

var Fetch = (0, _IO2.default)('https://www.reddit.com/r/AskReddit/comments/.json?limit=100');
var State = (0, _IO2.default)({ listen: _duxanator.listen, middleware: _duxanator.middleware, seedState: _duxanator.seedState });
var App = (0, _Container2.default)({ app: app, express: _express2.default }).map(function (args) {
  app.use(_express2.default.static(__dirname + '/public'));
  app.use(_bodyParser2.default.json());
  return app.use(_bodyParser2.default.urlencoded({ extended: true }));
});
(0, _state2.default)(State).perform();
(0, _worker2.default)(Fetch).perform();
(0, _api2.default)(App, (0, _Container2.default)(socket), (0, _Container2.default)(http), (0, _Applicative2.default)(logger), State);