import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import persistedStore from './src/redux/store';
import DrawerNav from './src/navigation/DrawerNavigator';
import SocketRoot from './src/components/SocketRoot';

function App() {
  const {persistore, store} = persistedStore();
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <>
      <PersistGate persistor={persistore}>
        <Provider store={store}>
          <NavigationContainer>
            <SocketRoot>
              <DrawerNav />
            </SocketRoot>
          </NavigationContainer>
        </Provider>
      </PersistGate>
    </>
  );
}

export default App;
