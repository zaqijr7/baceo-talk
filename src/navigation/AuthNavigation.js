import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Signup from '../screens/Signup';
import Pin from '../screens/Pin';
// import Signin from '../screens/Signin';
import UpdateProfile from '../screens/UpdateProfile';

const AuthNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          component={Signup}
          name="Signup"
          options={{
            headerShown: true,
            headerTitle: 'Login and Register',
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
          component={UpdateProfile}
          name="UpdateProfile"
          options={{
            headerShown: true,
            headerTitle: 'Update Your Profile',
            headerTintColor: 'white',
            headerLeft: null,
            headerStyle: {
              backgroundColor: '#8D0337',
              elevation: 4,
            },
          }}
        />
        {/*
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
        /> */}
      </Stack.Navigator>
    </>
  );
};

export default AuthNavigation;
