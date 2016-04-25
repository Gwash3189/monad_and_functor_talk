'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var thunk = function thunk(x) {
  return function () {
    return x;
  };
};
var isAPromise = function isAPromise(x) {
  return x.then && typeof x.then === 'function';
};

var IO = function IO(value) {
  var val = isAPromise(value) ? value : new Promise(function (resolve, reject) {
    resolve(value);
  });

  var api = {
    value: val,
    perform: function perform() {
      return api.value();
    },
    of: function of(x) {
      return IO(x);
    },
    map: function map(func) {
      return IO((0, _ramda.compose)(func, api.value));
    },
    flatMap: function flatMap(func) {
      return IO(func(api.value()).value);
    }
  };

  return api;
};

exports.default = IO;