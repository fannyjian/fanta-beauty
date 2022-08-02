import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home";
import Search from "../screens/search";
import Details from "../screens/details";
import Collects from "../screens/collects";
import SavedDetails from "../screens/savedDetails"

const Stack = createNativeStackNavigator();

export default function HomeNavigator({route}) {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      component="HomeScreen"
    >
      <Stack.Screen name="HomeScreen" component={Home}/>
      <Stack.Screen name="SearchScreen" component={Search}/>
      <Stack.Screen name="DetailsScreen" component={Details} />
      <Stack.Screen name="CollectsScreen" component={Collects} />
      <Stack.Screen name="SavedScreen" component={SavedDetails} />
    </Stack.Navigator>
  );
}
