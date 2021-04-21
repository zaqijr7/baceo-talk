/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  TextInput,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  flatListChatHistory,
  historyMsg,
  cleanMsg,
} from '../redux/action/msgHistory';
import BubbleChat from '../components/BubbleChat';
import background from '../assets/images/chat.png';
import Icon from 'react-native-vector-icons/FontAwesome5';
import http from '../helper/http';
import {
  historyInteraction,
  msgResponse,
} from '../redux/action/interactionHistory';
import LoadMore from '../components/LoadMore';

const ChatRoom = (props) => {
  const [message, setMessage] = useState('');
  const auth = useSelector((state) => state.auth);
  const chatFocus = useSelector((state) => state.friend.chatFocus);
  const listChat = useSelector((state) => state.messageList.messageList);
  const [listRefresh, setListRefresh] = useState(false);
  const pageInfo = useSelector((state) => state.messageList.pageInfoHistoryMsg);
  const dispatch = useDispatch();

  const sendChat = async () => {
    try {
      const data = new URLSearchParams();
      data.append('message', message);
      await http(auth.token).post(
        `chat?receipentId=${chatFocus.peopleId}`,
        data,
      );
      dispatch(historyMsg(auth.token, chatFocus.peopleId));
      dispatch(historyInteraction(auth.token));
      setMessage('');
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
      const newData = [...oldData, ...resultResponse];
      dispatch(flatListChatHistory(newData, response.data.pageInfo));
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
      const newData = [...oldData, ...resultResponse];
      dispatch(flatListChatHistory(newData, response.data.pageInfo));
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  console.log(pageInfo, 'ini page info');

  useEffect(() => {
    // getDataChat();
    return () => {
      dispatch(cleanMsg());
    };
  }, [listRefresh, chatFocus]);
  return (
    <View style={style.parentWrap}>
      <ImageBackground source={background} style={style.image}>
        <View style={style.wrapperMessageList}>
          {listChat.length !== 0 && (
            <FlatList
              inverted={true}
              data={listChat}
              keyExtractor={(item, index) => String(index)}
              renderItem={({item}) => (
                <BubbleChat
                  message={item.message}
                  idUser={item.senderId}
                  idChat={item.id_chat}
                  time={item.createdAt}
                />
              )}
              refreshing={listRefresh}
              onRefresh={fetchNewData}
              onEndReached={nextData}
              onEndReachedThreshold={1}
              ListFooterComponent={
                <LoadMore
                  load={listRefresh}
                  nextData={pageInfo === null ? '' : pageInfo.nextLink}
                />
              }
            />
          )}
        </View>
        <View style={style.parentWrapInputMessage}>
          <Icon name="smile" style={style.iconSmile} />
          <TextInput
            placeholder="Message..."
            multiline={true}
            style={style.TextInput}
            value={message}
            onChangeText={(value) => setMessage(value)}
          />
          {message === '' ? (
            <Pressable
              android_ripple={{radius: 30, borderless: true, color: 'black'}}
              onPress={() => sendChat()}
              disabled>
              <Icon name="paper-plane" style={style.iconPlane} />
            </Pressable>
          ) : (
            <Pressable
              android_ripple={{radius: 30, borderless: true, color: 'black'}}
              onPress={() => sendChat()}>
              <Icon name="paper-plane" style={style.iconPlane} />
            </Pressable>
          )}
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
