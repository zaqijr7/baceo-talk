import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import avatar from '../assets/images/avatar.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/core';
import {useDispatch} from 'react-redux';
import {chatFocus} from '../redux/action/chatFocus';

function Chatlist(props) {
  const navigation = useNavigation();
  const dipatch = useDispatch();
  const handlePress = () => {
    dipatch(chatFocus({name: props.name, phoneNumber: '085842752523'}));
    navigation.navigate('chatRoom', {name: props.name});
  };
  return (
    <TouchableOpacity style={style.parent} onPress={() => handlePress()}>
      <View style={style.rowParrent}>
        <Image source={avatar} style={style.avatar} />
        <View style={style.rowContact}>
          <Text style={style.contactName}>{props.name}</Text>
          <Text>{props.message}</Text>
        </View>
        <View style={style.rowTime}>
          <Icon name="check" style={style.cheklistIcon} />
          <Text style={style.timeText}>20:12</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 55,
  },
  parent: {
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  rowParrent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContact: {
    flex: 1,
    marginLeft: 15,
  },
  rowTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 10,
  },
  cheklistIcon: {
    color: '#BA275E',
    fontSize: 15,
  },
  contactName: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default Chatlist;
