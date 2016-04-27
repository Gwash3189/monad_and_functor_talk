'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformState = undefined;

var _IO = require('../shared/IO');

var _IO2 = _interopRequireDefault(_IO);

var _helpers = require('../shared/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var indexById = function indexById(things) {
  return things.reduce(function (obj, thing) {
    obj[thing.id] = thing;
    return obj;
  }, {});
};

var transformState = exports.transformState = function transformState(state) {
  return {
    comments: indexById(state.comments)
  };
};

exports.default = function (Store) {
  return Store.map((0, _helpers.middleware)(transformState)).map((0, _helpers.seedState)({
    comments: []
  }));
};