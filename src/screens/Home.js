import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import Chatlist from '../components/Chatlist';

const separator = () => {
  return <View style={style.separator} />;
};

function Home() {
  const data = useSelector((state) => state.friend.friendList);
  console.log(data, 'ini datya');
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(key, index) => String(index)}
        renderItem={({item}) => {
          console.log(item.name);
          return <Chatlist name={item.name} message={item.message} />;
        }}
        ItemSeparatorComponent={separator}
      />
    </View>
  );
}

const style = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#D0D1D2',
    width: '78%',
    marginLeft: '22%',
  },
});

export default Home;
