import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/AntDesign';
import avatar from '../assets/images/avatar.jpg';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/action/auth';
import {DrawerActions} from '@react-navigation/core';
import TextTicker from 'react-native-text-ticker';
import {REACT_APP_API_URL as API_URL} from '@env';

const DrawerContent = (props) => {
  const profile = useSelector((state) => state.auth.profile);
  const dispatch = useDispatch();
  const handlePress = () => {
    dispatch(logout(profile.id_user));
    props.navigation.dispatch(DrawerActions.closeDrawer());
  };
  return (
    <>
      <View style={style.background}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('selfProfile')}>
          {profile.photo === `${API_URL}null` ? (
            <Image source={avatar} style={style.imageProfile} />
          ) : (
            <Image source={{uri: profile.photo}} style={style.imageProfile} />
          )}
        </TouchableOpacity>
        <View>
          <View style={style.rowName}>
            {profile.name === 'null' ? (
              <TextTicker
                style={style.textName}
                duration={3000}
                loop
                bounce
                repeatSpacer={50}
                marqueeDelay={1000}>
                {profile.email}
              </TextTicker>
            ) : (
              <TextTicker
                style={style.textName}
                duration={3000}
                loop
                bounce
                repeatSpacer={50}
                marqueeDelay={1000}>
                {profile.name}
              </TextTicker>
            )}
            <Text style={style.textPhoneNumber}>085842752523</Text>
          </View>
        </View>
      </View>
      <DrawerContentScrollView style={{paddingTop: 0}}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="home" size={size} color={color} />
          )}
          label="Home"
          onPress={() => props.navigation.navigate('LandingPage')}
        />
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="user" size={size} color={color} />
          )}
          label="Profile"
          onPress={() => props.navigation.navigate('selfProfile')}
        />
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="message1" size={size} color={color} />
          )}
          label="Contact"
          onPress={() => props.navigation.navigate('Contact')}
        />
      </DrawerContentScrollView>
      <View style={style.rowSignOut}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="poweroff" size={size} color={color} />
          )}
          label="Log Out"
          onPress={() => handlePress()}
        />
      </View>
    </>
  );
};

const style = StyleSheet.create({
  rowSignOut: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  background: {
    backgroundColor: '#8D0337',
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    height: 150,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imageProfile: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textName: {
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
  textPhoneNumber: {
    color: 'white',
    marginTop: 5,
  },
});

export default DrawerContent;
