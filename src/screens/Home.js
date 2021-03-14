import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import Chatlist from '../components/Chatlist';
import http from '../helper/http';

const separator = () => {
  return <View style={style.separator} />;
};

function Home() {
  const [data, setData] = useState([]);
  const auth = useSelector((state) => state.auth);
  const [msg, setMsg] = useState('');
  const getHistoyInteraction = async () => {
    try {
      const response = await http(auth.token).get('history');
      setData(response.data.results);
    } catch (err) {
      setMsg('please wait');
    }
  };

  useEffect(() => {
    getHistoyInteraction();
  }, []);
  // const data = useSelector((state) => state.friend.friendList);
  console.log(data, 'ini datya');
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => String(item.id_chat)}
        renderItem={({item}) => {
          console.log(item.name);
          return (
            <Chatlist
              senderId={item.senderId}
              senderEmail={item.senderEmail}
              senderPhoneNum={item.senderPhoneNumber}
              senderName={item.senderName}
              senderPhoto={item.senderPhoto}
              receipentId={item.receipentId}
              receipentEmail={item.receipentEmail}
              receipentPhoneNum={item.receipentPhoneNumber}
              receipentName={item.receipentName}
              receipentPhoto={item.receipentPhoto}
              message={item.message}
              createdAt={item.createdAt}
            />
          );
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
