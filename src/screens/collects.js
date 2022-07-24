import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  FlatList,
  Pressable,
} from "react-native";
import * as React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { globalStyles } from "../../styles/globalStyles";
import { ref, listAll, getDownloadURL, getStorage } from "@firebase/storage";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

const { width, height } = Dimensions.get("screen");
const imageW = width * 0.4;
const imageH = height * 0.2;

export default function Collects({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const storage = getStorage();

  const [isFetching, setIsFetching] = useState(false);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "collects/" + user.uid + "/");

  const loadItems = () => {
    const images = [];
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          images.push(url);
        });
      });
    });
    setImageList(images);
    setIsFetching(false);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const onRefresh = async () => {
    setIsFetching(true);
    setImageList([]);
    loadItems();
  };

  return (
    <SafeAreaView style={globalStyles.background}>
      <FlatList
        data={imageList}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        onRefresh={onRefresh}
        refreshing={isFetching}
        style={{ margin: 20, marginBottom: 60 }}
        ListHeaderComponent={<Text style={styles.header}>Posts.</Text>}
        stickyHeaderIndices={[0]}
        renderItem={({ item, index }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate("Details", {
                initialScroll: index,
                data: imageList,
              })
            }
          >
            <Image
              source={{ uri: item }}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.title}>{item.Title}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontFamily: "AbrilFatface_400Regular",
    fontSize: 60,
    margin: 10,
    marginTop: -10,
    backgroundColor: "#00000000",
  },
  image: {
    width: imageW,
    height: imageH,
    resizeMode: "cover",
    borderRadius: 30,
    alignItems: "center",
    margin: 10,
  },
});
