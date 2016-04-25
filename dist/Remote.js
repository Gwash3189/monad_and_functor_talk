'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var isAPromise = function isAPromise(x) {
  return x.then && typeof x.then === 'function';
};

var Remote = function Remote(value) {
  var val = isAPromise(value) ? value : new Promise(function (resolve, reject) {
    resolve(value);
  });

  var api = {
    value: val,
    perform: function perform() {
      return api.value();
    },
    map: function map(func) {
      return val.then(func);
    },
    flatMap: function flatMap(func) {
      return api.map(func);
    }
  };

  return api;
};

exports.default = Remote;