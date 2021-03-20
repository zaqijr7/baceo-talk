import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatRoom from '../screens/ChatRoom';
import HeaderChatRoom from '../components/HeaderChatRoom';
import ProfilePeople from '../screens/ProfilePeople';
import HeaderProfilePeople from '../components/HeaderProfilePeople';

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
