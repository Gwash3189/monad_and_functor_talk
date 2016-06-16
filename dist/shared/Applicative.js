'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Container = require('./Container');

var _Container2 = _interopRequireDefault(_Container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isAMonad = function isAMonad(x) {
  return x.map && x.flatMap;
};

exports.default = function (x) {
  var monad = (0, _Container2.default)(x);
  monad.ap = function (apMonad) {
    return isAMonad(apMonad) ? apMonad.map(monad.value) : (0, _Container2.default)(apMonad).map(monad.value);
  };

  return monad;
};