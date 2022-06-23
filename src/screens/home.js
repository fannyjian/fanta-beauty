import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, FlatList } from 'react-native';
import React from "react";
import { globalStyles } from '../../styles/globalStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const data = [
  'https://cdn-images.farfetch-contents.com/18/41/36/44/18413644_39547459_1000.jpg',
  'https://cdn-static.farfetch-contents.com/cms-cm/sg/media/3536972/data/096e98e92c3d2ff52d07b3ebf0dc56c4.jpg?ratio=1x1_messaging-side&minWidth=637',
  'https://cdn-images.farfetch-contents.com/16/87/29/03/16872903_34569968_1000.jpg',
  'https://cdn-images.farfetch-contents.com/16/02/03/04/16020304_30929116_1000.jpg',
  'https://cdn-images.farfetch-contents.com/17/74/56/82/17745682_38770936_1000.jpg',

]
const { width, height } = Dimensions.get('screen');
const imageW = width;
const imageH = height * 0.65;

export default function Home() {
  return (
    <SafeAreaView style={globalStyles.background}>
        <Text style={globalStyles.header}>Hey!</Text>

      <View>
        <FlatList 
        data={data}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        renderItem={({item}) => {
          return <TouchableOpacity>
                  <Image source={{uri : item}} style={styles.picture}/>
                </TouchableOpacity>
        }}
        />

        {data.map(( item, i ) => (<View key={item}/>))}
        
        <Text style={styles.text}>welcome to {'\n'}fanta beauty.</Text>
      </View>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
  picture: {
    width: imageW,
    height: imageH,
    resizeMode: 'cover',
    borderRadius:80,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'AbrilFatface_400Regular', 
    fontSize:30, 
    marginTop: -25,
    margin: 6, 
    color: 'white', 
    shadowColor: 'black', 
    shadowOffset: {width: 5, height: 5}, 
    shadowOpacity: 0.4, 
    shadowRadius: 3, 
    left:190
  }
});
