import * as React from 'react';
import { View } from 'react-native';
import { useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

// Imports for Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Imports for loading font
import { AbrilFatface_400Regular } from '@expo-google-fonts/abril-fatface';
import { useFonts } from 'expo-font';

// Imports for navigations
import { NavigationContainer } from '@react-navigation/native';
import LoggedOutNavigator from './src/navigation/loggedOutNavigation';
import LoggedInNavigator from './src/navigation/loggedInNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UploadPost from './src/screens/uploadPost';
import { useEffect, useCallback } from 'react';
import { collectionGroup, getDocs, getFirestore } from 'firebase/firestore';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  let [fontsLoaded, error]= useFonts({
    AbrilFatface_400Regular 
  });

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
  const firestore = getFirestore();

  const [appIsReady, setAppIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [postList, setPostList] = useState([]);


  useEffect(() => {
    async function prepare() {
      try {
        // setting up authentication
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        });

        // fetching posts
        const data = [];
        const posts = await collectionGroup(firestore, "posts");
        const querySnapshot = await getDocs(posts);
        querySnapshot.forEach((post) => {
          data.push(post.data())
        });
        setPostList(data);

      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
      <View style = {{flex: 1}} onLayout = {onLayoutRootView}>
        <NavigationContainer>                 
            {(!isLoggedIn && fontsLoaded) 
            ? <LoggedOutNavigator/> 
            : <Stack.Navigator screenOptions={{headerShown: false}} component = 'Main'>
              <Stack.Screen name = "Main" component={LoggedInNavigator}/>
              <Stack.Screen name = "Upload" component = {UploadPost} options={{presentation: 'modal'}}/>
            </Stack.Navigator>
            }
        </NavigationContainer>
      </View>
  );
}
