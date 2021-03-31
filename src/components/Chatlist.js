import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import avatar from '../assets/images/avatar.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import {chatFocus} from '../redux/action/chatFocus';
import {historyMsg, pageInfoHistoryMessage} from '../redux/action/msgHistory';
import {REACT_APP_API_URL as API_URL} from '@env';
import moment from 'moment';
import http from '../helper/http';

function Chatlist(props) {
  const navigation = useNavigation();
  const profile = useSelector((state) => state.auth.profile);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handlePress = async () => {
    const response = await http(auth.token).get(
      `chat/${
        props.senderId === profile.id_user ? props.receipentId : props.senderId
      }`,
    );
    dispatch(historyMsg(response.data.result));
    dispatch(pageInfoHistoryMessage(response.data.pageInfo));
    dispatch(
      chatFocus({
        peopleId:
          props.senderId === profile.id_user
            ? props.receipentId
            : props.senderId,
        email:
          props.senderId === profile.id_user
            ? props.receipentEmail
            : props.senderEmail,
        name:
          props.senderId === profile.id_user
            ? props.receipentName
            : props.senderName,
        phoneNumber:
          props.senderId === profile.id_user
            ? props.receipentPhoneNum
            : props.senderPhoneNum,
        photo:
          props.senderId === profile.id_user
            ? props.receipentPhoto
            : props.senderPhoto,
      }),
    );
    navigation.navigate('chatRoom', {name: props.name});
  };
  return (
    <TouchableOpacity style={style.parent} onPress={() => handlePress()}>
      <View style={style.rowParrent}>
        {props.senderId === profile.id_user ? (
          <>
            {props.receipentPhoto === `${API_URL}null` ? (
              <Image source={avatar} style={style.avatar} />
            ) : (
              <Image
                source={{uri: props.receipentPhoto}}
                style={style.avatar}
              />
            )}
          </>
        ) : (
          <>
            {props.senderPhoto === `${API_URL}null` ? (
              <Image source={avatar} style={style.avatar} />
            ) : (
              <Image source={{uri: props.senderPhoto}} style={style.avatar} />
            )}
          </>
        )}

        <View style={style.rowContact}>
          {props.senderId === profile.id_user ? (
            <Text style={style.contactName}>
              {props.receipentName === 'null'
                ? props.receipentEmail
                : props.receipentName}
            </Text>
          ) : (
            <Text style={style.contactName}>
              {props.senderName === 'null'
                ? props.senderEmail
                : props.senderName}
            </Text>
          )}
          <Text>{props.message}</Text>
        </View>
        <View style={style.rowTime}>
          {props.senderId === profile.id_user && (
            <Icon name="check" style={style.cheklistIcon} />
          )}
          <Text style={style.timeText}>
            {moment(props.createdAt).format('LT')}
          </Text>
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
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default Chatlist;
