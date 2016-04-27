'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _IO = require('../shared/IO');

var _IO2 = _interopRequireDefault(_IO);

var _helpers = require('../shared/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var indexById = function indexById(makers) {
  return makers.reduce(function (obj, maker) {
    obj[maker.id] = maker;
    return obj;
  }, {});
};

exports.default = function (Store) {
  return Store.map((0, _helpers.middleware)(function (state) {
    return {
      comments: indexById(state.comments)
    };
  })).map((0, _helpers.seedState)({
    comments: []
  }));
};