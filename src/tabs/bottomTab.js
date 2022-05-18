import Icon from 'react-native-ico-material-design';
import { StyleSheet, Text, View, Image, SafeAreaView, Pressable, Dimensions, FlatList, TouchableOpacity } from 'react-native';

var iconHeight = 40;
var iconWidth = 40;


export default function BottomTab({route, navigation}) {
    return (
        <View style={styles.NavContainer}>
        <View style={styles.NavBar}>
            <TouchableOpacity onPress={() => console.log("favourites")} style={styles.IconBehave}>
            <Icon name="favorite-heart-button"  height={iconHeight} width={iconWidth} color='white'></Icon>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log("shopping cart")} style={styles.IconBehave}>
            <Icon name="shopping-cart" height={iconHeight} width={iconWidth} color='white'></Icon>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.IconBehave}>
            <Icon name="home-button" height={iconHeight} width={iconWidth} color='white'></Icon>
            </TouchableOpacity>
        </View>
        </View>
    );

}

const styles = StyleSheet.create({
    NavContainer: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
      },
      NavBar: {
        flexDirection:'row',
        backgroundColor: '#DDC2EF',
        width:'100%',
        justifyContent: 'space-evenly',
        borderRadius: 40
      },
      IconBehave: {
        padding: 30,
      },
});