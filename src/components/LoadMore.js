import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

function LoadMore(props) {
  const pageInfo = useSelector((state) => state.messageList.pageInfoHistoryMsg);

  return (
    <>
      {pageInfo !== null ? (
        <View style={style.row}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <View style={style.row2} />
      )}
    </>
  );
}

const style = StyleSheet.create({
  row: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 10,
  },
  row2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: '100%',
    height: 1,
    backgroundColor: 'transparent',
  },
});

export default LoadMore;
