import { StyleSheet,Text,View,Image,TextInput,Button,TouchableOpacity, SafeAreaView, Pressable} from "react-native";
import { globalStyles } from '../../../styles/globalStyles';
import * as React from 'react';
import { useState } from "react";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

export default function Register({navigation}) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cfmPassword, setCfmPassword] = useState('');

    const auth = getAuth(); 
    const handleRegister = () => {
      if (password != cfmPassword) {
        alert('The two passwords do not match!')
        return;
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          auth.currentUser.updateProfile({displayName: username, })
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode == "auth/invalid-email") {
            alert('Please enter a valid email!');
          }
          if (errorCode == "auth/weak-password") {
            alert('Your password must be at least 6 characters long!');
          }
        });
    }


    return(
        <SafeAreaView style={globalStyles.background}>
            <Text style = {globalStyles.header}>New User.</Text>

            <View style = {globalStyles.container}>
          
            <Image style = {styles.image} source = {require("../../../assets/login-logo.png")}/>

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Enter your email."
                placeholderTextColor="black"
                onChangeText={(mail) => setEmail(mail)}
                autoCorrect = {false}
                value = {email}
            />
            </View>

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Set a username."
                placeholderTextColor="black"
                onChangeText={(name) => setUsername(name)}
                autoCorrect = {false}
                value = {username}
            />
            </View>
            
            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Set a password."
                placeholderTextColor="black"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                value = {password}
            />
            </View>

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Confirm Password."
                placeholderTextColor="black"
                secureTextEntry={true}
                onChangeText={(password) => setCfmPassword(password)}
                value = {cfmPassword}
            />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress = {handleRegister} >
                <Text style={styles.loginText}>REGISTER NOW</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.goBack_button} onPress = {() => navigation.goBack()}>Back to Welcome Page</Text>
            </TouchableOpacity> 
            </View>

        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    image :{
      width: 300,
      height: 300,
      marginBottom: -20,
    },
    inputView: {
        backgroundColor: "white",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
      },
      
      TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        fontFamily: "Avenir",
        fontSize: 15,
      },
      forgot_button: {
        height: 40,
        fontSize: 12,
        fontFamily: "Avenir",
      },
      loginBtn:{
        width:"80%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        backgroundColor:"#DDC2EF",
    },
    loginText: {
        fontFamily: "Avenir"
    },
    goBack_button: {
      marginTop: 10,
      fontSize: 12,
      fontFamily: "Avenir",
    },
  });