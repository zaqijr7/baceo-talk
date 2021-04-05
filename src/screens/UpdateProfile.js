import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import http from '../helper/http';
import {login} from '../redux/action/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import avatar from '../assets/images/avatar.jpg';

const UpdateProfile = () => {
  const [msgRes, setMsgRes] = useState(null);
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [err, setErr] = useState(null);
  const [name, setName] = useState('');
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handlePress = async () => {
    try {
      if (image === null) {
        const form = new URLSearchParams();
        form.append('name', name);
        form.append('photo', 'null');
        await http(auth.temporaryToken).patch('profile', form);
        dispatch(login(auth.temporaryToken));
      } else {
        const fileUpload = {
          uri: image.uri,
          type: 'image/jpeg',
          name: image.fileName,
        };
        const data = new FormData();
        data.append('photo', fileUpload);
        await http(auth.temporaryToken).put('profile', data);
        const form = new URLSearchParams();
        form.append('name', name);
        await http(auth.temporaryToken).patch('profile', form);
        dispatch(login(auth.temporaryToken));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openGallery = () => {
    const options = {mediaType: 'photo'};
    launchImageLibrary(options, (response) => {
      if (response.fileSize > 2000000) {
        setMsgRes('Picture is too large');
        setTimeout(() => {
          setMsgRes(null);
        }, 2000);
      } else {
        setImage(response);
      }
    });
  };

  const openCamera = () => {
    const options = {mediaType: 'photo'};
    launchCamera(options, (response) => {
      if (response.fileSize > 2000000) {
        setMsgRes('Picture is too large');
        setTimeout(() => {
          setMsgRes(null);
        }, 2000);
      } else {
        setImage(response);
      }
    });
  };

  const handleChange = (values) => {
    const check = values.match(/[!@#$%^&*(),.?~`_'"-=:{}|<>]/);
    console.log(check !== null);
    if (check !== null) {
      setErr('Cannot be any special characters');
      setName('');
    } else {
      setName(values);
      setErr(null);
    }
  };

  return (
    <View style={styles.parentWrapper}>
      <Modal
        transparent={true}
        visible={showModal}
        style={{flex: 1}}
        animationType="slide">
        <View style={styles.parentModal}>
          <View style={styles.bodyModal}>
            <View>
              <TouchableOpacity
                onPress={() => openGallery()}
                style={styles.btnChooseImage}>
                <Text style={styles.textBtn}>Open Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => openCamera()}
                style={styles.btnChooseImage}>
                <Text style={styles.textBtn}>Open Camera</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rowBtnClose}>
              <TouchableOpacity
                style={styles.btnClose}
                onPress={() => setShowModal(false)}>
                <Text style={styles.textClose}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={styles.parentBtnChangePhoto}>
        <Icon name="camera-plus-outline" style={styles.iconCamera} />
        <View style={styles.backgroundCamera} />
        <View>
          <Image
            source={image === null ? avatar : {uri: image.uri}}
            style={styles.photoProfile}
          />
        </View>
      </TouchableOpacity>
      {msgRes !== null && (
        <View>
          <Text style={styles.textDanger}>{msgRes}</Text>
        </View>
      )}
      <View>
        <Text style={styles.textAddPhoto}>Add your photo profile</Text>
      </View>
      <TextInput
        placeholder="Write Your Name Here"
        style={styles.inputEmail}
        value={name}
        keyboardType="email-address"
        onChangeText={(value) => handleChange(value)}
      />
      {err && <Text style={styles.textDanger}>{err}</Text>}
      <Text>Enter your fullname</Text>
      {err !== null || name === '' ? (
        <TouchableOpacity style={styles.btnNextDisable} disabled>
          <Text style={styles.textBtn}>Next</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.btnNext} onPress={() => handlePress()}>
          <Text style={styles.textBtn}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  parentWrapper: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  parentModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyModal: {
    backgroundColor: 'white',
    height: 300,
    marginTop: 500,
    width: '100%',
    borderRadius: 15,
    padding: 20,
  },
  btnChooseImage: {
    width: '100%',
    backgroundColor: '#8D0337',
    height: 56,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  textBtn: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  textClose: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  rowBtnClose: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingBottom: 50,
  },
  btnClose: {
    height: 40,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDelete: {
    height: 40,
    width: 40,
    borderRadius: 10,
    backgroundColor: '#ba0900',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconTrash: {
    fontSize: 18,
    color: 'white',
  },
  btnUpload: {
    height: 40,
    width: 120,
    borderRadius: 10,
    backgroundColor: '#007a27',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  parentBtnChangePhoto: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginTop: 30,
    borderRadius: 100,
  },
  photoProfile: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  iconCamera: {
    position: 'absolute',
    color: 'white',
    fontSize: 50,
    zIndex: 10,
  },
  backgroundCamera: {
    height: 150,
    width: 150,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    position: 'absolute',
    zIndex: 5,
  },
  textDanger: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
  textAddPhoto: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    marginTop: 10,
  },
  inputEmail: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: '#8D0337',
    marginTop: 80,
    marginBottom: 10,
  },
  btnNext: {
    width: 150,
    backgroundColor: '#8D0337',
    height: 56,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 40,
  },
  btnNextDisable: {
    width: 150,
    backgroundColor: 'gray',
    height: 56,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 40,
  },
});

export default UpdateProfile;
