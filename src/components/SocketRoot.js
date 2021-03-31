/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, Component} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import http from '../helper/http';
import io from '../helper/socket';
import {
  historyInteraction,
  msgResponse,
} from '../redux/action/interactionHistory';
import {historyMsg, pageInfoHistoryMessage} from '../redux/action/msgHistory';
import {connect} from 'react-redux';

class SocketRoot extends Component {
  getDataChat = async (token, receipent) => {
    const response = await http(token).get(`chat/${receipent}`);
    this.props.historyMsg(response.data.result);
    this.props.pageInfoHistoryMessage(response.data.pageInfo);
  };

  getHistoyInteraction = async (token) => {
    try {
      const response = await http(token).get('history');
      this.props.historyInteraction(response.data.results);
    } catch (err) {
      this.props.msgResponse(err.response.data.message);
    }
  };

  componentDidMount() {
    const {id_user} = this.props.auth.profile;
    const {token} = this.props.auth;
    io.onAny((param) => {
      console.log(param, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<ini param onany');
      if (id_user) {
        io.once(`SEND_CHAT_TO_${id_user}`, (msg) => {
          this.getDataChat(token, this.props.chatFocus);
          this.getHistoyInteraction(token);
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

// const SocketRoot = ({children}) => {
//   const auth = useSelector((state) => state.auth);
//   const chatFocus = useSelector((state) => state.friend.chatFocus.peopleId);
//   const dispatch = useDispatch();
//   const getDataChat = async () => {
//     const response = await http(auth.token).get(`chat/${chatFocus}`);
//     dispatch(historyMsg(response.data.result));
//     dispatch(pageInfoHistoryMessage(response.data.pageInfo));
//   };
//   const getHistoyInteraction = async () => {
//     try {
//       const response = await http(auth.token).get('history');
//       dispatch(historyInteraction(response.data.results));
//     } catch (err) {
//       dispatch(msgResponse(err.response.data.message));
//     }
//   };
//   useEffect(() => {
//     io.onAny((param) => {
//       if (auth.profile.id_user) {
//         io.once(`SEND_CHAT_TO_${auth.profile.id_user}`, async (msg) => {
//           console.log(msg, '<<<<<<<ini msg');
//           await getDataChat();
//           await getHistoyInteraction();
//         });
//       }
//     });
//   }, []);
//   return <>{children}</>;
// };

// export default SocketRoot;
