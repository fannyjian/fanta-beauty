import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#F3E9F9',
      },
      header: {
        flex: 0.12,
        fontFamily: 'AbrilFatface_400Regular', 
        fontSize:60, 
        margin: 40,
        alignItems: 'baseline',
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
});