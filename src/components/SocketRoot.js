/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import http from '../helper/http';
import io from '../helper/socket';
import {
  historyInteraction,
  msgResponse,
} from '../redux/action/interactionHistory';
import {historyMsg, pageInfoHistoryMessage} from '../redux/action/msgHistory';

const SocketRoot = ({children}) => {
  const auth = useSelector((state) => state.auth);
  const chatFocus = useSelector((state) => state.friend.chatFocus.peopleId);
  const dispatch = useDispatch();
  const getDataChat = async () => {
    const response = await http(auth.token).get(`chat/${chatFocus}`);
    dispatch(historyMsg(response.data.result));
    dispatch(pageInfoHistoryMessage(response.data.pageInfo));
  };
  const getHistoyInteraction = async () => {
    try {
      const response = await http(auth.token).get('history');
      dispatch(historyInteraction(response.data.results));
    } catch (err) {
      dispatch(msgResponse(err.response.data.message));
    }
  };
  useEffect(() => {
    io.onAny((param) => {
      io.once(auth.profile.id_user, async (msg) => {
        console.log(msg, '<<<<<<<ini msg');
        await getDataChat();
        await getHistoyInteraction();
      });
    });
  }, []);
  return <>{children}</>;
};

export default SocketRoot;
