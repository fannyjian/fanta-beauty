import React from 'react';
import {View, Button, Text} from 'react-native';
import Login from '../screens/login';
import Profile from '../screens/profile';
import Home from '../screens/home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function LoginNavigator() {
    const navigation = useNavigation();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName = "Home">
            <Stack.Screen name = "Login." component={Login} />
            <Stack.Screen name = "Profile" component={Profile} />
            <Stack.Screen name = "Home" component={Home} />
      </Stack.Navigator>
    );
}