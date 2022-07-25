import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/profile";
import EditProfile from "../screens/editProfile";
import Posts from "../screens/posts";
import Collects from "../screens/collects";
import SavedDetails from "../screens/savedDetails";
import MyDetails from "../screens/myDetails";

const Stack = createNativeStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      component="ProfileScreen"
    >
      <Stack.Screen name="ProfileScreen" component={Profile} />
      <Stack.Screen name="EditProfileScreen" component={EditProfile} />
      <Stack.Screen name="CollectsScreen" component={Collects} />
      <Stack.Screen name="SavedScreen" component={SavedDetails} />
      <Stack.Screen name="PostsScreen" component={Posts} />
      <Stack.Screen name='MyDetailsScreen' component={MyDetails}/>
    </Stack.Navigator>
  );
}
