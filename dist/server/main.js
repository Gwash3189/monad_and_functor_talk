"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, worker, api) {
  return function (State, Logger, Fetch, App, Socket, Http) {
    state(State, Logger).perform();
    worker(State, Fetch, Logger).perform();
    api(App, Socket, Http, Logger, State).perform();
  };
};