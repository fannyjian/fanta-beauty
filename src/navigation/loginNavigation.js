import React from 'react';
import {View, Button, Text} from 'react-native';
import Login from '../screens/user-authentication/login';
import Profile from '../screens/profile';
import Home from '../screens/home';
import BottomTab from '../tabs/bottomTab';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function LoginNavigator() {

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName = "Login">
            <Stack.Screen name = "Login" component={Login} />
            <Stack.Screen name = "Profile" component={Profile} />
            <Stack.Screen name = "Home" component={Home} />
      </Stack.Navigator>
    );
}