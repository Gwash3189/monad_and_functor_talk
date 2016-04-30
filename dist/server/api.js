'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _IO = require('../shared/IO');

var _IO2 = _interopRequireDefault(_IO);

var _helpers = require('../shared/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (App, Socket, Http, Logger, State) {
  return (0, _IO2.default)(function () {
    return Http.map((0, _helpers.listen)(8080, function () {
      Logger.ap('Listening on port 8080');
    })).flatMap((0, _helpers.thunk)(Socket)).flatMap((0, _helpers.thunk)(App));
  }).flatMap(function () {
    return State.map((0, _helpers.pluck)('comments')).map((0, _helpers.on)('update', function (e) {
      Logger.ap('Emmiting new Comments');
      Socket.map((0, _helpers.emit)('comments'), (0, _helpers.currentData)(e));
      Logger.ap('Total Number: ' + Object.keys((0, _helpers.currentData)(e)).length);
    }));
  });
};