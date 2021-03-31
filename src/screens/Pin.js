import React, {useState} from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PIN from '../assets/images/pin.png';
import http from '../helper/http';
import {login} from '../redux/action/auth';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

function Pin() {
  const [password, setPassword] = useState('');
  const [msgRes, setMsgRes] = useState(null);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handlePress = async () => {
    const data = new URLSearchParams();
    data.append('email', auth.emailRegis);
    data.append('phoneNumber', auth.emailRegis);
    data.append('pin', password);
    console.log(data);
    try {
      setMsgRes(null);
      const response = await http().patch('auth', data);
      dispatch(login(response.data.results.token));
    } catch (err) {
      setMsgRes(err.response.data.message);
    }
  };
  return (
    <View style={style.parentWrapper}>
      <View style={style.row}>
        <Image source={PIN} style={style.iconUnlock} />
        <Text style={style.textEnterPin}>Enter PIN</Text>
        <Text style={style.text}>
          We've sent an email with pin verification to your email :
          {auth.emailRegis}
        </Text>
        {msgRes !== null && <Text style={style.title}>{msgRes}</Text>}
      </View>
      <View style={style.rowInput}>
        <SmoothPinCodeInput
          password
          mask="﹡"
          cellSize={50}
          cellStyle={style.cellStyle}
          cellStyleFocused={style.cellStyleFocused}
          codeLength={5}
          value={password}
          onTextChange={(value) => setPassword(value)}
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
  cellStyle: {
    borderBottomWidth: 2,
    borderColor: '#8D0337',
  },
  cellStyleFocused: {
    borderColor: 'black',
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
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8D0337',
  },
});

export default Pin;
