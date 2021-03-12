import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function Signup() {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('pin');
  };
  return (
    <View style={style.parent}>
      <View style={style.rowTitle}>
        <Text style={style.title}>Create Account First</Text>
        <Text style={style.subTitle}>
          Make sure the email and phone number is active
        </Text>
      </View>
      <TextInput
        placeholder="Write Your Email Here"
        style={style.inputEmail}
        keyboardType="email-address"
      />
      <View style={style.rowInput}>
        <TextInput defaultValue="+62" style={style.codeCountry} />
        <TextInput
          placeholder="Write Your Phone Number Here"
          style={style.phoneNumber}
          keyboardType="number-pad"
        />
      </View>
      <TouchableOpacity
        style={style.textLogin}
        onPress={() => navigation.navigate('signin')}>
        <Text>
          Do you have account? <Text style={style.login}>Login</Text>
        </Text>
      </TouchableOpacity>
      <View style={style.parentButton}>
        <TouchableOpacity
          style={style.buttonNext}
          onPress={() => handlePress()}>
          <Icon name="arrow-right" style={style.arrowIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  parent: {
    justifyContent: 'center',
    alignItems: 'center',
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
});
export default Signup;
