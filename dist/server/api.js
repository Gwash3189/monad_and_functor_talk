'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _IO = require('../shared/IO');

var _IO2 = _interopRequireDefault(_IO);

var _helpers = require('../shared/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (App, Socket, Http, Logger, Store) {
  Store.map((0, _helpers.listen)(function (state) {
    Socket.map((0, _helpers.emit)('comments', state));
  }));

  return Http.map((0, _helpers.listen)(8080, function () {
    debugger;
    Logger.ap('listening on port 8080');
  })).flatMap((0, _helpers.thunk)(Socket)).flatMap((0, _helpers.thunk)(App));
};