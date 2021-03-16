import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {useSelector} from 'react-redux';
import avatar from '../assets/images/avatar.jpg';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/core';
import {REACT_APP_API_URL as API_URL} from '@env';
import TextTicker from 'react-native-text-ticker';

const ProfilePeople = () => {
  const profile = useSelector((state) => state.friend.chatFocus);
  const [isEnabled, setIsEnabled] = useState(true);
  const navigation = useNavigation();
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <>
      <View style={style.row1}>
        {profile.photo === `${API_URL}null` ? (
          <Image source={avatar} style={style.avatar} />
        ) : (
          <Image source={{uri: profile.photo}} style={style.avatar} />
        )}
        <View style={style.rowName}>
          {profile.name === 'null' ? (
            <TextTicker
              style={style.title}
              duration={3000}
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={1000}>
              <Text style={style.textName}>{profile.email}</Text>
            </TextTicker>
          ) : (
            <TextTicker
              style={style.title}
              duration={3000}
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={1000}>
              <Text style={style.textName}>{profile.name}</Text>
            </TextTicker>
          )}

          <Text style={style.textLastSeen}>Last seen yesterday 23:16</Text>
        </View>
      </View>
      <View style={style.row2}>
        <Pressable
          style={style.btnChat}
          android_ripple={{color: 'black', radius: 37.5}}
          onPress={() => navigation.goBack()}>
          <Icon name="comments" style={style.iconChat} />
        </Pressable>
        <View style={style.rowInfoPhoneNumber}>
          <Text style={style.textInfo}>Info</Text>
          <Text style={style.textPhoneNumber}>{profile.phoneNumber}</Text>
          <Text style={style.textMobile}>Mobile</Text>
        </View>
        <View style={style.line} />
        <View style={style.rowNotification}>
          <View style={style.rowTextNotification}>
            <Text style={style.textPhoneNumber}>Notifications</Text>
            <Text style={style.textMobile}>
              {isEnabled === true ? 'On' : 'Off'}
            </Text>
          </View>
          <View>
            <Switch
              trackColor={{false: 'gray', true: '#BA275E'}}
              thumbColor={isEnabled ? 'white' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}]}}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  row1: {
    height: 140,
    backgroundColor: '#BA275E',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  row2: {
    paddingVertical: 20,
    backgroundColor: 'white',
    position: 'relative',
  },
  rowName: {
    flex: 1,
  },
  btnChat: {
    height: 75,
    width: 75,
    borderRadius: 50,
    backgroundColor: 'white',
    elevation: 3,
    position: 'absolute',
    right: 0,
    top: -37.5,
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
    height: 1,
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
  btnSwitch: {
    width: 70,
    height: 20,
  },
});

export default ProfilePeople;
