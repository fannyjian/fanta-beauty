import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, FlatList } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';

const data = [
  'https://cdn-images.farfetch-contents.com/18/41/36/44/18413644_39547459_1000.jpg',
  'https://cdn-static.farfetch-contents.com/cms-cm/sg/media/3536972/data/096e98e92c3d2ff52d07b3ebf0dc56c4.jpg?ratio=1x1_messaging-side&minWidth=637',
  'https://cdn-images.farfetch-contents.com/16/87/29/03/16872903_34569968_1000.jpg',
  'https://cdn-images.farfetch-contents.com/16/02/03/04/16020304_30929116_1000.jpg',
  'https://cdn-images.farfetch-contents.com/17/74/56/82/17745682_38770936_1000.jpg',

]
const { width, height } = Dimensions.get('screen');
const imageW = width * 0.4;
const imageH = height * 0.2;

export default function Wishlist() {
  return (
    <SafeAreaView style={globalStyles.background}>
      <View>
        <Text style={globalStyles.header}>Wishlist.</Text>
      </View>

      <View>
        <FlatList 
        data={data}
        keyExtractor={(_, index) => index.toString()}
        style={{ width: "100%" }}
        vertical
        numColumns={2}
        columnWrapperStyle={styles.row}
        key = {2}
        pagingEnabled
        renderItem={({item}) => {
          return <View style={{width}}>
                  <Image source={{uri : item}} style={{
                    width: imageW,
                    height: imageH,
                    resizeMode: 'cover',
                    borderRadius:0,
                    alignItems: 'center',
                    margin: 10,
                    left: 100}}/>
                </View>}}/>
      </View>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around'
  },
});