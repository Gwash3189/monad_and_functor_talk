'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var thunk = exports.thunk = function thunk(x) {
  return function () {
    return x;
  };
};
var call = exports.call = function call(verb) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return function (app) {
      app[verb].apply(app, args);
      return app;
    };
  };
};
var repeat = exports.repeat = function repeat(f) {
  return {
    every: function every(_every) {
      f();
      setInterval(f, _every);
    }
  };
};
var map = exports.map = function map(functor, func) {
  return function () {
    return functor.map(func);
  };
};
var json = exports.json = call('json');
var perform = exports.perform = call('perform');
var post = exports.post = call('post');
var listen = exports.listen = call('listen');
var middleware = exports.middleware = call('middleware');
var seedState = exports.seedState = call('seedState');
var on = exports.on = call('on');
var emit = exports.emit = call('emit');
var stringify = exports.stringify = call('stringify');
var log = exports.log = call('log');
var ok = exports.ok = thunk({ ok: 'ok' });