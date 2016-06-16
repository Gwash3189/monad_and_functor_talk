'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bootstrapMin = require('bootstrap/dist/css/bootstrap.min.css');

var bootstrap = _interopRequireWildcard(_bootstrapMin);

var _CommentsList = require('./CommentsList.css');

var _CommentsList2 = _interopRequireDefault(_CommentsList);

var _Comment = require('./Comment');

var _Comment2 = _interopRequireDefault(_Comment);

var _helpers = require('../shared/helpers');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommentsList = function (_Component) {
  _inherits(CommentsList, _Component);

  function CommentsList(props) {
    _classCallCheck(this, CommentsList);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CommentsList).call(this, props));

    var state = props.state;
    var socket = props.socket;


    (0, _helpers.run)(state.map((0, _helpers.on)('update', function (e) {
      return _this.setState(e.data.currentData);
    })).flatMap(function (state) {
      return socket.map((0, _helpers.on)('comments', function (comments) {
        return state.select('comments').merge(comments);
      }));
    }));
    return _this;
  }

  _createClass(CommentsList, [{
    key: 'comments',
    value: function comments(f) {
      var state = this.props.state;


      return (0, _helpers.extract)((0, _helpers.perform)(state.map(function (state) {
        return f(state.get('comments'));
      })));
    }
  }, {
    key: 'renderComments',
    value: function renderComments() {
      var comments = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];


      return Object.keys(comments).length > 0 ? _react2.default.createElement(
        'ul',
        { className: _CommentsList2.default.list },
        (0, _helpers.top)((0, _helpers.map)(function (comment) {
          return _react2.default.createElement(_Comment2.default, { key: comment.id, comment: comment });
        }, (0, _helpers.sort)((0, _helpers.toArray)(comments), 'created'), 100))
      ) : _react2.default.createElement('ul', { className: _CommentsList2.default.list });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: bootstrap.container },
        _react2.default.createElement(
          'div',
          { className: bootstrap.row },
          _react2.default.createElement(
            'div',
            { className: _CommentsList2.default.container },
            this.comments(this.renderComments)
          )
        )
      );
    }
  }]);

  return CommentsList;
}(_react.Component);

CommentsList.propTypes = {
  socket: _react.PropTypes.any.isRequired,
  state: _react.PropTypes.any.isRequired
};

exports.default = function (_ref) {
  var socket = _ref.socket;
  var state = _ref.state;
  return _react2.default.createElement(CommentsList, { socket: socket, state: state });
};