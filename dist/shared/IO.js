'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isAFunction = function isAFunction(x) {
  return typeof x === 'function';
};

var IO = function IO(value) {
  var val = isAFunction(value) ? value : function () {
    return value;
  };

  var api = {
    get value() {
      return val();
    },
    perform: function perform() {
      return api.value;
    },
    of: function of(x) {
      return IO(x);
    },
    map: function map(func) {
      return IO(function () {
        return func(api.value);
      });
    },
    flatMap: function flatMap(func) {
      return IO(func(api.value).value);
    }
  };

  return api;
};

exports.default = IO;