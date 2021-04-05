/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {useSelector} from 'react-redux';
import ListContact from '../components/ListContact';
import http from '../helper/http';
import Icon from 'react-native-vector-icons/FontAwesome5';

const separator = () => {
  return <View style={style.separator} />;
};

function Contact() {
  const [contact, setContact] = useState([]);
  const [msgRes, setMsgRes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sort, setSort] = useState('ASC');
  const [up, setUp] = useState(false);
  const [inputSearch, setInputSearch] = useState('');
  const profile = useSelector((state) => state.auth.profile);

  const getContact = async () => {
    setIsLoading(true);
    setMsgRes(null);
    try {
      const response = await http().get(
        `allUser?search=${inputSearch}&sort=name&order=${sort}&id_user=${profile.id_user}`,
      );
      const result = response.data.results;
      console.log(result.length, 'ini banyak kontak');
      if (result.length === 0) {
        setIsLoading(false);
        setMsgRes('Contact not found');
      } else {
        setContact(response.data.results);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setMsgRes('Contact not found');
    }
  };

  const handleSort = () => {
    setUp(!up);
    if (up === false) {
      setSort('ASC');
    } else {
      setSort('DESC');
    }
  };

  useEffect(() => {
    getContact();
  }, [inputSearch, sort]);
  // const data = useSelector((state) => state.friend.friendList);
  return (
    <>
      <View style={style.parentWrapper}>
        <View style={style.wrapperInput}>
          <Icon name="search" style={style.iconSearch} />
          <TextInput
            style={style.formInput}
            placeholder="Search Contact..."
            onChangeText={(value) => setInputSearch(value)}
          />
        </View>
        <View style={style.parentFrame}>
          {up === true ? (
            <TouchableOpacity
              style={style.btnArrow}
              onPress={() => handleSort()}>
              <Icon name="arrow-up" style={style.dropdownIcon} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={style.btnArrow}
              onPress={() => handleSort()}>
              <Icon name="arrow-down" style={style.dropdownIcon} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={style.parentWrapperList}>
        {msgRes !== null ? (
          <View style={style.wrapperLoading}>
            <Text style={style.textNotFound}>{msgRes}</Text>
          </View>
        ) : (
          <>
            {isLoading === true ? (
              <View style={style.wrapperLoading}>
                <ActivityIndicator size="large" color="black" />
              </View>
            ) : (
              <FlatList
                data={contact}
                keyExtractor={(item, index) => String(item.id_user)}
                renderItem={({item}) => {
                  return (
                    <ListContact
                      id={item.id_user}
                      email={item.email}
                      name={item.name}
                      phoneNumber={item.phoneNumber}
                      photo={item.photo}
                    />
                  );
                }}
                ItemSeparatorComponent={separator}
              />
            )}
          </>
        )}
      </View>
    </>
  );
}

const style = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#D0D1D2',
    width: '78%',
    marginLeft: '22%',
  },
  formInput: {
    borderStyle: 'solid',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingStart: 40,
    paddingVertical: 5,
    width: 262,
    height: 48,
  },
  wrapperInput: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    marginVertical: 15,
  },
  iconSearch: {
    position: 'absolute',
    fontSize: 16,
    color: '#888',
    marginLeft: 15,
    zIndex: 2,
  },
  parentWrapper: {
    backgroundColor: '#8D0337',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  parentWrapperList: {
    flex: 1,
  },
  btnSortBy: {
    width: 170,
    backgroundColor: '#aaa',
  },
  bodyDropdown: {
    width: 170,
    backgroundColor: '#fafafa',
  },
  parentFrame: {
    flexDirection: 'row',
  },
  btnLocation: {
    height: 48,
    // width: 160,
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 16,
    color: '#4E4B66',
  },
  btnWrapper: {
    height: 48,
    // width: 160,
    flex: 1,
    backgroundColor: '#EFF0F6',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  iconCalendar: {
    fontSize: 16,
    color: '#4E4B66',
  },
  buttonTitle: {
    fontSize: 16,
    color: '#4E4B66',
  },
  dropdownIcon: {
    position: 'absolute',
    right: 0,
    fontSize: 16,
    color: '#4E4B66',
    marginRight: 15,
  },
  btnArrow: {
    height: 48,
    width: 48,
    backgroundColor: '#EFF0F6',
    marginLeft: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperLoading: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNotFound: {
    fontSize: 16,
    color: '#CCCCCC',
  },
});

export default Contact;
