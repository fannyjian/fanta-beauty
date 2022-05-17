import { StyleSheet,Text,View,Image,TextInput,Button,TouchableOpacity,} from "react-native";
import { globalStyles } from '../../styles/globalStyles';
import React, {useState} from "react";

export default function Login( {navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = () => {
        if (username.length < 1) {
            alert('Please provide enter a username!');
        } else if (password.length < 6) {
            alert('Your password must be at least 6 characters long!');
        } else {
            navigation.navigate('Profile', username);
        }
    }

    return(
        <View style={globalStyles.background}>
            <Text style = {globalStyles.header}>Login.</Text>

            <View style = {globalStyles.container}>
          
            <Image style = {styles.image} source = {require("../../assets/login-logo.png")}/>

            <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Username."
                placeholderTextColor="black"
                onChangeText={(name) => setUsername(name)}
                autoCorrect = {false}
                value = {username}
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
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress = {submit} >
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            </View>
        </View>
        
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
        fontSize: 15
      },
      forgot_button: {
        height: 30,
        marginBottom: 30,
        fontSize: 10
      },
      loginBtn:{
        width:"80%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        backgroundColor:"#DDC2EF",
    },
    loginText: {
        fontFamily: "Avenir"
    },
    
  });