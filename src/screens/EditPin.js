/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {updateProfile} from '../redux/action/auth';
import http from '../helper/http';
import {useDispatch, useSelector} from 'react-redux';

function editPin() {
  const [valOne, setValOne] = useState('');
  const [valTwo, setValTwo] = useState('');
  const [valThree, setValThree] = useState('');
  const [valFour, setValFour] = useState('');
  const [valFive, setValFive] = useState('');
  const pin = `${valOne}${valTwo}${valThree}${valFour}${valFive}`;
  const dispatch = useDispatch();
  const [msgRes, setMsgRes] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const handlePress = async () => {
    const data = new URLSearchParams();
    data.append('pin', pin);
    const response = await http(token).patch('profile', data);
    dispatch(updateProfile(response.data.results));
    setMsgRes(response.data.message);
    setTimeout(() => {
      setMsgRes(null);
    }, 1500);
  };

  return (
    <View style={style.parent}>
      <View style={style.rowTitle}>
        <Text style={style.title}>Edit Your PIN</Text>
        <Text style={style.subTitle}>Edit your PIN here</Text>
        {msgRes !== null && <Text style={style.title}>{msgRes}</Text>}
      </View>
      <View style={style.rowInputPin}>
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
      <View style={style.parentButton}>
        <TouchableOpacity
          style={style.buttonNext}
          onPress={() => handlePress()}>
          <Icon name="save" style={style.arrowIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  parent: {
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 25,
    flex: 1,
  },
  inputEmail: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#8D0337',
    marginVertical: 10,
  },
  codeCountry: {
    width: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#8D0337',
    textAlign: 'center',
  },
  rowInput: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  phoneNumber: {
    marginLeft: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#8D0337',
    flex: 1,
  },
  rowTitle: {
    marginTop: 30,
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8D0337',
  },
  subTitle: {
    color: '#707478',
    marginTop: 10,
    textAlign: 'center',
  },
  parentButton: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  buttonNext: {
    backgroundColor: '#8D0337',
    width: 70,
    height: 70,
    borderRadius: 100,
    marginBottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  arrowIcon: {
    fontSize: 18,
    color: 'white',
  },
  textLogin: {
    marginTop: 20,
  },
  login: {
    fontWeight: 'bold',
    color: '#8D0337',
  },
  inputPin: {
    borderBottomWidth: 2,
    width: 40,
    marginRight: 15,
    borderBottomColor: '#8D0337',
    textAlign: 'center',
  },
  rowInputPin: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textPin: {
    marginRight: 18,
    color: '#707478',
  },
});
export default editPin;
