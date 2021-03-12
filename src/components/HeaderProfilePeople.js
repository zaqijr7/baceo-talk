import {useNavigation} from '@react-navigation/core';
import React, {Profiler} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import avatar from '../assets/images/defaultAvatar.png';

const HeaderProfilePeople = (props) => {
  const name = useSelector((state) => state.friend.chatFocus);
  const navigation = useNavigation();
  return (
    <View style={style.parentWrapper}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" style={style.iconBar} />
      </TouchableOpacity>
      <View style={style.wrapperIconBar} />
      <TouchableOpacity>
        <Icon name="video" style={style.iconVideo} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="phone" style={style.iconTelephone} />
      </TouchableOpacity>
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
  wrapperIconBar: {
    flex: 1,
  },
  iconSearch: {
    fontSize: 22,
    color: 'white',
  },
  iconTelephone: {
    fontSize: 22,
    color: 'white',
    marginRight: 30,
  },
  iconVideo: {
    fontSize: 22,
    color: 'white',
    marginRight: 30,
  },
});

export default HeaderProfilePeople;
