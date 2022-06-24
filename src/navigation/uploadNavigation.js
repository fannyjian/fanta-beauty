import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TryOn from '../screens/tryOn';
import Wishlist from '../screens/wishlist';

const Stack = createNativeStackNavigator();

export default function UploadNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} component = 'TryOnScreen'>
            <Stack.Screen
            name="TryOnScreen"
            component={TryOn}
            />
            <Stack.Screen
            name="WishlistScreen"
            component={Wishlist}
            />
      </Stack.Navigator>
    );
}