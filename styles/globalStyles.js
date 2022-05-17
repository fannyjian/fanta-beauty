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
        margin: 50,
        alignItems: 'baseline',
        backgroundColor: '#F3E9F9',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    }
});