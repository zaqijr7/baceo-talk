/*eslint-disable react-hooks/exhaustive-deps*/
import React, {Component} from 'react';
import io from '../helper/socket';
import {
  historyInteraction,
  msgResponse,
} from '../redux/action/interactionHistory';
import {historyMsg, pageInfoHistoryMessage} from '../redux/action/msgHistory';
import {connect} from 'react-redux';

class SocketRoot extends Component {
  componentDidMount() {
    io.onAny(() => {
      const {id_user} = this.props.auth.profile;
      const {token} = this.props.auth;
      if (id_user !== '') {
        io.once(`SEND_CHAT_TO_${id_user}`, (msg) => {
          this.props.historyMsg(token, this.props.chatFocus);
          this.props.historyInteraction(token);
        });
      }
    });
  }
  render() {
    return <>{this.props.children}</>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  chatFocus: state.friend.chatFocus.peopleId,
});

const mapDispatchToProps = {
  historyMsg,
  pageInfoHistoryMessage,
  historyInteraction,
  msgResponse,
};

export default connect(mapStateToProps, mapDispatchToProps)(SocketRoot);
