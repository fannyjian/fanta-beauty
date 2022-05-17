import { StyleSheet,Text,View,Image,TextInput,Button,TouchableOpacity,} from "react-native";
import { globalStyles } from '../../styles/globalStyles';
import React, {useState} from "react";
import { useRoute, useNavigation } from '@react-navigation/native';

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );

export default function Profile() {
    const navigation = useNavigation();
    const route = useRoute();

    const {username} = route.params;

    return(
        <View style={globalStyles.background}>
            <Text style = {globalStyles.header}>Profile.</Text>

            <View style = {globalStyles.container}>
               
            <Image style = {styles.image} source = {require("../../assets/profile-logo.png")}/>
            
            <Text style = {styles.name}>Welcome, {username}</Text>
            
            <View style={styles.screenContainer}>
                <AppButton title="my body" backgroundColor="#007bff" />
            </View>

            <View style={styles.screenContainer}>
                <AppButton title="wishlist" backgroundColor="#007bff" />
            </View>

            <View style={styles.screenContainer}>
                <AppButton title="saved looks" backgroundColor="#007bff" />
            </View>
           
            </View>
            </View>
);
}

const styles = StyleSheet.create({
    image :{
        flex: 0.5,
        width: 300,
        height: 300,
        justifyContent: 'flex-end'
    },
    name: {
        fontSize: 20,
        fontFamily: "AbrilFatface_400Regular",
        color: "black",
        borderBottomWidth: 20,
    },
    screenContainer: {
        justifyContent: "flex-start",
        padding: 16
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
      }
});