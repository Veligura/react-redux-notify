'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _Notification = require('../components/Notification/index.js');

var _Notifications = require('../modules/Notifications.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Notification', function () {
  var ID = Date.now();
  var handleDismissClick = jest.fn();
  var handleDismissAllClick = jest.fn();
  var props = {
    id: ID,
    message: 'Hello There!',
    type: _Notifications.NOTIFICATION_TYPE_SUCCESS,
    isFirst: false,
    duration: 0,
    handleDismiss: handleDismissClick,
    handleDismissAll: handleDismissAllClick
  };

  it('it renders with default props', function () {
    var component = _reactTestRenderer2.default.create(_react2.default.createElement(_Notification.Notification, props));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('it renders with an element for the icon when an element is passed', function () {
    var tProps = (0, _extends3.default)({}, props, { icon: _react2.default.createElement('i', { className: 'fa fa-fire' }) });
    var component = _reactTestRenderer2.default.create(_react2.default.createElement(_Notification.Notification, tProps));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('it renders with an string for the icon when a string is passed', function () {
    var tProps = (0, _extends3.default)({}, props, { icon: String.fromCharCode(183) });
    var component = _reactTestRenderer2.default.create(_react2.default.createElement(_Notification.Notification, tProps));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('it renders an accept button with an a title and an icon className and calls function on click', function () {
    var tProps = (0, _extends3.default)({}, props, {
      canDismiss: false,
      acceptBtn: {
        handler: jest.fn(),
        icon: 'fa fa-thumbs-up',
        title: 'Accept'
      }
    });
    var component = _reactTestRenderer2.default.create(_react2.default.createElement(_Notification.Notification, tProps));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('it renders an accept button without a title and an icon element ', function () {
    var tProps = (0, _extends3.default)({}, props, {
      canDismiss: false,
      acceptBtn: {
        handler: jest.fn(),
        icon: _react2.default.createElement('i', { className: 'fa fa-thumbs-up' })
      }
    });
    var component = _reactTestRenderer2.default.create(_react2.default.createElement(_Notification.Notification, tProps));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('it renders a deny button with an a title and an icon className', function () {
    var tProps = (0, _extends3.default)({}, props, {
      canDismiss: false,
      denyBtn: {
        handler: jest.fn(),
        icon: 'fa fa-thumbs-down',
        title: 'Deny'
      }
    });
    var component = _reactTestRenderer2.default.create(_react2.default.createElement(_Notification.Notification, tProps));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('it renders a deny button without a title and an icon element ', function () {
    var tProps = (0, _extends3.default)({}, props, {
      canDismiss: false,
      denyBtn: {
        handler: jest.fn(),
        icon: _react2.default.createElement('i', { className: 'fa fa-thumbs-down' })
      }
    });
    var component = _reactTestRenderer2.default.create(_react2.default.createElement(_Notification.Notification, tProps));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('it renders with a close all button', function () {
    var tProps = (0, _extends3.default)({}, props, { isFirst: true });
    var component = _reactTestRenderer2.default.create(_react2.default.createElement(_Notification.Notification, tProps));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('it renders when a duration is greater than 0', function () {
    var tProps = (0, _extends3.default)({}, props, { duration: 2000 });
    var component = _reactTestRenderer2.default.create(_react2.default.createElement(_Notification.Notification, tProps));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('it calls the button handler function when clicked', function () {
    var acceptBtnHandler = jest.fn();
    var denyBtnHandler = jest.fn();
    var tProps = (0, _extends3.default)({}, props, {
      canDismiss: false,
      denyBtn: {
        handler: denyBtnHandler,
        icon: _react2.default.createElement('i', { className: 'fa fa-thumbs-down' }),
        deny: 'Deny'
      },
      acceptBtn: {
        handler: acceptBtnHandler,
        icon: 'fa fa-thumbs-up',
        title: 'Accept'
      },
      styles: {}
    });
    var component = _reactTestRenderer2.default.create(_react2.default.createElement(_Notification.Notification, tProps));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    tree.children[0].children[1].children[0].props.onClick();
    expect(acceptBtnHandler).toBeCalledWith(undefined, tProps);
    tree.children[0].children[1].children[1].props.onClick();
    expect(denyBtnHandler).toBeCalledWith(undefined, tProps);
  });

  it('calls handleDismiss onclick', function () {
    var component = _reactTestRenderer2.default.create(_react2.default.createElement(_Notification.Notification, props));
    var tree = component.toJSON();
    tree.children[1].props.onClick();
    expect(handleDismissClick).toBeCalledWith(ID);
  });

  it('calls handleDismissAll onclick', function () {
    var tProps = (0, _extends3.default)({}, props, { isFirst: true });
    var component = _reactTestRenderer2.default.create(_react2.default.createElement(_Notification.Notification, tProps));
    var tree = component.toJSON();
    tree.children[2].props.onClick();
    expect(handleDismissAllClick).toBeCalledWith();
  });
});