'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.work = undefined;

var _helpers = require('../shared/helpers');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var toJson = function toJson(r) {
  return r.json();
};
var getComments = function getComments(_ref) {
  var children = _ref.data.children;
  return children;
};
var maker = function maker(_ref2) {
  var _ref2$data = _ref2.data;
  var body = _ref2$data.body;
  var created = _ref2$data.created_utc;
  var subreddit = _ref2$data.subreddit;
  var author = _ref2$data.author;
  var id = _ref2$data.id;
  var nsfw = _ref2$data.over_18;
  var link = _ref2$data.link_url;
  var op = _ref2$data.link_author;
  return {
    body: body,
    author: author,
    id: id,
    nsfw: nsfw,
    link: link,
    op: op,
    created: created,
    subreddit: subreddit
  };
};
var toMakers = function toMakers(comments) {
  return comments.map(maker);
};
var seconds = function seconds(x) {
  return x * 1000;
};
var indexById = function indexById(things) {
  return things.reduce(function (obj, thing) {
    return Object.assign({}, obj, _defineProperty({}, thing.id, thing));
  }, {});
};

var work = exports.work = function work(_ref3) {
  var State = _ref3.State;
  var Fetch = _ref3.Fetch;
  var Logger = _ref3.Logger;

  Logger.ap('Fetching comments');
  return Fetch.map(toJson).map(getComments).map(toMakers).map(function (comments) {
    return (0, _helpers.run)(State.map((0, _helpers.pluck)('comments')).map((0, _helpers.merge)(indexById(comments))).map(function () {
      return Logger.ap('Running State Update');
    }));
  }).map(function () {
    return Logger.ap('Finished fetching comments');
  });
};

exports.default = function (_ref4) {
  var State = _ref4.State;
  var Fetch = _ref4.Fetch;
  var Logger = _ref4.Logger;
  return (0, _helpers.repeat)(work({ State: State, Fetch: Fetch, Logger: Logger }).map(Logger.ap('Worker running...'))).every(seconds(30));
};