import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../screens/authentication/welcome';
import Login from '../screens/authentication/login';
import Register from '../screens/authentication/register';
import ForgotPassword from '../screens/authentication/forgotPassword';

const Stack = createNativeStackNavigator();

export default function LoggedOutNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} component = 'WelcomeScreen'>
            <Stack.Screen
            name="WelcomeScreen"
            component={Welcome}
            />
            <Stack.Screen
            name="LoginScreen"
            component={Login}
            />
            <Stack.Screen
            name="RegisterScreen"
            component={Register}
            />
            <Stack.Screen
            name="ForgotScreen"
            component={ForgotPassword}
            />
      </Stack.Navigator>
    );
}