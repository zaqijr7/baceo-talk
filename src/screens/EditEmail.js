/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import http from '../helper/http';
import {updateProfile} from '../redux/action/auth';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';

function editEmail() {
  const dispatch = useDispatch();
  const [msgRes, setMsgRes] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const handlePress = async (value) => {
    const data = new URLSearchParams();
    data.append('email', value.email);
    const response = await http(token).patch('profile', data);
    dispatch(updateProfile(response.data.results));
    setMsgRes(response.data.message);
    setTimeout(() => {
      setMsgRes(null);
    }, 1500);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Email required !'),
  });

  return (
    <View style={style.parent}>
      <View style={style.rowTitle}>
        <Text style={style.title}>Edit Email</Text>
        <Text style={style.subTitle}>Edit your Email here</Text>
        {msgRes !== null && <Text style={style.title}>{msgRes}</Text>}
      </View>
      <Formik
        initialValues={{email: ''}}
        onSubmit={(values) => {
          handlePress(values);
          values.email = '';
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
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            {errors.email && touched.email ? (
              <Text style={style.textDanger}>{errors.email}</Text>
            ) : null}
            <View style={style.parentButton}>
              {isValid === false || values.email === '' ? (
                <TouchableOpacity
                  style={style.buttonNextDisable}
                  onPress={handleSubmit}
                  disabled>
                  <Icon name="save" style={style.arrowIcon} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={style.buttonNext}
                  onPress={handleSubmit}>
                  <Icon name="save" style={style.arrowIcon} />
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
    // alignItems: 'center',
    paddingHorizontal: 25,
    flex: 1,
  },
  textDanger: {
    color: 'red',
    textAlign: 'center',
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
export default editEmail;
