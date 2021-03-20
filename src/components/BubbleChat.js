import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

const BubbleChat = (props) => {
  const profile = useSelector((state) => state.auth.profile);
  return (
    <>
      {profile.id_user === props.idUser ? (
        <TouchableOpacity>
          <View style={style.parentRootSelf}>
            <View style={style.parentWrap}>
              <Text style={style.textSelf}>{props.message}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          <View style={style.parentRoot}>
            <View style={style.parentWrap}>
              <Text style={style.text}>{props.message}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const style = StyleSheet.create({
  parentRoot: {
    flex: 1,
    alignItems: 'flex-start',
  },
  parentRootSelf: {
    flex: 1,
    alignItems: 'flex-end',
  },
  parentWrap: {
    position: 'relative',
    marginVertical: 15,
    flexWrap: 'wrap',
  },
  text: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 9,
    fontSize: 15,
  },
  textSelf: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#BB265E',
    color: 'white',
    borderRadius: 9,
    fontSize: 15,
  },
});

export default BubbleChat;
