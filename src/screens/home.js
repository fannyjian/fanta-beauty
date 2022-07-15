import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  FlatList,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { globalStyles } from "../../styles/globalStyles";
import { getAuth } from "firebase/auth";
import { getDocs, getFirestore, collectionGroup } from "firebase/firestore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");
const imageW = width * 0.45;
const imageH = height * 0.25;

export default function Home() {
  const auth = getAuth();
  const user = auth.currentUser;
  const firestore = getFirestore();
  const navigation = useNavigation();

  const [isFetching, setIsFetching] = useState(false);
  const [postList, setPostList] = useState([]);

  const loadItems = async () => {
    const posts = await collectionGroup(firestore, "posts");
    const querySnapshot = await getDocs(posts);
    querySnapshot.forEach((post) => {
      setPostList((prev) => [...prev, post.data()]);
      setIsFetching(false);
    });
  };

  useEffect(() => {
    loadItems();
  }, []);

  const onRefresh = async () => {
    setIsFetching(true);
    setPostList([]);
    loadItems();
  };

  const HeaderComponent = () => (
    <View>
      <View style={{ flexDirection: "row", margin: 10 }}>
        <Text style={styles.header}>Feed.</Text>
        <View
          style={{
            alignItems: "flex-end",
            marginBottom: 10,
            marginLeft: width * 0.22,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
            <MaterialCommunityIcons
              name="magnify"
              size={50}
              color={"#DDC2EF"}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialCommunityIcons
              name="filter-outline"
              size={50}
              color={"#DDC2EF"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={globalStyles.background}>
      <FlatList
        data={postList}
        // keyExtractor={(item) => item.id.toString()}
        onRefresh={onRefresh}
        numColumns={2}
        refreshing={isFetching}
        style={{ marginBottom: height * 0.06 }}
        contentContainerStyle={{ alignSelf: "center" }}
        ListHeaderComponent={HeaderComponent}
        stickyHeaderIndices={[0]}
        renderItem={({ item, index }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate("Details", { initialScroll: index })
            }
          >
            <Image
              source={{ uri: item.Image }}
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
    backgroundColor: "#00000000",
  },
  image: {
    // width: width * 0.9,
    // height: width * 0.9,
    // resizeMode: "cover",
    // borderRadius: 10,
    width: imageW,
    height: imageH,
    resizeMode: "cover",
    borderRadius: 20,
    alignItems: "center",
    margin: 10,
  },
  card: {
    width: width * 0.5,
    height: height * 0.3,
    backgroundColor: "#00000000",
    marginBottom: width * 0.05,
    alignItems: "center",
    // borderRadius: 10,
    // backgroundColor: "white"
  },

  title: {
    fontFamily: "AbrilFatface_400Regular",
    fontSize: 15,
    color: "black",
    shadowRadius: 3,
    marginHorizontal: width * 0.01,
    alignSelf: "flex-start",
  },
});
