"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Nil = function Nil(x) {
  return x === undefined || x === null;
};

var Maybe = function Maybe(value) {
  var api = {
    value: value,
    of: function of(arg) {
      return Maybe(arg);
    },
    map: function map(f) {
      return Nil(value) ? Maybe(null) : Maybe(f(value));
    },
    flatMap: function flatMap(f) {
      return Maybe(f(value).value);
    }
  };

  return api;
};

exports.default = Maybe;