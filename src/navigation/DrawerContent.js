import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome5';
import avatar from '../assets/images/avatar.jpg';

const DrawerContent = (props) => {
  return (
    <>
      <View style={style.background}>
        <Image source={avatar} style={style.imageProfile} />
        <View>
          <Text style={style.textName}>Muhammad Zaqi</Text>
          <Text style={style.textPhoneNumber}>085842752523</Text>
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
            <Icon name="user-alt" size={size} color={color} />
          )}
          label="Profile"
          onPress={() => props.navigation.navigate('selfProfile')}
        />
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="address-book" size={size} color={color} />
          )}
          label="Contact"
          onPress={() => props.navigation.navigate('selfProfile')}
        />
      </DrawerContentScrollView>
      <View style={style.rowSignOut}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="sign-out-alt" size={size} color={color} />
          )}
          label="Log Out"
          onPress={() => props.navigation.navigate('')}
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
    backgroundColor: '#BA275E',
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
