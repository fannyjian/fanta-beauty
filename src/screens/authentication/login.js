import { StyleSheet,Text,View,Image,TextInput,TouchableOpacity, SafeAreaView, Dimensions} from "react-native";
import { globalStyles } from '../../../styles/globalStyles';
import * as React from 'react';
import { useState } from "react";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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

            <KeyboardAwareScrollView contentContainerStyle = {globalStyles.container}>
                      
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
                <Text style={styles.text}>login.</Text>
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
        marginTop: -20,
        marginBottom: -10,
        width: imageW,
        height: imageH,
    },
    forgot_button: {
        height: 50,
        fontSize: 13,
        fontFamily: "Avenir",
    },
    text: {
        fontFamily: 'AbrilFatface_400Regular', 
        color: '#F3E9F9',
        fontSize: 20,
    },
  });