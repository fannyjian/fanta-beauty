import * as React from 'react';
import { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Imports for loading font
import { AbrilFatface_400Regular } from '@expo-google-fonts/abril-fatface';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

// Imports for navigations
import { NavigationContainer } from '@react-navigation/native';
import LoggedOutNavigator from './src/navigation/loggedOutNavigation';
import LoggedInNavigator from './src/navigation/loggedInNavigation';


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
        <NavigationContainer>                 
            {(!isLoggedIn && fontsLoaded) ? <LoggedOutNavigator/> : <LoggedInNavigator/>}
        </NavigationContainer>
  ));
}