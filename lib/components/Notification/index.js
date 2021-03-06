'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notification = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

var _Notification = {
  "icon": "Notification__icon___GPDHD",
  "content": "Notification__content___2i_Va",
  "item": "Notification__item___1d3Zz",
  "item--message": "Notification__item--message___2JYsT",
  "item--btnBar": "Notification__item--btnBar___1t7Wd",
  "actionBtn": "Notification__actionBtn___3o--x",
  "close-all": "Notification__close-all___3YIP0",
  "has-close-all--noDismiss": "Notification__has-close-all--noDismiss___3oZHJ",
  "close": "Notification__close___CZE_b",
  "no-close": "Notification__no-close___3-p_Q",
  "has-close-all": "Notification__has-close-all___3-_VI",
  "has-close": "Notification__has-close___2d--3",
  "notification--info": "Notification__notification--info___1cxtE",
  "notification--success": "Notification__notification--success___2txWa",
  "notification--warning": "Notification__notification--warning___Wd6Y7",
  "notification--error": "Notification__notification--error___2fV5G"
};

var _Notification2 = _interopRequireDefault(_Notification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Notification = exports.Notification = function (_React$PureComponent) {
  (0, _inherits3.default)(Notification, _React$PureComponent);

  function Notification() {
    (0, _classCallCheck3.default)(this, Notification);
    return (0, _possibleConstructorReturn3.default)(this, (Notification.__proto__ || (0, _getPrototypeOf2.default)(Notification)).apply(this, arguments));
  }

  (0, _createClass3.default)(Notification, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          handleDismiss = _props.handleDismiss,
          id = _props.id,
          duration = _props.duration;

      if (duration !== 0) {
        setTimeout(function () {
          handleDismiss(id);
        }, duration);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          handleDismiss = _props2.handleDismiss,
          handleDismissAll = _props2.handleDismissAll,
          isFirst = _props2.isFirst,
          message = _props2.message,
          type = _props2.type,
          canDismiss = _props2.canDismiss,
          acceptBtn = _props2.acceptBtn,
          denyBtn = _props2.denyBtn,
          icon = _props2.icon,
          customStyles = _props2.customStyles,
          id = _props2.id;
      var styles = this.props.styles;

      styles = (0, _assign2.default)({}, styles, customStyles);
      var cx = _bind2.default.bind(styles);
      var containerTypeClass = cx((0, _defineProperty3.default)({
        'has-close': !isFirst && canDismiss,
        'no-close': !isFirst && !canDismiss,
        'has-close-all': isFirst && canDismiss,
        'has-close-all--noDismiss': isFirst && !canDismiss
      }, 'notification--' + type.toLowerCase(), true));

      return _react2.default.createElement(
        'div',
        { key: id, className: containerTypeClass },
        icon ? _react2.default.createElement(
          'span',
          { className: styles.icon },
          icon
        ) : false,
        _react2.default.createElement(
          'div',
          { className: styles.content },
          _react2.default.createElement(
            'div',
            { className: styles['item--message'] },
            message
          ),
          !canDismiss && (acceptBtn || denyBtn) ? _react2.default.createElement(
            'div',
            { className: styles['item--btnBar'] },
            acceptBtn ? _react2.default.createElement(
              'div',
              { className: styles.actionBtn,
                onClick: function onClick(e) {
                  acceptBtn.handler(e, _this2.props);
                } },
              acceptBtn.icon && typeof acceptBtn.icon === 'string' ? _react2.default.createElement('i', { className: acceptBtn.icon }) : acceptBtn.icon,
              acceptBtn.title
            ) : false,
            denyBtn ? _react2.default.createElement(
              'div',
              { className: styles.actionBtn,
                onClick: function onClick(e) {
                  denyBtn.handler(e, _this2.props);
                } },
              denyBtn.icon && typeof denyBtn.icon === 'string' ? _react2.default.createElement('i', { className: denyBtn.icon }) : denyBtn.icon,
              denyBtn.title
            ) : false
          ) : false
        ),
        canDismiss ? _react2.default.createElement('div', { className: styles.close, onClick: function onClick() {
            return handleDismiss(id);
          } }) : false,
        isFirst && canDismiss ? _react2.default.createElement(
          'div',
          { className: styles['close-all'],
            onClick: function onClick() {
              return handleDismissAll();
            } },
          'Close All'
        ) : false
      );
    }
  }]);
  return Notification;
}(_react2.default.PureComponent);

Notification.propTypes = {
  id: _propTypes2.default.number.isRequired,
  type: _propTypes2.default.string.isRequired,
  canDismiss: _propTypes2.default.bool.isRequired,
  duration: _propTypes2.default.number.isRequired,
  icon: _propTypes2.default.node,
  customStyles: _propTypes2.default.object,
  customComponent: _propTypes2.default.element,
  acceptBtn: _propTypes2.default.shape({
    handler: _propTypes2.default.func.isRequired,
    icon: _propTypes2.default.node,
    title: _propTypes2.default.node
  }),
  denyBtn: _propTypes2.default.shape({
    handler: _propTypes2.default.func.isRequired,
    icon: _propTypes2.default.node,
    title: _propTypes2.default.node
  }),
  isFirst: _propTypes2.default.bool.isRequired,
  handleDismiss: _propTypes2.default.func.isRequired,
  handleDismissAll: _propTypes2.default.func.isRequired,
  styles: _propTypes2.default.object.isRequired
};
Notification.defaultProps = {
  styles: _Notification2.default,
  canDismiss: true,
  duration: 0
};
exports.default = Notification;