
import * as React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { initializeApp } from "firebase/app";

// Imports for loading font
import { AbrilFatface_400Regular } from '@expo-google-fonts/abril-fatface';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

// Imports for navigations
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home';
import Profile from './src/screens/profile';
import Login from './src/screens/login';
import Welcome from './src/screens/welcome';

export const AuthContext = React.createContext();

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();


export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyA0nT_FejM8tVJ5lAzd_uz0Nw4jgAIBb88",
    authDomain: "fanta-beauty-fc716.firebaseapp.com",
    projectId: "fanta-beauty-fc716",
    storageBucket: "fanta-beauty-fc716.appspot.com",
    messagingSenderId: "1075869773533",
    appId: "1:1075869773533:web:fc11334bf291c7c4f1b534",
    measurementId: "G-NKY6X96JJG"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  let [fontsLoaded, error]= useFonts({
    AbrilFatface_400Regular 
  });
  
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
      } catch (e) {
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token',});
      },

      signOut: () => dispatch({ type: 'SIGN_OUT' }),

      signUp: async () => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token', });
      },

    }),
    []
  );

  return (
    (!fontsLoaded) ? <AppLoading /> : (

    <AuthContext.Provider value={authContext}>
      <NavigationContainer >
               
        <Stack.Navigator screenOptions = {{headerShown: false }}>
          {(state.isLoading) ? (<Stack.Screen name="Splash" component={SplashScreen} />) 
          
          : state.userToken == null && fontsLoaded ? (
            <Stack.Group options={{animationTypeForReplace: state.isSignout ? 'pop' : 'push',}} component = 'WelcomeScreen'>
              <Stack.Screen
                name="WelcomeScreen"
                component={Welcome}
              />
              <Stack.Screen
                name="LoginScreen"
                component={Login}
              />
            </Stack.Group>)
              
          : (
            <Stack.Group>
              <Stack.Screen name = "HomeScreen" component={Home} />
              <Stack.Screen name = "ProfileScreen" component = {Profile} />
            </Stack.Group>
            
          )}

        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>)
  );
}