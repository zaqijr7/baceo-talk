import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import {REACT_APP_API_URL as API_URL} from '@env';
import HeaderSelfProfile from '../components/HeaderSelfProfile';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/core';
import TextTicker from 'react-native-text-ticker';
import avatar from '../assets/images/avatar.jpg';
import {useDispatch, useSelector} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import http from '../helper/http';
import {updateProfile} from '../redux/action/auth';

function Profile() {
  const profile = useSelector((state) => state.auth.profile);
  const [showModal, setShowModal] = useState(false);
  const [msgRes, setMsgRes] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const choosePhotto = () => {
    setShowModal(!showModal);
  };

  const openGallery = () => {
    const options = {mediaType: 'photo'};
    launchImageLibrary(options, async (response) => {
      if (response.fileSize > 2000000) {
        setMsgRes('the file is too large');
        setTimeout(() => {
          setMsgRes(null);
        }, 1000);
      } else {
        await uploadPhoto(response);
      }
    });
  };

  const openCamera = () => {
    const options = {mediaType: 'photo'};
    launchCamera(options, async (response) => {
      if (response.fileSize > 2000000) {
        setMsgRes('the file is too large');
        setTimeout(() => {
          setMsgRes(null);
        }, 1000);
      } else {
        await uploadPhoto(response);
      }
    });
  };

  const uploadPhoto = async (image) => {
    console.log(image, 'ini image dari kamera');
    const fileUpload = {
      uri: image.uri,
      type: 'image/jpeg',
      name: image.fileName,
    };
    const file = new FormData();
    file.append('photo', fileUpload);
    const response = await http(token).put('profile', file);
    dispatch(updateProfile(response.data.results));
    setMsgRes(response.data.message);
    setTimeout(() => {
      setMsgRes(null);
    }, 2000);
  };

  const deletePhoto = async () => {
    const response = await http(token).delete('profile');
    dispatch(updateProfile(response.data.results));
    setMsgRes(response.data.message);
    setTimeout(() => {
      setMsgRes(null);
    }, 2000);
  };

  const navigation = useNavigation();
  return (
    <>
      <Modal
        transparent={true}
        visible={showModal}
        style={{flex: 1}}
        animationType="fade">
        <View style={style.parentModal}>
          <View style={style.bodyModal}>
            {msgRes !== null ? (
              <>
                <Text style={style.textInfo}>{msgRes.toUpperCase()}</Text>
                <View style={style.rowBtnClose}>
                  <TouchableOpacity
                    style={style.btnClose}
                    onPress={() => setShowModal(false)}>
                    <Text style={style.textBtn}>Close</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <View>
                  <TouchableOpacity
                    onPress={() => openGallery()}
                    style={style.btnChooseImage}>
                    <Text style={style.textBtn}>Open Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => openCamera()}
                    style={style.btnChooseImage}>
                    <Text style={style.textBtn}>Open Camera</Text>
                  </TouchableOpacity>
                </View>
                <View style={style.rowBtnClose}>
                  <TouchableOpacity
                    style={style.btnDelete}
                    onPress={() => deletePhoto()}>
                    <Icon name="trash" style={style.iconTrash} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={style.btnClose}
                    onPress={() => setShowModal(false)}>
                    <Text style={style.textBtn}>Close</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
      <ImageBackground
        source={
          profile.photo === `${API_URL}null` ? avatar : {uri: profile.photo}
        }
        style={style.photo}>
        <HeaderSelfProfile />
        <View style={style.rowName}>
          {profile.name === 'null' ? (
            <TextTicker
              style={style.title}
              duration={3000}
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={1000}>
              <Text style={style.textNameSelf}>{profile.email}</Text>
            </TextTicker>
          ) : (
            <TextTicker
              style={style.title}
              duration={3000}
              loop
              bounce
              repeatSpacer={50}
              marqueeDelay={1000}>
              <Text style={style.textNameSelf}>{profile.name}</Text>
            </TextTicker>
          )}
          <Text style={{color: 'white'}}>Online</Text>
        </View>
      </ImageBackground>
      <View>
        <Pressable
          style={style.btnChat}
          android_ripple={{color: 'black', radius: 37.5}}
          onPress={() => choosePhotto()}>
          <Icon name="camera" style={style.iconChat} />
        </Pressable>
      </View>
      <ScrollView>
        <View style={style.row2}>
          <View style={style.rowInfoPhoneNumber}>
            <Text style={style.textInfo}>Account</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('editPhoneNum')}>
              <Text style={style.textPhoneNumber}>+{profile.phoneNumber}</Text>
              <Text style={style.textMobile}>Tap to change phone number</Text>
            </TouchableOpacity>
          </View>
          <View style={style.line} />
          <TouchableOpacity
            style={style.rowInfoPhoneNumber}
            onPress={() => navigation.navigate('editEmail')}>
            <Text style={style.textPhoneNumber}>{profile.email}</Text>
            <Text style={style.textMobile}>Email</Text>
          </TouchableOpacity>
          <View style={style.line} />
          <TouchableOpacity
            style={style.rowInfoPhoneNumber}
            onPress={() => navigation.navigate('editName')}>
            <Text style={style.textPhoneNumber}>Name</Text>
            <Text style={style.textMobile}>
              {profile.name === 'null'
                ? "You haven't updated the name yet"
                : profile.name}
            </Text>
          </TouchableOpacity>
          <View style={style.line} />
          {/* <TouchableOpacity
            style={style.rowInfoPhoneNumber}
            onPress={() => navigation.navigate('editPin')}>
            <Text style={style.textPhoneNumber}>PIN</Text>
            <Text style={style.textMobile}>Edit your PIN</Text>
          </TouchableOpacity>
          <View style={style.line} /> */}
          <TouchableOpacity style={style.rowInfoPhoneNumber}>
            <Text style={style.textPhoneNumber}>Bio</Text>
            <Text style={style.textMobile}>Add a few words about yourself</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const style = StyleSheet.create({
  photo: {
    width: '100%',
    height: 330,
  },
  rowName: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  textNameSelf: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    elevation: 3,
  },
  row2: {
    paddingVertical: 15,
    backgroundColor: 'white',
    position: 'relative',
  },
  btnChat: {
    height: 75,
    width: 75,
    borderRadius: 50,
    backgroundColor: 'white',
    elevation: 3,
    position: 'absolute',
    right: 0,
    bottom: -37.5,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconChat: {
    fontSize: 30,
    color: '#BA275E',
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 80,
    marginRight: 25,
  },
  textName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  textLastSeen: {
    fontSize: 13,
    color: 'white',
  },
  rowInfoPhoneNumber: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  textInfo: {
    color: '#BA275E',
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 15,
  },
  textPhoneNumber: {
    fontSize: 15,
    marginBottom: 5,
  },
  textMobile: {
    fontSize: 13,
    color: '#929296',
  },
  line: {
    height: 0.9,
    backgroundColor: '#929296',
    marginBottom: 20,
    width: '85%',
    marginLeft: '15%',
  },
  rowNotification: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowTextNotification: {
    flex: 1,
  },
  parentModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // position: 'absolute',
  },
  bodyModal: {
    backgroundColor: 'white',
    height: 270,
    width: 270,
    borderRadius: 15,
    padding: 20,
  },
  btnChooseImage: {
    width: '100%',
    backgroundColor: '#BA275E',
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
  rowBtnClose: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  btnClose: {
    height: 40,
    width: 100,
    borderRadius: 10,
    backgroundColor: '#ba0900',
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
});

export default Profile;
