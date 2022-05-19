// import { StatusBar } from 'expo-status-bar';
// import LoginNavigator from './src/navigation/loginNavigation';
// import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AbrilFatface_400Regular } from '@expo-google-fonts/abril-fatface';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
// import HomeNavigator from './src/navigation/homeNavigation';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   let [fontsLoaded, error]= useFonts({
//     AbrilFatface_400Regular 
//   });

//   if(!fontsLoaded) {
//     return <AppLoading />
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName = "Onboarding">
//         <Stack.Screen name = "Onboarding" component={LoginNavigator} />
//       </Stack.Navigator>
//     </NavigationContainer>
// );
// }

import * as React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginNavigator from './src/navigation/loginNavigation';
import HomeNavigator from './src/navigation/homeNavigation';
import Login from './src/screens/login';

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


    // Fetch the token from storage then navigate to our appropriate place
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
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer >
       
        <Stack.Navigator screenOptions = {{headerShown: false }}>
          {state.isLoading ? (<Stack.Screen name="Splash" component={SplashScreen} />) 
          
          : state.userToken == null ? (
            <Stack.Screen
              name="LoginNav"
              component={LoginNavigator}
              options={{animationTypeForReplace: state.isSignout ? 'pop' : 'push',}}
              />) 
              
          : (
            <Stack.Screen name="HomeNav" component={HomeNavigator} />
          )}

        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
