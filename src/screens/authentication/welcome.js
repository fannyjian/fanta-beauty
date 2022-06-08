import { StyleSheet,Text,View,Image,TouchableOpacity, SafeAreaView} from "react-native";
import { globalStyles } from '../../../styles/globalStyles';
import * as React from 'react';
import { useNavigation } from "@react-navigation/native";

export default function Welcome() {

    const navigation = useNavigation();
    return(
        <SafeAreaView style={globalStyles.background}>
            <Text style = {globalStyles.header}>Welcome.</Text>

            <View style = {globalStyles.container}>
          
            <Image style = {styles.image} source = {require("../../../assets/welcome-logo.png")}/>

            <TouchableOpacity style={styles.button} onPress = {() => navigation.navigate('LoginScreen')}>
                <Text style={styles.text}>login.</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress = {() => navigation.navigate('RegisterScreen')}>
                <Text style={styles.text}>register.</Text>
            </TouchableOpacity>

            </View>

        </SafeAreaView>
        
    );
}

const styles = StyleSheet.create({
    image :{
      width: 300,
      height: 450,
      marginTop: -30,
    },
    button:{
        width:"80%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        backgroundColor:"#DDC2EF",
    },
    text: {
        fontFamily: 'Avenir', 
        fontSize: 18,
    },
  });