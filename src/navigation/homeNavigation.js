import React from 'react';
import Profile from '../screens/profile';
import Home from '../screens/home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName = "HomeScreen">
            <Stack.Screen name = "HomeScreen" component={Home} />
            <Stack.Screen name = "ProfileScreen" component = {Profile} />
      </Stack.Navigator>
    );
}