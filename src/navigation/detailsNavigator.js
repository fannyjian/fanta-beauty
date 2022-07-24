import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SavePost from "../screens/savePost";
import Details from "../screens/details";

const Stack = createNativeStackNavigator();

export default function detailsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} component="Details">
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="SavePost" component={SavePost} />
    </Stack.Navigator>
  );
}
