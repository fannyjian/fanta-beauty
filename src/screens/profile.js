import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Text,View,Image,TouchableOpacity,SafeAreaView} from "react-native";
import { globalStyles } from '../../styles/globalStyles';
import React, {useState} from "react";
import BottomTab from "../tabs/bottomTab";
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';


const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );

const LogoutButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.logoutButtonText}>{title}</Text>
    </TouchableOpacity>
  );


export default function Profile() {
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const name = user.displayName;

  const signOut = () => auth.signOut().then(() => console.log('user signed out'));

  return(
      <SafeAreaView style={globalStyles.background}>
        <Text style = {globalStyles.header}>Profile.</Text>

        <View style = {globalStyles.container}>
              
          <Image style = {styles.image} source = {require("../../assets/profile-logo.png")}/>
          
          <Text style = {styles.name}>{name}</Text>
          
          <View style={styles.screenContainer}>
              <AppButton title="my body" backgroundColor="#007bff" />
          </View>

          <View style={styles.screenContainer}>
              <AppButton title="saved looks" backgroundColor="#007bff" />
          </View>

          <View style={styles.screenContainer}>
              <AppButton title="wishlist" backgroundColor="#007bff" onPress = {() => console.log(name)}/>
          </View>

          <View style={styles.screenContainer}>
              <LogoutButton title="log out" backgroundColor="#007bff" onPress = {signOut} />
          </View>

        </View> 

      {/* <BottomTab navigation= { navigation }/> */}

      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    image :{
        flex: 0.6,
        width: 350,
        height: 350,
        justifyContent: 'flex-end'
    },
    name: {
        fontSize: 20,
        fontFamily: "AbrilFatface_400Regular",
        color: "black",
        borderBottomWidth: 25,
    },
    screenContainer: {
        justifyContent: "flex-start",
        padding: 16,
      },
      appButtonContainer: {
        width: 300,
        backgroundColor: "white",
        borderRadius: 40,
        paddingVertical: 10,
      },
      appButtonText: {
        fontSize: 25,
        fontFamily: "AbrilFatface_400Regular",
        color: "black",
        alignSelf: "center",
      },
      logoutButtonText: {
        fontSize: 20,
        fontFamily: "AbrilFatface_400Regular",
        color: "#DDC2EF",
        alignSelf: "center",
      }
});