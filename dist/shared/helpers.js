'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ok = exports.updateState = exports.log = exports.stringify = exports.emit = exports.on = exports.seedState = exports.middleware = exports.listen = exports.post = exports.perform = exports.json = exports.map = exports.merge = exports.set = exports.repeat = exports.run = exports.previousData = exports.currentData = exports.call = undefined;
exports.thunk = thunk;
exports.pluck = pluck;
exports.diff = diff;

var _shallowDiff2 = require('shallow-diff');

var _shallowDiff3 = _interopRequireDefault(_shallowDiff2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function thunk(x) {
  return function () {
    return x;
  };
}
var call = exports.call = function call(verb) {
  for (var _len = arguments.length, firstArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    firstArgs[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, secondArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      secondArgs[_key2] = arguments[_key2];
    }

    return function (app) {
      app[verb].apply(app, _toConsumableArray(firstArgs.concat(secondArgs)));
      return app;
    };
  };
};
function pluck(path) {
  return function plucked(obj) {
    return obj[path];
  };
}
var currentData = exports.currentData = function currentData(thing) {
  return pluck('currentData')(pluck('data')(thing));
};
var previousData = exports.previousData = function previousData(thing) {
  return pluck('previousData')(pluck('data')(thing));
};
var run = exports.run = function run() {
  for (var _len3 = arguments.length, IOs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    IOs[_key3] = arguments[_key3];
  }

  return IOs.forEach(function (io) {
    return io.perform();
  });
};
var repeat = exports.repeat = function repeat(io) {
  return {
    every: function every(time) {
      return io.map(function () {
        return setInterval(function () {
          return run(io);
        }, time);
      });
    }
  };
};
var set = exports.set = call('set');
var merge = exports.merge = call('merge');
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
var updateState = exports.updateState = call('updateState');
var ok = exports.ok = thunk({ ok: 'ok' });
function diff(one, two) {
  var _shallowDiff = (0, _shallowDiff3.default)(one, two);

  var added = _shallowDiff.added;


  return added.reduce(function (obj, key) {
    obj[key] = two[key];
    return obj;
  }, {});
}