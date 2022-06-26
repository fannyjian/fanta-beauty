import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: '#F3E9F9',
    },
    header: {
      fontFamily: 'AbrilFatface_400Regular', 
      fontSize:60, 
      margin: 10,
      left: 20,
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
    goBack: {
      marginTop: 10,
      fontSize: 13,
      fontFamily: "Avenir",
    },
    button: {
      width:"80%",
      borderRadius:25,
      height:50,
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