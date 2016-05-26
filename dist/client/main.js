'use strict';

var _bootstrapMin = require('bootstrap/dist/css/bootstrap.min.css');

var bootstrap = _interopRequireWildcard(_bootstrapMin);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _IO = require('../shared/IO');

var _IO2 = _interopRequireDefault(_IO);

var _CommentList = require('./CommentList');

var _CommentList2 = _interopRequireDefault(_CommentList);

var _helpers = require('../shared/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Dom = (0, _IO2.default)(_reactDom2.default);