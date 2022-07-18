import { StyleSheet,Text,View,TextInput,TouchableOpacity, SafeAreaView, Image, Dimensions} from "react-native";
import { globalStyles } from '../../../styles/globalStyles';
import * as React from 'react';
import { useState } from "react";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
          const user = userCredential.user;
          updateProfile(auth.currentUser, {displayName: username}).then(() => console.log(username));
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode == "auth/invalid-email") {
            alert('Please enter a valid email!');
          }
          if (errorCode == "auth/email-already-in-use") {
            alert('You have already created an account with us!');
          }
          if (errorCode == "auth/weak-password") {
            alert('Your password must be at least 6 characters long!');
          }
        });
    }


    return(
        <SafeAreaView style={globalStyles.background}>
            <Text style = {globalStyles.header}>New User.</Text>

            <KeyboardAwareScrollView contentContainerStyle = {globalStyles.container}>
          
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

            <View style={globalStyles.inputView}>
            <TextInput
                style={globalStyles.TextInput}
                placeholder="Set a username."
                placeholderTextColor="black"
                autoCapitalize="none"
                onChangeText={(name) => setUsername(name)}
                autoCorrect = {false}
                value = {username}
            />
            </View>
            
            <View style={globalStyles.inputView}>
            <TextInput
                style={globalStyles.TextInput}
                placeholder="Set a password."
                autoCapitalize="none"
                placeholderTextColor="black"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                value = {password}
            />
            </View>

            <View style={globalStyles.inputView}>
            <TextInput
                style={globalStyles.TextInput}
                placeholder="Confirm Password."
                placeholderTextColor="black"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={(password) => setCfmPassword(password)}
                value = {cfmPassword}
            />
            </View>

            <TouchableOpacity style={globalStyles.button} onPress = {handleRegister} >
                <Text style={globalStyles.avenirFont}>REGISTER NOW</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={globalStyles.goBack} onPress = {() => navigation.goBack()}>Back to Welcome.</Text>
            </TouchableOpacity> 
            </KeyboardAwareScrollView>

        </SafeAreaView>
        
    );
}

const { width, height } = Dimensions.get('screen');
const imageW = width * 0.7;
const imageH = height * 0.35;

const styles = StyleSheet.create({
  image :{
    width: imageW,
    height: imageH,
    marginBottom: -10,
  },
  container: {
    margin: 50,
  }
});