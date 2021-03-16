import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  TextInput,
} from 'react-native';
import {useSelector} from 'react-redux';
import BubbleChat from '../components/BubbleChat';
import background from '../assets/images/chat.png';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import http from '../helper/http';
import {useState} from 'react/cjs/react.development';

const ChatRoom = (props) => {
  const [listChat, setListChat] = useState([]);
  const auth = useSelector((state) => state.auth);
  const chatFocus = useSelector((state) => state.friend.chatFocus);
  console.log(chatFocus.peopleId, 'ini id orang');
  const getDataChat = async () => {
    const response = await http(auth.token).get(`chat/${chatFocus.peopleId}`);
    setListChat(response.data.result);
  };
  useEffect(() => {
    getDataChat();
    return () => {
      setListChat([]);
    };
  }, [chatFocus]);
  return (
    <View style={style.parentWrap}>
      <ImageBackground source={background} style={style.image}>
        <View style={style.wrapperMessageList}>
          <FlatList
            data={listChat}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item}) => (
              <BubbleChat
                message={item.message}
                idUser={item.senderId}
                idChat={item.id_chat}
              />
            )}
          />
        </View>
        <View style={style.parentWrapInputMessage}>
          <Icon name="smile" style={style.iconSmile} />
          <TextInput
            placeholder="Message..."
            multiline={true}
            style={style.TextInput}
          />
          <TouchableOpacity>
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
