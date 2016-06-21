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

var _Applicative = require('../shared/Applicative');

var _Applicative2 = _interopRequireDefault(_Applicative);

var _Continuation = require('../shared/Continuation');

var _Continuation2 = _interopRequireDefault(_Continuation);

var _IO = require('../shared/IO');

var _IO2 = _interopRequireDefault(_IO);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tree = new _baobab2.default({ comments: {} });
var app = (0, _express2.default)();
var http = (0, _http.Server)(app);
var socket = (0, _socket2.default)(http);
var logger = function logger(name) {
  return function () {
    var _console;

    for (var _len = arguments.length, x = Array(_len), _key = 0; _key < _len; _key++) {
      x[_key] = arguments[_key];
    }

    (_console = console).log.apply(_console, x.concat([new Date(), name]));
    return logger;
  };
};

exports.default = function (_ref) {
  var worker = _ref.worker;
  var api = _ref.api;

  var ApiLogger = (0, _Applicative2.default)(logger('; API'));
  var AskRedditLogger = (0, _Applicative2.default)(logger('; ASK REDDIT'));
  var FunnyLogger = (0, _Applicative2.default)(logger('; FUNNY'));
  var GW2Logger = (0, _Applicative2.default)(logger('; GW2'));
  var Socket = (0, _IO2.default)(socket);
  var AskReddit = (0, _Continuation2.default)('https://www.reddit.com/r/AskReddit/comments/.json?limit=100');
  var Funny = (0, _Continuation2.default)('https://www.reddit.com/r/funny/comments/.json?limit=100');
  var GW2 = (0, _Continuation2.default)('https://www.reddit.com/r/guildwars2/comments/.json?limit=100');
  var State = (0, _IO2.default)({ tree: tree, comments: tree.select('comments') });

  app.use(_express2.default.static(__dirname + '/public'));
  app.use(function (req, res, next) {
    req.map = function (f) {
      f(req);
      return req;
    };

    res.map = function (f) {
      f(res);
      return res;
    };

    next();
  });

  (0, _helpers.run)(worker({ State: State, Fetch: AskReddit, Logger: AskRedditLogger }), worker({ State: State, Fetch: Funny, Logger: FunnyLogger }), worker({ State: State, Fetch: GW2, Logger: GW2Logger }), api({
    app: app,
    Socket: Socket,
    http: http,
    Logger: ApiLogger,
    State: State
  }));
};