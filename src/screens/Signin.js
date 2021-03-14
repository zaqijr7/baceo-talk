import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import http from '../helper/http';
import {login} from '../redux/action/auth';

function Signin() {
  const [email, setEmail] = useState('');
  const [codeCountry, setCodeCountry] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [msgRes, setMsgRes] = useState(null);
  const phoneNumber = `${codeCountry}${phoneNum}`;
  const [valOne, setValOne] = useState('');
  const [valTwo, setValTwo] = useState('');
  const [valThree, setValThree] = useState('');
  const [valFour, setValFour] = useState('');
  const [valFive, setValFive] = useState('');
  const pin = `${valOne}${valTwo}${valThree}${valFour}${valFive}`;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handlePress = async () => {
    const data = new URLSearchParams();
    data.append('email', email);
    data.append('phoneNumber', phoneNumber);
    data.append('pin', pin);
    console.log(data);
    try {
      setMsgRes(null);
      const response = await http().patch('auth', data);
      dispatch(login(response.data.results.token));
    } catch (err) {
      setMsgRes(err.response.data.message);
    }
    navigation.navigate('LandingPage');
  };
  return (
    <View style={style.parent}>
      <View style={style.rowTitle}>
        <Text style={style.title}>Sign In</Text>
        <Text style={style.subTitle}>
          Make sure your account has been registered
        </Text>
      </View>
      {setMsgRes !== null && <Text style={style.title}>{msgRes}</Text>}
      <TextInput
        placeholder="Write Your Email Here"
        style={style.inputEmail}
        keyboardType="email-address"
        onChangeText={(value) => setEmail(value)}
      />
      <View style={style.rowInput}>
        <TextInput
          placeholder="62"
          style={style.codeCountry}
          maxLength={2}
          keyboardType="phone-pad"
          onChangeText={(value) => setCodeCountry(value)}
        />
        <TextInput
          placeholder="Write Your Phone Number Here"
          style={style.phoneNumber}
          keyboardType="phone-pad"
          onChangeText={(value) => setPhoneNum(value)}
        />
      </View>
      <View style={style.rowInputPin}>
        <Text style={style.textPin}>PIN :</Text>
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
          <Icon name="sign-in" style={style.arrowIcon} />
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
export default Signin;
