import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import HeaderHome from '../components/HeaderHome';
import NavigationRoot from './HomeNavigator';
import AuthNavigation from './AuthNavigation';
import DrawerContent from './DrawerContent';
import editPhoneNum from '../screens/EditPhoneNum';
import editEmail from '../screens/EditEmail';
import editName from '../screens/EditName';
import editPin from '../screens/EditPin';
import {useSelector} from 'react-redux';

const Drawer = createDrawerNavigator();

function DrawerNav() {
  const auth = useSelector((state) => state.auth);
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      {auth.token === null ? (
        <>
          <Drawer.Screen name="Auth" component={AuthNavigation} />
        </>
      ) : (
        <>
          <Drawer.Screen
            name="LandingPage"
            component={Home}
            options={{
              headerShown: true,
              header: () => <HeaderHome />,
            }}
          />

          <Drawer.Screen
            name="chatRoom"
            component={NavigationRoot}
            options={{drawerLabel: () => null}}
          />

          <Drawer.Screen
            name="selfProfile"
            component={Profile}
            options={{
              headerShown: false,
            }}
          />

          <Drawer.Screen
            component={editPhoneNum}
            name="editPhoneNum"
            options={{
              headerShown: true,
              headerTitle: 'Edit Phone Number',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#8D0337',
                elevation: 4,
              },
            }}
          />

          <Drawer.Screen
            component={editEmail}
            name="editEmail"
            options={{
              headerShown: true,
              headerTitle: 'Edit Email',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#8D0337',
                elevation: 4,
              },
            }}
          />

          <Drawer.Screen
            component={editName}
            name="editName"
            options={{
              headerShown: true,
              headerTitle: 'Edit Name',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#8D0337',
                elevation: 4,
              },
            }}
          />

          <Drawer.Screen
            component={editPin}
            name="editPin"
            options={{
              headerShown: true,
              headerTitle: 'Edit Name',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#8D0337',
                elevation: 4,
              },
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
}

export default DrawerNav;
