'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = exports.REMOVE_ALL_NOTIFICATIONS = exports.REMOVE_NOTIFICATION = exports.ADD_NOTIFICATION = exports.NOTIFICATION_TYPE_ERROR = exports.NOTIFICATION_TYPE_INFO = exports.NOTIFICATION_TYPE_WARNING = exports.NOTIFICATION_TYPE_SUCCESS = exports.NOTIFICATIONS_POS_TOP_LEFT = exports.NOTIFICATIONS_POS_BOT_LEFT = exports.NOTIFICATIONS_POS_BOT_RIGHT = exports.NOTIFICATIONS_POS_TOP_RIGHT = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.createNotification = createNotification;
exports.removeNotification = removeNotification;
exports.removeAllNotifications = removeAllNotifications;

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case ADD_NOTIFICATION:
      return [].concat((0, _toConsumableArray3.default)(state), [(0, _extends3.default)({ id: new Date().getUTCMilliseconds() }, action.notification)]);
    case REMOVE_NOTIFICATION:
      return state.filter(function (item) {
        return item.id !== action.id;
      });
    case REMOVE_ALL_NOTIFICATIONS:
      if (action.force) {
        return [];
      }
      return state.filter(function (item) {
        return !item.canDismiss;
      });
    default:
      return state;
  }
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Constants
var NOTIFICATIONS_POS_TOP_RIGHT = exports.NOTIFICATIONS_POS_TOP_RIGHT = 'TopRight';
var NOTIFICATIONS_POS_BOT_RIGHT = exports.NOTIFICATIONS_POS_BOT_RIGHT = 'BottomRight';
var NOTIFICATIONS_POS_BOT_LEFT = exports.NOTIFICATIONS_POS_BOT_LEFT = 'BottomLeft';
var NOTIFICATIONS_POS_TOP_LEFT = exports.NOTIFICATIONS_POS_TOP_LEFT = 'TopLeft';
var NOTIFICATION_TYPE_SUCCESS = exports.NOTIFICATION_TYPE_SUCCESS = 'SUCCESS';
var NOTIFICATION_TYPE_WARNING = exports.NOTIFICATION_TYPE_WARNING = 'WARNING';
var NOTIFICATION_TYPE_INFO = exports.NOTIFICATION_TYPE_INFO = 'INFO';
var NOTIFICATION_TYPE_ERROR = exports.NOTIFICATION_TYPE_ERROR = 'ERROR';
var ADD_NOTIFICATION = exports.ADD_NOTIFICATION = 'ADD_NOTIFICATION';
var REMOVE_NOTIFICATION = exports.REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
var REMOVE_ALL_NOTIFICATIONS = exports.REMOVE_ALL_NOTIFICATIONS = 'REMOVE_ALL_NOTIFICATIONS';

// Action Creators
function createNotification(notification) {
  var session = {
    type: ADD_NOTIFICATION,
    notification: (0, _extends3.default)({}, notification)
  };
  return session;
}

function removeNotification(id) {
  return {
    type: REMOVE_NOTIFICATION,
    id: id
  };
}

function removeAllNotifications(force) {
  return {
    type: REMOVE_ALL_NOTIFICATIONS,
    force: force
  };
}

// Reducer
var initialState = exports.initialState = [];