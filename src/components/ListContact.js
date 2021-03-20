import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import avatar from '../assets/images/avatar.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/core';
import {useDispatch, useSelector} from 'react-redux';
import {chatFocus} from '../redux/action/chatFocus';
import {REACT_APP_API_URL as API_URL} from '@env';
import moment from 'moment';

function ListContact(props) {
  const navigation = useNavigation();
  const profile = useSelector((state) => state.auth.profile);
  const dipatch = useDispatch();
  const handlePress = () => {
    dipatch(
      chatFocus({
        peopleId: props.id,
        email: props.email,
        name: props.name,
        phoneNumber: props.phoneNumber,
        photo: props.photo,
      }),
    );
    navigation.navigate('chatRoom', {name: props.name});
  };
  return (
    <TouchableOpacity style={style.parent} onPress={() => handlePress()}>
      <View style={style.rowParrent}>
        {props.photo === `${API_URL}null` ? (
          <Image source={avatar} style={style.avatar} />
        ) : (
          <Image source={{uri: props.photo}} style={style.avatar} />
        )}

        <View style={style.rowContact}>
          <Text style={style.contactName}>
            {props.name === 'null' ? props.email : props.name}
          </Text>
        </View>
        <View style={style.rowTime}>
          {props.senderId === profile.id_user && (
            <Icon name="check" style={style.cheklistIcon} />
          )}
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

export default ListContact;
