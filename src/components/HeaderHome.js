import {DrawerActions, useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const HeaderHome = () => {
  const navigation = useNavigation();
  return (
    <View style={style.parentWrapper}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Icon name="bars" style={style.iconBar} />
      </TouchableOpacity>
      <Text style={style.title}>Baceo Talk</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
        <Icon name="search" style={style.iconSearch} />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  parentWrapper: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8D0337',
    paddingHorizontal: 20,
  },
  iconBar: {
    fontSize: 20,
    color: 'white',
    marginRight: 20,
  },
  iconSearch: {
    fontSize: 22,
    color: 'white',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default HeaderHome;
