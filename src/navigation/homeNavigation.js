import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home";
import Search from "../screens/search";
import Details from "../screens/details";
import SavePost from "../screens/savePost";

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      component="HomeScreen"
    >
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="SearchScreen" component={Search} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="SavePost" component={SavePost} />
    </Stack.Navigator>
  );
}
