import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import moment from 'moment';

const BubbleChat = (props) => {
  const profile = useSelector((state) => state.auth.profile);
  return (
    <>
      {profile.id_user === props.idUser ? (
        <TouchableOpacity>
          <Text style={style.timeSelf}>
            {moment(props.time).format('ll LT')}
          </Text>
          <View style={style.parentRootSelf}>
            <View style={style.parentWrap}>
              <Text style={style.textSelf}>{props.message}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          <Text style={style.time}>{moment(props.time).format('ll LT')}</Text>
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
    marginVertical: 10,
    flexWrap: 'nowrap',
  },
  text: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 9,
    fontSize: 15,
    flexShrink: 1,
  },
  textSelf: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#BB265E',
    color: 'white',
    borderRadius: 9,
    fontSize: 15,
  },
  timeSelf: {
    textAlign: 'right',
    fontSize: 13,
    marginTop: 10,
    paddingRight: 8,
    color: '#5F6368',
  },
  time: {
    fontSize: 13,
    paddingRight: 8,
    marginTop: 14,
    paddingLeft: 8,
    color: '#5F6368',
  },
});

export default BubbleChat;
