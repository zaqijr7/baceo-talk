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
import DrawerNav from './DrawerNavigator';

function NavigationRoot(props) {
  const Stack = createStackNavigator();
  return (
    <>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </>
  );
}

export default NavigationRoot;
