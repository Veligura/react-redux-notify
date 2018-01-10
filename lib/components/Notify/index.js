'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Notify = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _reactRedux = require('react-redux');

var _reactTransitionGroup = require('react-transition-group');

var _Notifications = require('../../modules/Notifications.js');

var _Notification = require('../Notification/index.js');

var _Notification2 = _interopRequireDefault(_Notification);

var _Notify = {
  "wrapper": "Notify__wrapper___Btp8G",
  "containerTopRight": "Notify__containerTopRight___3Aype",
  "containerBottomRight": "Notify__containerBottomRight___2LKUe",
  "containerBottomLeft": "Notify__containerBottomLeft___1zAHL",
  "containerTopLeft": "Notify__containerTopLeft___1Mczb",
  "enter": "Notify__enter___1lTas",
  "notification-show": "Notify__notification-show___m91vc",
  "exit": "Notify__exit___2tJqi",
  "notification-hide": "Notify__notification-hide___qXZMa",
  "notification-shrink": "Notify__notification-shrink___dlvYw"
};

var _Notify2 = _interopRequireDefault(_Notify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Notify = exports.Notify = function (_React$PureComponent) {
  (0, _inherits3.default)(Notify, _React$PureComponent);

  function Notify(props) {
    (0, _classCallCheck3.default)(this, Notify);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Notify.__proto__ || (0, _getPrototypeOf2.default)(Notify)).call(this, props));

    _this.handleDismiss = _this._handleDismiss.bind(_this);
    _this.handleDismissAll = _this._handleDismissAll.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Notify, [{
    key: '_handleDismiss',
    value: function _handleDismiss(id) {
      var remove = this.props.remove;

      remove(id);
    }
  }, {
    key: '_handleDismissAll',
    value: function _handleDismissAll(force) {
      var _props = this.props,
          removeAll = _props.removeAll,
          forceClose = _props.forceClose;

      removeAll(force || forceClose);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          notifications = _props2.notifications,
          customStyles = _props2.customStyles,
          notificationComponent = _props2.notificationComponent,
          transitionDurations = _props2.transitionDurations,
          position = _props2.position;
      var styles = this.props.styles;

      styles = (0, _assign2.default)({}, styles, customStyles);
      var notificationsContainerClass = styles['container' + position];
      return _react2.default.createElement(
        'div',
        { className: notificationsContainerClass },
        _react2.default.createElement(
          _reactTransitionGroup.TransitionGroup,
          {
            component: 'div',
            className: styles.wrapper
          },
          notifications.map(function (notification, i) {
            var NewNotification = notification.customComponent || notificationComponent;
            return _react2.default.createElement(
              _reactTransitionGroup.CSSTransition,
              {
                classNames: {
                  enter: styles.enter,
                  exit: styles.exit
                },
                timeout: { enter: transitionDurations.enter, exit: transitionDurations.leave },
                key: notification.id
              },
              _react2.default.createElement(NewNotification, (0, _extends3.default)({}, notification, {
                isFirst: i === 0 && notifications.length > 1,
                handleDismiss: _this2.handleDismiss,
                handleDismissAll: _this2.handleDismissAll
              }))
            );
          })
        )
      );
    }
  }]);
  return Notify;
}(_react2.default.PureComponent);

Notify.propTypes = {
  notifications: _propTypes2.default.array.isRequired,
  remove: _propTypes2.default.func.isRequired,
  removeAll: _propTypes2.default.func.isRequired,
  styles: _propTypes2.default.object.isRequired,
  customStyles: _propTypes2.default.object,
  notificationComponent: _propTypes2.default.func,
  transitionDurations: _propTypes2.default.shape({
    enter: _propTypes2.default.number,
    leave: _propTypes2.default.number
  }),
  position: _propTypes2.default.string,
  forceClose: _propTypes2.default.bool
};
Notify.defaultProps = {
  notificationComponent: _Notification2.default,
  transitionDurations: {
    enter: 160,
    leave: 400
  },
  position: _Notifications.NOTIFICATIONS_POS_TOP_RIGHT,
  styles: _Notify2.default,
  forceClose: false
};


var mapStateToProps = function mapStateToProps(state) {
  return {
    notifications: state.notifications
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    remove: function remove(id) {
      dispatch((0, _Notifications.removeNotification)(id));
    },
    removeAll: function removeAll(force) {
      dispatch((0, _Notifications.removeAllNotifications)(force));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Notify);