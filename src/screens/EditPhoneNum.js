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
import {Formik} from 'formik';
import * as Yup from 'yup';

function editPhoneNum() {
  const [msgRes, setMsgRes] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handlePress = async (value) => {
    const phoneNumber = `${value.codeCountry}${value.phoneNum}`;
    const data = new URLSearchParams();
    data.append('phoneNumber', phoneNumber);
    const response = await http(token).patch('profile', data);
    dispatch(updateProfile(response.data.results));
    setMsgRes(response.data.message);
    setTimeout(() => {
      setMsgRes(null);
    }, 1500);
  };

  const validationSchema = Yup.object().shape({
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
        <Text style={style.title}>Edit Phone Number</Text>
        <Text style={style.subTitle}>Edit your phone number here</Text>
        {msgRes !== null && <Text style={style.title}>{msgRes}</Text>}
      </View>
      <Formik
        initialValues={{codeCountry: '', phoneNum: ''}}
        onSubmit={(values) => {
          handlePress(values);
          values.codeCountry = '';
          values.phoneNum = '';
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
            <View style={style.rowInput}>
              <TextInput
                placeholder="62"
                maxLength={2}
                keyboardType="phone-pad"
                value={values.codeCountry}
                style={style.codeCountry}
                onChangeText={handleChange('codeCountry')}
                onBlur={handleBlur('codeCountry')}
              />
              <TextInput
                placeholder="Write Your Phone Number Here"
                style={style.phoneNumber}
                keyboardType="phone-pad"
                value={values.phoneNum}
                maxLength={13}
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
  textDanger: {
    color: 'red',
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
export default editPhoneNum;
