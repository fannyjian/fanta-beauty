import * as React from 'react';
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Imports for loading font
import { AbrilFatface_400Regular } from '@expo-google-fonts/abril-fatface';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

// Imports for navigations
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home';
import Profile from './src/screens/profile';
import Login from './src/screens/authentication/login'
import Welcome from './src/screens/authentication/welcome';
import Register from './src/screens/authentication/register';
import ForgotPassword from './src/screens/authentication/forgotPassword';


const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded, error]= useFonts({
    AbrilFatface_400Regular 
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const firebaseConfig = {
    apiKey: "AIzaSyA0nT_FejM8tVJ5lAzd_uz0Nw4jgAIBb88",
    authDomain: "fanta-beauty-fc716.firebaseapp.com",
    projectId: "fanta-beauty-fc716",
    storageBucket: "fanta-beauty-fc716.appspot.com",
    messagingSenderId: "1075869773533",
    appId: "1:1075869773533:web:fc11334bf291c7c4f1b534",
    measurementId: "G-NKY6X96JJG"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  return (
      (!fontsLoaded) ? <AppLoading /> : (
  
        <NavigationContainer >     
          <Stack.Navigator screenOptions = {{headerShown: false }}>
            
            {(!isLoggedIn && fontsLoaded) ? (
              <Stack.Group 
                options={{animationTypeForReplace: isLoggedIn ? 'pop' : 'push',}} 
                component = 'WelcomeScreen'>
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
              </Stack.Group>)
                
            : (
              <Stack.Group>
                {/* <Stack.Screen name = "HomeScreen" component={Home} /> */}
                <Stack.Screen name = "ProfileScreen" component = {Profile} />
              </Stack.Group>              
            )}
          </Stack.Navigator>
        </NavigationContainer>
  ));

}