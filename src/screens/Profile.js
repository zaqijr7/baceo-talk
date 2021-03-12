import React from 'react';
import {Image, ImageBackground, StyleSheet, Text} from 'react-native';
import avatar from '../assets/images/asa.jpg';

function Profile() {
  return (
    <>
      <Image source={avatar} style={style.photo} />
    </>
  );
}

const style = StyleSheet.create({
  photo: {
    width: '100%',
    height: '45%',
  },
});

export default Profile;
