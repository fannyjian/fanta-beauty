import { StyleSheet,Text,View,TextInput,TouchableOpacity, SafeAreaView, Image, Pressable} from "react-native";
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
            <Text style = {globalStyles.header}>Password {'\n'}Reset.</Text>

            <View style = {globalStyles.container}>
          
            <Image style = {styles.image} source = {require("../../../assets/login-logo.png")}/>

            <View style={globalStyles.inputView}>
            <TextInput
                style={globalStyles.TextInput}
                placeholder="Enter your email."
                autoCapitalize="none"
                placeholderTextColor="black"
                onChangeText={(mail) => setEmail(mail)}
                autoCorrect = {false}
                value = {email}
                keyboardType = 'email-address'
            />
            </View>

            <TouchableOpacity style={globalStyles.button} onPress = {handleRetrieval} >
                <Text style={globalStyles.avenirFont}>RETRIEVE MY ACCOUNT</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={globalStyles.goBack} onPress = {() => navigation.goBack()}>Back to Login Page</Text>
            </TouchableOpacity> 
            </View>

        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
  image :{
    width: 300,
    height: 300,
    marginTop: -40,
    marginBottom: -20,
  },
});