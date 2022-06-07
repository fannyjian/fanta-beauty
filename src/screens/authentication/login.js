import { StyleSheet,Text,View,Image,TextInput,Button,TouchableOpacity, SafeAreaView, Pressable} from "react-native";
import { globalStyles } from '../../../styles/globalStyles';
import * as React from 'react';
import { useState } from "react";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth(); 
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode == "auth/invalid-email") {
                alert('Please enter a valid email!')
            }
            if (errorCode == "auth/user-not-found") {
                alert('No records found:( \n Have you created an account yet?')
            }
            if (errorCode == "auth/wrong-password") {
                alert('Wrong password!')
            }
        });
    }

    return(
        <SafeAreaView style={globalStyles.background}>
            <Text style = {globalStyles.header}>Login.</Text>

            <View style = {globalStyles.container}>
          
            <Image style = {styles.image} source = {require("../../../assets/login-logo.png")}/>

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Email."
                placeholderTextColor="black"
                onChangeText={(name) => setEmail(name)}
                autoCorrect = {false}
                value = {email}
            />
            </View>
            
            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Password."
                placeholderTextColor="black"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                value = {password}
            />
            </View>

            <TouchableOpacity>
                <Text style={styles.forgot_button} onPress = {() => console.log('forgot password function not available yet :)')}>Forgot Password?</Text>
            </TouchableOpacity> 

            <TouchableOpacity style={styles.loginBtn} onPress = {handleLogin} >
                <Text style={styles.loginText}>LOGIN</Text>
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
      marginBottom: 10,
      width: 300,
      height: 300,
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