import React, {Profiler} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Signup from '../screens/Signup';
import Pin from '../screens/Pin';
import Signin from '../screens/Signin';
import Home from '../screens/Home';
import ChatRoom from '../screens/ChatRoom';
import HeaderHome from '../components/HeaderHome';
import HeaderChatRoom from '../components/HeaderChatRoom';
import ProfilePeople from '../screens/ProfilePeople';
import HeaderProfilePeople from '../components/HeaderProfilePeople';
import Profile from '../screens/Profile';
import HeaderSelfProfile from '../components/HeaderSelfProfile';
// import Drawer from './DrawerNavigator';

function NavigationRoot(props) {
  const Stack = createStackNavigator();
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          component={Profile}
          name="profileSelf"
          options={{
            header: () => <HeaderSelfProfile />,
          }}
        />
        <Stack.Screen
          component={Signup}
          name="Signup"
          options={{
            headerShown: true,
            headerTitle: 'Register',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#8D0337',
              elevation: 4,
            },
          }}
        />

        <Stack.Screen
          component={Pin}
          name="pin"
          options={{
            headerShown: true,
            headerTitle: 'PIN Verification',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#8D0337',
              elevation: 4,
            },
          }}
        />

        <Stack.Screen
          component={Signin}
          name="signin"
          options={{
            headerShown: true,
            headerTitle: 'Sign In',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#8D0337',
              elevation: 4,
            },
          }}
        />

        <Stack.Screen
          component={Home}
          name="home"
          options={{
            header: () => <HeaderHome />,
          }}
        />

        <Stack.Screen
          component={ChatRoom}
          name="chatRoom"
          options={{
            header: () => <HeaderChatRoom />,
          }}
        />

        <Stack.Screen
          component={ProfilePeople}
          name="profile"
          options={{
            header: () => <HeaderProfilePeople />,
          }}
        />

        {/* <Stack.Screen name="Home" component={Drawer} /> */}
      </Stack.Navigator>
    </>
  );
}

export default NavigationRoot;
