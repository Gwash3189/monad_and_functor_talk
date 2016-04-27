"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Container = function Container(value) {
  var api = {
    value: value,
    of: function of(arg) {
      return Container(arg);
    },
    map: function map(func) {
      return Container(func(value));
    },
    flatMap: function flatMap(func) {
      return Container(func(value).value);
    },
    ap: function ap(container) {
      return Container(value(container.value));
    }
  };

  return api;
};

exports.default = Container;