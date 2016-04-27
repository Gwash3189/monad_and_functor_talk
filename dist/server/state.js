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

var transformState = exports.transformState = function transformState(Logger) {
  return function (state) {
    Logger.ap('Running Middleware ' + new Date());

    return {
      comments: indexById(state.comments)
    };
  };
};

exports.default = function (Store, Logger) {
  return Store.map((0, _helpers.middleware)(transformState(Logger))).map((0, _helpers.seedState)({
    comments: []
  }));
};