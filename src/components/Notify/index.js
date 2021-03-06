import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { removeNotification, removeAllNotifications, NOTIFICATIONS_POS_TOP_RIGHT } from 'modules/Notifications';
import { default as Notification } from 'components/Notification';
import styleMap from './Notify.scss';


export class Notify extends React.PureComponent {

  static propTypes = {
    notifications: PropTypes.array.isRequired,
    remove: PropTypes.func.isRequired,
    removeAll: PropTypes.func.isRequired,
    styles: PropTypes.object.isRequired,
    customStyles: PropTypes.object,
    notificationComponent: PropTypes.func,
    transitionDurations: PropTypes.shape({
      enter: PropTypes.number,
      leave: PropTypes.number,
    }),
    position: PropTypes.string,
    forceClose: PropTypes.bool,
  }

  static defaultProps = {
    notificationComponent: Notification,
    transitionDurations: {
      enter: 160,
      leave: 400,
    },
    position: NOTIFICATIONS_POS_TOP_RIGHT,
    styles: styleMap,
    forceClose: false,
  }

  constructor(props) {
    super(props);
    this.handleDismiss = this._handleDismiss.bind(this);
    this.handleDismissAll = this._handleDismissAll.bind(this);
  }

  _handleDismiss(id) {
    const { remove } = this.props;
    remove(id);
  }

  _handleDismissAll(force) {
    const { removeAll, forceClose } = this.props;
    removeAll(force || forceClose);
  }

  render() {
    const {
      notifications,
      customStyles,
      notificationComponent,
      transitionDurations,
      position } = this.props;
    let { styles } = this.props;
    styles = Object.assign({}, styles, customStyles);
    const notificationsContainerClass = styles[`container${position}`];
    return (
        <div className={notificationsContainerClass}>
          <TransitionGroup
              component="div"
              className={styles.wrapper}
              >
            {
              notifications.map((notification, i) => {
                const NewNotification = notification.customComponent || notificationComponent;
                return (
                  <CSSTransition
                  classNames={{
                    enter: styles.enter,
                    exit: styles.exit,
                  }}
                  timeout={{ enter: transitionDurations.enter, exit: transitionDurations.leave }}
                  key={notification.id}
                  >
                  <NewNotification
                    {...notification}
                    isFirst={(i === 0 && notifications.length > 1)}
                    handleDismiss={this.handleDismiss}
                    handleDismissAll={this.handleDismissAll}
                  />
                  </CSSTransition>
                );
              })
            }
          </TransitionGroup>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications,
});

const mapDispatchToProps = dispatch => ({
  remove: (id) => {
    dispatch(removeNotification(id));
  },
  removeAll: (force) => {
    dispatch(removeAllNotifications(force));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notify);
