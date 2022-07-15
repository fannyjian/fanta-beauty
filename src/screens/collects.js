import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  FlatList,
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

export default function Collects() {
  const auth = getAuth();
  const user = auth.currentUser;
  const storage = getStorage();

  const [isFetching, setIsFetching] = useState(false);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "collects/" + user.uid + "/");

  const loadItems = () => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
          setIsFetching(false);
        });
      });
    });
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
          <TouchableOpacity>
            <Image source={{ uri: item }} style={styles.image} />
          </TouchableOpacity>
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
