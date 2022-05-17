import { StatusBar } from 'expo-status-bar';
import Profile from './src/screens/profile'
import Login from './src/screens/login'
import LoginNavigator from './src/navigation/loginNavigation';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AbrilFatface_400Regular } from '@expo-google-fonts/abril-fatface';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded, error]= useFonts({
    AbrilFatface_400Regular 
  });

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName = "Onboarding">
        <Stack.Screen name = "Onboarding" component={LoginNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
);
}