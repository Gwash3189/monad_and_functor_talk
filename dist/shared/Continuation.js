'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _IO = require('./IO');

var _IO2 = _interopRequireDefault(_IO);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isAMonad = function isAMonad(x) {
  return x.map && x.flatMap;
};
var isAString = function isAString(x) {
  return typeof x === 'string';
};

var Continuation = function Continuation(funcOrIo) {
  var val = isAMonad(funcOrIo) ? funcOrIo : isAString(funcOrIo) ? (0, _IO2.default)(function () {
    return (0, _isomorphicFetch2.default)(funcOrIo);
  }) : (0, _IO2.default)(funcOrIo);

  var api = {
    value: val,
    map: function map(f) {
      return Continuation(api.value.map(function (prom) {
        return prom.then(f);
      }));
    },
    flatMap: function flatMap(f) {
      return api.map(f);
    },
    perform: function perform() {
      return api.value.perform();
    }
  };

  return api;
};

exports.default = Continuation;