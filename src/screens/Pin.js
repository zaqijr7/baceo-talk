import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PIN from '../assets/images/pin.png';

function Pin() {
  return (
    <View style={style.parentWrapper}>
      <View style={style.row}>
        <Image source={PIN} style={style.iconUnlock} />
        <Text style={style.textEnterPin}>Enter PIN</Text>
        <Text style={style.text}>
          We've sent an email with pin verification to your email :
          zaqijr7@gmail.com
        </Text>
      </View>
      <View style={style.rowInput}>
        <TextInput
          maxLength={1}
          style={style.inputPin}
          keyboardType="number-pad"
        />
        <TextInput
          maxLength={1}
          style={style.inputPin}
          keyboardType="number-pad"
        />
        <TextInput
          maxLength={1}
          style={style.inputPin}
          keyboardType="number-pad"
        />
        <TextInput
          maxLength={1}
          style={style.inputPin}
          keyboardType="number-pad"
        />
        <TextInput
          maxLength={1}
          style={style.inputPin}
          keyboardType="number-pad"
        />
      </View>
      <View>
        <TouchableOpacity style={style.buttonSubmit}>
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
