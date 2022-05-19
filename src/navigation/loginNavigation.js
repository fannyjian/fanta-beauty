import React from 'react';
import {View, Button, Text} from 'react-native';
import Login from '../screens/login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function LoginNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName = "LoginScreen">
            <Stack.Screen name = "LoginScreen" component={Login} />
      </Stack.Navigator>
    );
}