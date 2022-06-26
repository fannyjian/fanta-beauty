import { StyleSheet,Text,View,Image,TextInput,TouchableOpacity, SafeAreaView} from "react-native";
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
        .then().catch((error) => {
            const errorCode = error.code;
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

            <View style={globalStyles.inputView}>
            <TextInput
                style={globalStyles.TextInput}
                placeholder="Email."
                autoCapitalize="none"
                placeholderTextColor="black"
                onChangeText={(name) => setEmail(name)}
                autoCorrect = {false}
                value = {email}
                keyboardType = 'email-address'
            />
            </View>
            
            <View style={globalStyles.inputView}>
            <TextInput
                style={globalStyles.TextInput}
                placeholder="Password."
                autoCapitalize="none"
                placeholderTextColor="black"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                value = {password}
            />
            </View>

            <TouchableOpacity>
                <Text style={styles.forgot_button} onPress = {() => navigation.navigate('ForgotScreen')}>Forgot Password?</Text>
            </TouchableOpacity> 

            <TouchableOpacity style={globalStyles.button} onPress = {handleLogin} >
                <Text style={globalStyles.avenirFont}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={globalStyles.goBack} onPress = {() => navigation.goBack()}>Back to Welcome Page</Text>
            </TouchableOpacity> 
            </View>

        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    image :{
        marginTop: -20,
        marginBottom: -30,
        width: 300,
        height: 300,
    },
    forgot_button: {
        height: 50,
        fontSize: 13,
        fontFamily: "Avenir",
    },
  });