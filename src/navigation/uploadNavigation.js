import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Wishlist from '../screens/wishlist';
import Model from '../screens/model';

const Stack = createNativeStackNavigator();

export default function UploadNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} component = 'TryOnScreen'>
            <Stack.Screen
            name="ModelScreen"
            component={Model}
            />
            <Stack.Screen
            name="WishlistScreen"
            component={Wishlist}
            />
      </Stack.Navigator>
    );
}