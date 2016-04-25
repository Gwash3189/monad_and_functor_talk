"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Left = function Left(value) {
  var api = {
    value: value,
    of: function of(arg) {
      return Left(arg);
    },
    map: function map() {
      return api;
    },
    flatMap: function flatMap() {
      return api;
    }
  };

  return api;
};

exports.default = Left;