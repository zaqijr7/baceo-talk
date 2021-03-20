/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {historyMsg, pageInfoHistoryMessage} from '../redux/action/msgHistory';
import BubbleChat from '../components/BubbleChat';
import background from '../assets/images/chat.png';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import http from '../helper/http';
import io from '../helper/socket';
import {
  historyInteraction,
  msgResponse,
} from '../redux/action/interactionHistory';
import LoadMore from '../components/LoadMore';

const ChatRoom = (props) => {
  const [message, setMessage] = useState([]);
  const auth = useSelector((state) => state.auth);
  const chatFocus = useSelector((state) => state.friend.chatFocus);
  const listChat = useSelector((state) => state.messageList.messageList);
  const [listRefresh, setListRefresh] = useState(false);
  const pageInfo = useSelector((state) => state.messageList.pageInfoHistoryMsg);
  const dispatch = useDispatch();

  const getDataChat = async () => {
    const response = await http(auth.token).get(`chat/${chatFocus.peopleId}`);
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

  const sendChat = async () => {
    try {
      const data = new URLSearchParams();
      data.append('message', message);
      await http(auth.token).post(
        `chat?receipentId=${chatFocus.peopleId}`,
        data,
      );
      await getDataChat();
      await getHistoyInteraction();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNewData = async () => {
    try {
      setListRefresh(true);
      const oldData = listChat;
      const response = await http(auth.token).get(`${pageInfo.nextLink}`);
      const resultResponse = response.data.result;
      console.log(resultResponse, '<< ini datanya');
      dispatch(pageInfoHistoryMessage(response.data.pageInfo));
      const newData = [...oldData, ...resultResponse];
      dispatch(historyMsg(newData));
      setListRefresh(false);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const nextData = async () => {
    const oldData = listChat;
    try {
      const response = await http(auth.token).get(`${pageInfo.nextLink}`);
      const resultResponse = response.data.result;
      console.log(resultResponse, '<< ini datanya');
      dispatch(pageInfoHistoryMessage(response.data.pageInfo));
      const newData = [...oldData, ...resultResponse];
      dispatch(historyMsg(newData));
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  console.log(pageInfo, 'ini page info');

  useEffect(() => {
    getDataChat();
    return () => {
      dispatch(historyMsg([]));
    };
  }, [listRefresh, chatFocus]);
  return (
    <View style={style.parentWrap}>
      <ImageBackground source={background} style={style.image}>
        <View style={style.wrapperMessageList}>
          <FlatList
            inverted={true}
            data={listChat}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item}) => (
              <BubbleChat
                message={item.message}
                idUser={item.senderId}
                idChat={item.id_chat}
              />
            )}
            refreshing={listRefresh}
            onRefresh={fetchNewData}
            onEndReached={nextData}
            onEndReachedThreshold={1}
            ListFooterComponent={
              <LoadMore load={listRefresh} nextData={pageInfo} />
            }
          />
        </View>
        <View style={style.parentWrapInputMessage}>
          <Icon name="smile" style={style.iconSmile} />
          <TextInput
            placeholder="Message..."
            multiline={true}
            style={style.TextInput}
            onChangeText={(value) => setMessage(value)}
          />
          <TouchableOpacity onPress={() => sendChat()}>
            <Icon name="paper-plane" style={style.iconPlane} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  parentWrap: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    // width: '100%',
    // height: 90,
  },
  wrapperMessageList: {
    paddingHorizontal: 15,
    flex: 1,
  },
  parentWrapInputMessage: {
    height: 60,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  iconSmile: {
    color: '#8D0337',
    fontSize: 30,
    marginRight: 10,
  },
  iconPlane: {
    color: '#8D0337',
    fontSize: 30,
    marginLeft: 10,
  },
  TextInput: {
    color: 'black',
    fontSize: 16,
    flex: 1,
    paddingVertical: 0,
    height: 50,
  },
});

export default ChatRoom;
