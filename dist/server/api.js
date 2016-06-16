'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('../shared/helpers');

exports.default = function (_ref) {
  var app = _ref.app;
  var Socket = _ref.Socket;
  var http = _ref.http;
  var Logger = _ref.Logger;
  var State = _ref.State;

  app.get('/comments', function (req, res) {
    (0, _helpers.run)(State.map((0, _helpers.pluck)('comments')).map(function (comments) {
      return res.map((0, _helpers.json)(comments.get()));
    }));
  });

  http.listen(8080, function () {
    Logger.ap('Listening on port 8080');
  });

  return State.map((0, _helpers.pluck)('comments')).flatMap((0, _helpers.on)('update', function (e) {
    Logger.ap('Emmiting new Comments');
    (0, _helpers.run)(Socket.map((0, _helpers.emit)('comments', (0, _helpers.diff)((0, _helpers.previousData)(e), (0, _helpers.currentData)(e)))));
  }));
};