'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baobab = require('baobab');

var _baobab2 = _interopRequireDefault(_baobab);

var _IO = require('../shared/IO');

var _IO2 = _interopRequireDefault(_IO);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tree = new _baobab2.default({
  comments: {}
});

exports.default = (0, _IO2.default)({ tree: tree, comments: tree.select('comments') });