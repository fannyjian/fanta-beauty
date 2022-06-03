
import * as React from 'react';
import { Button, Text, TextInput, View } from 'react-native';

// Imports for loading font
import { AbrilFatface_400Regular } from '@expo-google-fonts/abril-fatface';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

// Imports for navigations
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginNavigator from './src/navigation/loginNavigation';
// import HomeNavigator from './src/navigation/homeNavigation';
import Home from './src/screens/home';
import Profile from './src/screens/profile';
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
      signIn: async (data) => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },

      signOut: () => dispatch({ type: 'SIGN_OUT' }),

      signUp: async (data) => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
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
            <Stack.Group>
              <Stack.Screen
                name="LoginScreen"
                component={Login}
                options={{animationTypeForReplace: state.isSignout ? 'pop' : 'push',}}
              />
            </Stack.Group>)
              
          : (
            // <Stack.Screen name="HomeNav" component={HomeNavigator} />
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