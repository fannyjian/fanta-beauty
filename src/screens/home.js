import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, FlatList } from 'react-native';
import React from "react";

const data = [
  'https://cdn-images.farfetch-contents.com/18/41/36/44/18413644_39547459_1000.jpg',
  'https://cdn-static.farfetch-contents.com/cms-cm/sg/media/3536972/data/096e98e92c3d2ff52d07b3ebf0dc56c4.jpg?ratio=1x1_messaging-side&minWidth=637',
  'https://cdn-images.farfetch-contents.com/16/87/29/03/16872903_34569968_1000.jpg',
  'https://cdn-images.farfetch-contents.com/16/02/03/04/16020304_30929116_1000.jpg',
  'https://cdn-images.farfetch-contents.com/17/74/56/82/17745682_38770936_1000.jpg',

]
const { width, height } = Dimensions.get('screen');
const imageW = width;
const imageH = height * 0.6;

export default function Home() {
  return (
    <SafeAreaView style={styles.background}>
      <View>
        <Text style={{fontFamily: 'AbrilFatface_400Regular', fontSize:60, margin: 10, left: 20}}>Hey!</Text>
      </View>

      <View>
        <FlatList 
        data={data}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        renderItem={({item}) => {
          return <View style={{width}}>
                  <Image source={{uri : item}} style={{
                    width: imageW,
                    height: imageH,
                    resizeMode: 'cover',
                    borderRadius:80,
                    alignItems: 'center'
                  }}/>
                </View>
        }}
        />

        <View style={styles.circleDiv}>
          {data.map(( item, i ) => (
            <View
            key={item}
            style={[styles.whiteCircle,
            ]}
            />
          ))}
        </View>
        
      <View>
        <Text style={{fontFamily: 'AbrilFatface_400Regular', fontSize:25, margin: 6, color: 'white', shadowColor: 'black', shadowOffset: {width: 5, height: 5}, shadowOpacity: 0.4, shadowRadius: 3, left:190}}>welcome to {'\n'}
      fanta beauty.</Text>
      </View>
      </View>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#F3E9F6',
  },
  picture: {
    flex: 1,
    alignItems: 'center',
  },

  circleDiv: {
    position: 'absolute',
    bottom: 90,
    height: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5,
    backgroundColor: 'white',

  }
});
