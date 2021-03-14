import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import PIN from '../assets/images/pin.png';
import http from '../helper/http';

function Pin() {
  const [valOne, setValOne] = useState('');
  const [valTwo, setValTwo] = useState('');
  const [valThree, setValThree] = useState('');
  const [valFour, setValFour] = useState('');
  const [valFive, setValFive] = useState('');
  const pin = `${valOne}${valTwo}${valThree}${valFour}${valFive}`;
  const auth = useSelector((state) => state.auth);
  const navigation = useNavigation();

  const handlePress = async () => {
    const data = new URLSearchParams();
    data.append('email', auth.emailRegis);
    data.append('phoneNum', auth.emailRegis);
    data.append('email', auth.phoneNumRegis);
    try {
      const response = await http().get('auth', data);
    } catch (err) {}
  };
  console.log(pin);
  return (
    <View style={style.parentWrapper}>
      <View style={style.row}>
        <Image source={PIN} style={style.iconUnlock} />
        <Text style={style.textEnterPin}>Enter PIN</Text>
        <Text style={style.text}>
          We've sent an email with pin verification to your email :
          {auth.emailRegis}
        </Text>
      </View>
      <View style={style.rowInput}>
        <TextInput
          maxLength={1}
          style={style.inputPin}
          keyboardType="number-pad"
          onChangeText={(value) => setValOne(value)}
        />
        <TextInput
          maxLength={1}
          style={style.inputPin}
          keyboardType="number-pad"
          onChangeText={(value) => setValTwo(value)}
        />
        <TextInput
          maxLength={1}
          style={style.inputPin}
          keyboardType="number-pad"
          onChangeText={(value) => setValThree(value)}
        />
        <TextInput
          maxLength={1}
          style={style.inputPin}
          keyboardType="number-pad"
          onChangeText={(value) => setValFour(value)}
        />
        <TextInput
          maxLength={1}
          style={style.inputPin}
          keyboardType="number-pad"
          onChangeText={(value) => setValFive(value)}
        />
      </View>
      <View>
        <TouchableOpacity
          style={style.buttonSubmit}
          onPress={() => handlePress()}>
          <Text style={style.textSubmit}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  parentWrapper: {
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  iconUnlock: {
    width: 153.5,
    height: 95.5,
  },
  row: {
    alignItems: 'center',
    marginTop: 30,
  },
  textEnterPin: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'center',
    marginTop: 10,
  },
  rowInput: {
    flexDirection: 'row',
    marginTop: 15,
  },
  inputPin: {
    borderBottomWidth: 2,
    width: 40,
    marginHorizontal: 5,
    borderBottomColor: '#8D0337',
    textAlign: 'center',
  },
  buttonSubmit: {
    height: 45,
    width: 250,
    backgroundColor: '#8D0337',
    marginTop: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSubmit: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Pin;
