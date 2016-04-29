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

var logTotalComments = function logTotalComments(Logger) {
  return function (state) {
    Logger.ap('Total Number of Comments ' + state.length);
  };
};

var transformState = exports.transformState = function transformState(Logger) {
  return function (state) {
    Logger.ap('Running Middleware');

    return {
      comments: indexById(state.comments),
      length: state.comments.length + state.length || 0
    };
  };
};

exports.default = function (Store, Logger) {
  return Store.map((0, _helpers.middleware)(transformState(Logger))).map((0, _helpers.listen)(logTotalComments(Logger))).map((0, _helpers.seedState)({
    comments: []
  }));
};