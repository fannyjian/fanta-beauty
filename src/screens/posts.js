import {
    StyleSheet,
    Text,
    Image,
    SafeAreaView,
    Dimensions,
    FlatList,
    View,
    Pressable,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { globalStyles } from "../../styles/globalStyles";
  import { getAuth } from "firebase/auth";
  import { getDocs, getFirestore, collection } from "firebase/firestore";
  
  const { width, height } = Dimensions.get("screen");
  const imageW = width * 0.45;
  const imageH = height * 0.25;
  
  export default function Posts({navigation}) {
    const auth = getAuth();
    const user = auth.currentUser;
    const firestore = getFirestore();
  
    const [isFetching, setIsFetching] = useState(false);
    const [postList, setPostList] = useState([]);
  
    const loadItems = async () => {
      const data = [];
      const posts = await collection(firestore, "reviews", user.uid, "posts");
      const querySnapshot = await getDocs(posts);
      querySnapshot.forEach((post) => {
        data.push(post.data())
      });
      data.sort((a, b) => b.Date - a.Date)
      setPostList(data);
      setIsFetching(false);
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
        <Text style={styles.header}>Posts.</Text>
    </View>
    );
  
    return (
      <SafeAreaView style={globalStyles.background}>
        <FlatList
          data={postList}
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
                navigation.navigate("MyDetailsScreen", { initialScroll: index, data: postList})
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
      margin: 10,
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