import React from 'react';
import Home from '../screens/home';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileNavigator from './profileNavigation';
import UploadNavigator from './uploadNavigation';
import Model from '../screens/model';

const Tab = createBottomTabNavigator();

export default function LoggedInNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{headerShown:false, 
                            tabBarShowLabel: false, 
                            tabBarActiveTintColor:'white',
                            tabBarInactiveTintColor:'#F3E9F9',
                            tabBarStyle: {
                                position: 'absolute',
                                elevation: 0,
                                borderRadius: 40,
                                height: 90,
                                backgroundColor: '#DDC2EF'
                            },
                            tabBarIconStyle: {
                                borderTopWidth:15,
                                borderTopColor:'#DDC2EF',
                                width:50,
                                height:50,
                            },
                            unmountOnBlur: true,
                            }}>
                <Tab.Screen 
                    name = "HomeScreen" 
                    component={Home} 
                    options={{tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="home" color={color} size={50} />)}}/>
                <Tab.Screen 
                    name = "UploadScreens" 
                    component={UploadNavigator} 
                    options={{tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="heart" color={color} size={50} />)}}/>
                <Tab.Screen 
                    name = "ProfileScreens" 
                    component = {ProfileNavigator} 
                    options={{tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="account" color={color} size={50} />)}}/>
      </Tab.Navigator>
    );
}