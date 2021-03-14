import {useNavigation} from '@react-navigation/core';
import React, {Profiler} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import avatar from '../assets/images/avatar.jpg';

const HeaderChatRoom = (props) => {
  const chatFocus = useSelector((state) => state.friend.chatFocus);
  const navigation = useNavigation();
  return (
    <View style={style.parentWrapper}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" style={style.iconBar} />
      </TouchableOpacity>
      <TouchableOpacity
        style={style.photoProfil}
        onPress={() => navigation.navigate('profile')}>
        <Image source={avatar} style={style.avatar} />
      </TouchableOpacity>
      <View style={style.wrapName}>
        <TextTicker
          style={style.title}
          duration={3000}
          loop
          bounce
          repeatSpacer={50}
          marqueeDelay={1000}>
          {chatFocus.name === 'null' ? chatFocus.email : chatFocus.name}
        </TextTicker>
        <Text style={style.textAvaliable}>Available</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('profile')}>
        <Icon name="ellipsis-v" style={style.iconSearch} />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  parentWrapper: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8D0337',
    paddingHorizontal: 20,
  },
  iconBar: {
    fontSize: 20,
    color: 'white',
    marginRight: 20,
  },
  iconSearch: {
    fontSize: 22,
    color: 'white',
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  wrapName: {
    flex: 1,
    flexDirection: 'column',
  },
  textAvaliable: {
    color: 'white',
    fontSize: 12,
  },
  photoProfil: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  charName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
});

export default HeaderChatRoom;
