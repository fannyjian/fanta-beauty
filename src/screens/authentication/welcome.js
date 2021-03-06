import { StyleSheet,Text,View,Image,TouchableOpacity, SafeAreaView, Dimensions} from "react-native";
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

            <TouchableOpacity style={globalStyles.button} onPress = {() => navigation.navigate('LoginScreen')}>
                <Text style={styles.text}>login.</Text>
            </TouchableOpacity>

            <TouchableOpacity style={globalStyles.button} onPress = {() => navigation.navigate('RegisterScreen')}>
                <Text style={styles.text}>register.</Text>
            </TouchableOpacity>

            </View>

        </SafeAreaView>
        
    );
}

const { width, height } = Dimensions.get('screen');
const imageW = width * 0.75;
const imageH = height * 0.5;

const styles = StyleSheet.create({
    image :{
      width: imageW,
      height: imageH,
      marginTop: -30,
    },
    text: {
        fontFamily: 'AbrilFatface_400Regular', 
        color: '#F3E9F9',
        fontSize: 20,
    },
  });