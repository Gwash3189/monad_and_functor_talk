'use strict';

var _es6Promise = require('es6-promise');

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

var _worker = require('./worker');

var _worker2 = _interopRequireDefault(_worker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _es6Promise.polyfill)();

(0, _main2.default)({ worker: _worker2.default, api: _api2.default });