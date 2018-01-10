'use strict';

var _Notifications = require('../modules/Notifications.js');

var _Notifications2 = _interopRequireDefault(_Notifications);

var _timekeeper = require('timekeeper');

var _timekeeper2 = _interopRequireDefault(_timekeeper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('actions', function () {
  it('should create an action to remove a notification', function () {
    var id = 123456;
    var expectedAction = {
      type: _Notifications.REMOVE_NOTIFICATION,
      id: id
    };
    expect((0, _Notifications.removeNotification)(id)).toEqual(expectedAction);
  });

  it('should create an action to remove all notifications', function () {
    var expectedAction = {
      type: _Notifications.REMOVE_ALL_NOTIFICATIONS,
      force: true
    };
    expect((0, _Notifications.removeAllNotifications)(true)).toEqual(expectedAction);
  });

  it('should create an action to remove all applicable notifications', function () {
    var expectedAction = {
      type: _Notifications.REMOVE_ALL_NOTIFICATIONS
    };
    expect((0, _Notifications.removeAllNotifications)()).toEqual(expectedAction);
  });

  it('should create an action to create a new notification', function () {
    var time = Date.now();
    _timekeeper2.default.freeze(time);
    var config = {
      message: 'Testing, testing 1, 2, 3',
      type: _Notifications.NOTIFICATION_TYPE_SUCCESS,
      duration: 3000,
      canDismiss: false,
      acceptBtn: jest.fn(),
      denyBtn: jest.fn(),
      customComponent: jest.fn()
    };
    var expectedAction = {
      type: _Notifications.ADD_NOTIFICATION,
      notification: {
        id: time,
        message: config.message,
        type: config.type,
        duration: config.duration,
        canDismiss: config.canDismiss,
        acceptBtn: config.acceptBtn,
        denyBtn: config.denyBtn,
        customComponent: config.customComponent
      }
    };
    expect((0, _Notifications.createNotification)(config)).toEqual(expectedAction);
    _timekeeper2.default.reset();
  });
});

describe('reducer', function () {
  it('should return the initial state', function () {
    expect((0, _Notifications2.default)(undefined, {})).toEqual([]);
  });

  it('should handle ADD_NOTIFICATION', function () {
    var id1 = Date.now();
    var id2 = Date.now();
    var notification1 = {
      id: id1,
      message: 'Testing1, testing1 1, 2, 3',
      type: _Notifications.NOTIFICATION_TYPE_SUCCESS,
      duration: 3000,
      canDismiss: false,
      acceptBtn: jest.fn(),
      denyBtn: jest.fn()
    };
    var notification2 = {
      id: id2,
      message: 'Testing2, testing2 1, 2, 3',
      type: _Notifications.NOTIFICATION_TYPE_ERROR,
      duration: _Notifications.NOTIFICATION_DEFAULT_DURATION,
      canDismiss: true,
      acceptBtn: jest.fn(),
      denyBtn: jest.fn(),
      customComponent: jest.fn()
    };
    var action = {
      type: _Notifications.ADD_NOTIFICATION,
      notification: notification2
    };
    expect((0, _Notifications2.default)([notification1], action)).toEqual([notification1, notification2]);
  });

  it('should handle REMOVE_NOTIFICATION', function () {
    var id = Date.now();
    var notification = {
      id: id,
      message: 'Testing, testing 1, 2, 3',
      type: _Notifications.NOTIFICATION_TYPE_INFO,
      duration: _Notifications.NOTIFICATION_DEFAULT_DURATION,
      canDismiss: true,
      acceptBtn: jest.fn(),
      denyBtn: jest.fn()
    };
    var action = {
      type: _Notifications.REMOVE_NOTIFICATION,
      id: notification.id
    };
    expect((0, _Notifications2.default)([notification], action)).toEqual([]);
  });

  it('should handle REMOVE_ALL_NOTIFICATIONS', function () {
    var notification1 = {
      id: new Date(1330688329360),
      message: 'Testing, testing 1, 2, 3',
      type: _Notifications.NOTIFICATION_TYPE_WARNING,
      duration: _Notifications.NOTIFICATION_DEFAULT_DURATION,
      canDismiss: true,
      acceptBtn: jest.fn(),
      denyBtn: jest.fn()
    };
    var notification2 = {
      id: new Date(1267688329388),
      message: 'Testing2, testing2 1, 2, 3',
      type: _Notifications.NOTIFICATION_TYPE_SUCCESS,
      duration: 0,
      canDismiss: false,
      acceptBtn: null,
      denyBtn: null
    };
    var notification3 = {
      id: new Date(1267623829303),
      message: 'Testing3, testing3 1, 2, 3',
      type: _Notifications.NOTIFICATION_TYPE_INFO,
      duration: _Notifications.NOTIFICATION_DEFAULT_DURATION,
      canDismiss: true,
      acceptBtn: jest.fn(),
      denyBtn: jest.fn()
    };
    var action = {
      type: _Notifications.REMOVE_ALL_NOTIFICATIONS
    };
    expect((0, _Notifications2.default)([notification1, notification2, notification3], action)).toEqual([notification2]);
  });

  it('should handle REMOVE_ALL_NOTIFICATIONS with force parameter', function () {
    var notification1 = {
      id: new Date(1330688329360),
      message: 'Testing, testing 1, 2, 3',
      type: _Notifications.NOTIFICATION_TYPE_WARNING,
      duration: _Notifications.NOTIFICATION_DEFAULT_DURATION,
      canDismiss: true,
      acceptBtn: jest.fn(),
      denyBtn: jest.fn()
    };
    var notification2 = {
      id: new Date(1267688329388),
      message: 'Testing2, testing2 1, 2, 3',
      type: _Notifications.NOTIFICATION_TYPE_SUCCESS,
      duration: 0,
      canDismiss: false,
      acceptBtn: null,
      denyBtn: null
    };
    var notification3 = {
      id: new Date(1267623829303),
      message: 'Testing3, testing3 1, 2, 3',
      type: _Notifications.NOTIFICATION_TYPE_INFO,
      duration: _Notifications.NOTIFICATION_DEFAULT_DURATION,
      canDismiss: true,
      acceptBtn: jest.fn(),
      denyBtn: jest.fn()
    };
    var action = {
      type: _Notifications.REMOVE_ALL_NOTIFICATIONS,
      force: true
    };
    expect((0, _Notifications2.default)([notification1, notification2, notification3], action)).toEqual([]);
  });
});