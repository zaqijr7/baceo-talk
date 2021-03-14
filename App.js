import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import persistedStore from './src/redux/store';
// import NavigationRoot from './src/navigation/index';
import DrawerNav from './src/navigation/DrawerNavigator';

function App() {
  const {persistore, store} = persistedStore();
  return (
    <>
      {/* <PersistGate persistor={persistore}> */}
      <Provider store={store}>
        <NavigationContainer>
          {/* <NavigationRoot /> */}
          <DrawerNav />
        </NavigationContainer>
      </Provider>
      {/* </PersistGate> */}
    </>
  );
}

export default App;
