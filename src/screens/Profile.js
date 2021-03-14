import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderSelfProfile from '../components/HeaderSelfProfile';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/core';

import avatar from '../assets/images/foto.png';

function Profile() {
  const navigation = useNavigation();
  return (
    <>
      <ImageBackground source={avatar} style={style.photo}>
        <HeaderSelfProfile />
        <View style={style.rowName}>
          <Text style={style.textNameSelf}>Muhammad Zaqi</Text>
          <Text style={{color: 'white'}}>Online</Text>
        </View>
      </ImageBackground>
      <View>
        <Pressable
          style={style.btnChat}
          android_ripple={{color: 'black', radius: 37.5}}>
          <Icon name="camera" style={style.iconChat} />
        </Pressable>
      </View>
      <ScrollView>
        <View style={style.row2}>
          <View style={style.rowInfoPhoneNumber}>
            <Text style={style.textInfo}>Account</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('editPhoneNum')}>
              <Text style={style.textPhoneNumber}>+6285842752523</Text>
              <Text style={style.textMobile}>Tap to change phone number</Text>
            </TouchableOpacity>
          </View>
          <View style={style.line} />
          <TouchableOpacity
            style={style.rowInfoPhoneNumber}
            onPress={() => navigation.navigate('editEmail')}>
            <Text style={style.textPhoneNumber}>zaqijr7@gmail.com</Text>
            <Text style={style.textMobile}>Email</Text>
          </TouchableOpacity>
          <View style={style.line} />
          <TouchableOpacity
            style={style.rowInfoPhoneNumber}
            onPress={() => navigation.navigate('editName')}>
            <Text style={style.textPhoneNumber}>Name</Text>
            <Text style={style.textMobile}>Muhammad Zaqi</Text>
          </TouchableOpacity>
          <View style={style.line} />
          <TouchableOpacity
            style={style.rowInfoPhoneNumber}
            onPress={() => navigation.navigate('editPin')}>
            <Text style={style.textPhoneNumber}>PIN</Text>
            <Text style={style.textMobile}>Edit your PIN</Text>
          </TouchableOpacity>
          <View style={style.line} />
          <TouchableOpacity style={style.rowInfoPhoneNumber}>
            <Text style={style.textPhoneNumber}>Bio</Text>
            <Text style={style.textMobile}>Add a few words about yourself</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const style = StyleSheet.create({
  photo: {
    width: '100%',
    height: 330,
  },
  rowName: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  textNameSelf: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    elevation: 3,
  },
  row2: {
    paddingVertical: 15,
    backgroundColor: 'white',
    position: 'relative',
  },
  btnChat: {
    height: 75,
    width: 75,
    borderRadius: 50,
    backgroundColor: 'white',
    elevation: 3,
    position: 'absolute',
    right: 0,
    bottom: -37.5,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconChat: {
    fontSize: 30,
    color: '#BA275E',
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 80,
    marginRight: 25,
  },
  textName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  textLastSeen: {
    fontSize: 13,
    color: 'white',
  },
  rowInfoPhoneNumber: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  textInfo: {
    color: '#BA275E',
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 15,
  },
  textPhoneNumber: {
    fontSize: 15,
    marginBottom: 5,
  },
  textMobile: {
    fontSize: 13,
    color: '#929296',
  },
  line: {
    height: 0.9,
    backgroundColor: '#929296',
    marginBottom: 20,
    width: '85%',
    marginLeft: '15%',
  },
  rowNotification: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowTextNotification: {
    flex: 1,
  },
});

export default Profile;
