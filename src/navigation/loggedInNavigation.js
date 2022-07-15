import React from 'react';
import { Dimensions, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileNavigator from './profileNavigation';
import HomeNavigator from './homeNavigation';

const Tab = createBottomTabNavigator();

const EmptyScreen = () => {
    return(null);
} 

const { width, height } = Dimensions.get('screen');

export default function LoggedInNavigator() {
    return (
        <Tab.Navigator
            initialRouteName='HomeScreens'
            screenOptions={{headerShown:false, 
                            tabBarShowLabel: false, 
                            tabBarActiveTintColor:'white',
                            tabBarInactiveTintColor:'#F3E9F9',
                            tabBarStyle: {
                                position: 'absolute',
                                borderRadius: 40,
                                height: height * 0.1,
                                backgroundColor: '#DDC2EF'
                            },
                            tabBarIconStyle: {
                                borderTopWidth: height * 0.008,
                                borderTopColor:'#DDC2EF',
                                width: height * 0.06,
                                height:height * 0.06,
                            },
                            }}>
                <Tab.Screen 
                    name = "HomeScreens" 
                    component={HomeNavigator} 
                    options={{tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="home" color={color} size={height * 0.06} />)}}/>
                <Tab.Screen 
                    name = "UploadScreen" 
                    listeners={({navigation}) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Upload")
                        }
                        })}
                    component={EmptyScreen}
                    options={{tabBarIcon: () => (
                        <View style={{
                            width: height * 0.1,
                            height: height * 0.1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 30
                        }}>
                            {/* <Image source = {require('../../assets/plus-icon.png')} style ={{width: 70, height: 70}}/> */}
                            <MaterialCommunityIcons name="plus-circle" color={"white"} size={height * 0.1} />
                        </View>
                    )
                    }}/>
                <Tab.Screen 
                    name = "ProfileScreens" 
                    component = {ProfileNavigator} 
                    options={{tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="account" color={color} size={height * 0.06} />)}}/>
      </Tab.Navigator>
    );
}