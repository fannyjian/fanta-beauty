import { StyleSheet,Text,View,Image,TextInput,Button,TouchableOpacity, SafeAreaView, Pressable} from "react-native";
import { globalStyles } from '../../../styles/globalStyles';
import * as React from 'react';
import { useState } from "react";
import {getAuth, sendPasswordResetEmail} from "firebase/auth";

export default function ForgotPassword({navigation}) {
    const [email, setEmail] = useState('');

    const auth = getAuth(); 
    const handleRetrieval = () => {
      sendPasswordResetEmail(auth, email)
        .then((user) => {
          alert('Please check your email to reset your password :D')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode == "auth/invalid-email") {
            alert('Please enter a valid email!');
          }
          if (errorCode == 'auth/user-not-found') {
              alert('There is no user registered with this email :( \nPlease create a new account instead!')
          }
        });
    }


    return(
        <SafeAreaView style={globalStyles.background}>
            <Text style = {styles.header}>Password {'\n'}Reset.</Text>

            <View style = {globalStyles.container}>
          
            <Image style = {styles.image} source = {require("../../../assets/login-logo.png")}/>

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Enter your email."
                autoCapitalize="none"
                placeholderTextColor="black"
                onChangeText={(mail) => setEmail(mail)}
                autoCorrect = {false}
                value = {email}
                keyboardType = 'email-address'
            />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress = {handleRetrieval} >
                <Text style={styles.loginText}>RETRIEVE MY ACCOUNT</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.goBack_button} onPress = {() => navigation.goBack()}>Back to Login Page</Text>
            </TouchableOpacity> 
            </View>

        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    header: {
        // flex: 0.12,
        fontFamily: 'AbrilFatface_400Regular', 
        fontSize:60, 
        margin: 40,
        alignItems: 'baseline',
        backgroundColor: '#F3E9F9',
    },
    image :{
      width: 300,
      height: 300,
      marginTop: -40,
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