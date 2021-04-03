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
import {saveDataRegis} from '../redux/action/auth';
import {Formik} from 'formik';
import * as Yup from 'yup';

function Signup() {
  const [msgRes, setMsgRes] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handlePress = async (value) => {
    const phoneNumber = `${value.codeCountry}${value.phoneNum}`;
    try {
      const data = new URLSearchParams();
      data.append('email', value.email);
      data.append('phoneNumber', phoneNumber);
      const response = await http().post('auth', data);
      dispatch(saveDataRegis(value.email, phoneNumber));
      setMsgRes(response.data.message);
      navigation.navigate('pin');
    } catch (err) {
      setMsgRes(err.response.data.message);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Email required !'),
    codeCountry: Yup.number()
      .typeError('Form must be a number')
      .min(2, 'Country code must be two characters')
      .required('Country code required !'),
    phoneNum: Yup.number()
      .integer('Form must be a number')
      .typeError('Form must be a number')
      .required('Phone Number required !'),
  });

  return (
    <View style={style.parent}>
      <View style={style.rowTitle}>
        <Text style={style.title}>Login To Your Account</Text>
        <Text style={style.subTitle}>
          Make sure the email and phone number is active to get PIN Verification
        </Text>
      </View>
      {msgRes !== null && <Text style={style.title}>{msgRes}</Text>}
      <Formik
        initialValues={{email: '', codeCountry: '', phoneNum: ''}}
        onSubmit={(values) => {
          handlePress(values);
        }}
        validationSchema={validationSchema}>
        {({
          handleChange,
          errors,
          touched,
          handleSubmit,
          handleBlur,
          isValid,
          values,
        }) => (
          <>
            <TextInput
              placeholder="Write Your Email Here"
              style={style.inputEmail}
              keyboardType="email-address"
              autoCompleteType="email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            {errors.email && touched.email ? (
              <Text style={style.textDanger}>{errors.email}</Text>
            ) : null}
            <View style={style.rowInput}>
              <TextInput
                placeholder="62"
                maxLength={2}
                style={style.codeCountry}
                keyboardType="phone-pad"
                onChangeText={handleChange('codeCountry')}
                onBlur={handleBlur('codeCountry')}
              />
              <TextInput
                placeholder="Write Your Phone Number Here"
                style={style.phoneNumber}
                keyboardType="phone-pad"
                onChangeText={handleChange('phoneNum')}
                onBlur={handleBlur('phoneNum')}
              />
            </View>
            {(errors.phoneNum && touched.phoneNum) ||
            (errors.codeCountry && touched.codeCountry) ? (
              <Text style={style.textDanger}>
                {errors.phoneNum || errors.codeCountry}
              </Text>
            ) : null}
            <View style={style.parentButton}>
              {isValid === false ||
              values.email === '' ||
              values.codeCountry === '' ||
              values.phoneNum === '' ? (
                <TouchableOpacity
                  style={style.buttonNextDisable}
                  onPress={handleSubmit}
                  disabled>
                  <Icon name="arrow-right" style={style.arrowIcon} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={style.buttonNext}
                  onPress={handleSubmit}>
                  <Icon name="arrow-right" style={style.arrowIcon} />
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </Formik>
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
  textDanger: {
    color: 'red',
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
  buttonNextDisable: {
    backgroundColor: 'gray',
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
