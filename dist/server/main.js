'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _helpers = require('../shared/helpers');

exports.default = function (worker, api) {
  return function (State, Logger, Fetch, App, Socket, Http) {
    (0, _helpers.run)(worker(State, Fetch, Logger), api(App, Socket, Http, Logger, State));
  };
};