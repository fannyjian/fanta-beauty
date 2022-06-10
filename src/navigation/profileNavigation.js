import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/profile';
import EditProfile from '../screens/editProfile';

const Stack = createNativeStackNavigator();

export default function ProfileNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} component = 'ProfileScreen'>
            <Stack.Screen
            name="ProfileScreen"
            component={Profile}
            />
            <Stack.Screen
            name="EditProfileScreen"
            component={EditProfile}
            />
      </Stack.Navigator>
    );
}