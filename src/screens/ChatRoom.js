import React from 'react';
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

const ChatRoom = (props) => {
  const messageList = useSelector((state) => state.messageList.messageList);
  return (
    <View style={style.parentWrap}>
      <ImageBackground source={background} style={style.image}>
        <View style={style.wrapperMessageList}>
          <FlatList
            data={messageList}
            keyExtractor={(item, index) => String(index)}
            renderItem={({item}) => (
              <BubbleChat message={item.message} idUser={item.senderId} />
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
