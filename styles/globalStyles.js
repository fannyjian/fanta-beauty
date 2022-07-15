import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('screen');


export const globalStyles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: '#F3E9F9',
    },
    header: {
      fontFamily: 'AbrilFatface_400Regular', 
      fontSize:60, 
      margin: 10,
      left: width * 0.05,
      backgroundColor: '#F3E9F9',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    inputView: {
      backgroundColor: "white",
      borderRadius: 30,
      width: width * 0.75,
      height: height * 0.05,
      marginBottom: 20,
      alignItems: "center",
    },   
    TextInput: {
      flex: 1,
      fontFamily: "Avenir",
      fontSize: 15,
    },
    goBack: {
      marginTop: 10,
      fontSize: 13,
      fontFamily: "Avenir",
    },
    button: {
      width: width * 0.75,
      borderRadius:25,
      height: height * 0.06,
      alignItems:"center",
      justifyContent:"center",
      marginTop:20,
      backgroundColor:"#DDC2EF",
    },
    avenirFont: {
      fontFamily: "Avenir",
      fontSize: 16,
    },
});