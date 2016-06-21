'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bootstrapMin = require('bootstrap/dist/css/bootstrap.min.css');

var bootstrap = _interopRequireWildcard(_bootstrapMin);

var _Comment = require('./Comment.css');

var _Comment2 = _interopRequireDefault(_Comment);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Comment = function (_Component) {
  _inherits(Comment, _Component);

  function Comment() {
    _classCallCheck(this, Comment);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Comment).apply(this, arguments));
  }

  _createClass(Comment, [{
    key: 'nsfw',
    value: function nsfw(comment) {
      return comment.nsfw ? _react2.default.createElement(
        'div',
        { className: _Comment2.default.nsfw },
        'NSFW'
      ) : null;
    }
  }, {
    key: 'nsfwBody',
    value: function nsfwBody(comment) {
      return comment.nsfw ? _Comment2.default.nsfwBody : _Comment2.default.body;
    }
  }, {
    key: 'render',
    value: function render() {
      var comment = this.props.comment;


      return _react2.default.createElement(
        'a',
        { href: comment.link, target: '_blank', className: _Comment2.default.link },
        _react2.default.createElement(
          'div',
          { className: _Comment2.default.comment },
          this.nsfw(comment),
          _react2.default.createElement(
            'div',
            { className: _Comment2.default.heading },
            _react2.default.createElement(
              'h3',
              { className: _Comment2.default.title },
              comment.author,
              ' from /r/',
              comment.subreddit.toLowerCase(),
              ' says...'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: this.nsfwBody(comment) },
            comment.body
          )
        )
      );
    }
  }]);

  return Comment;
}(_react.Component);

exports.default = Comment;