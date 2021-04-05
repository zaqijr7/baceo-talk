/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Chatlist from '../components/Chatlist';
import {
  historyInteraction,
  msgResponse,
} from '../redux/action/interactionHistory';

const separator = () => {
  return <View style={style.separator} />;
};

function Home() {
  const data = useSelector((state) => state.messageList.interaction);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const getHistoyInteraction = async () => {
    try {
      dispatch(historyInteraction(auth.token));
    } catch (err) {
      dispatch(msgResponse(err.response.data.message));
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
