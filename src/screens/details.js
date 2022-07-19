import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  FlatList,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { globalStyles } from "../../styles/globalStyles";
import { getAuth } from "firebase/auth";
import { getDocs, getFirestore, collectionGroup } from "firebase/firestore";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("screen");

export default function Details({ navigation, route }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const firestore = getFirestore();

  const HeaderComponent = () => (
    <View>
      <View style={{ flexDirection: "row", margin: 10 }}>
        <View
          style={{
            alignItems: "flex-end",
            marginBottom: 10,
            marginLeft: width * 0.7,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("SearchScreen", {data: route.params.data})}>
            <MaterialCommunityIcons
              name="magnify"
              size={50}
              color={"#DDC2EF"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => {
    return(
      <TouchableOpacity style={styles.card}>
        <Image
          source={{ uri: item.Image }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.title}>{item.Title}</Text>
        <Text style={styles.text}>{item.Review}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={globalStyles.background}>
      <FlatList
        data={route.params.data}
        initialScrollIndex={route.params.initialScroll}
        getItemLayout={( data, index) => ({length: height * 0.6, offset: height * 0.6 * index, index})}        
        style={{ marginBottom: height * 0.06 }}
        contentContainerStyle={{ alignSelf: "center" }}
        ListHeaderComponent={HeaderComponent}
        stickyHeaderIndices={[0]}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  image: {
    width: width * 0.9,
    height: width * 0.9,
    resizeMode: "cover",
    borderRadius: 10,
  },
  card: {
    width: width * 0.9,
    height: height * 0.6,
    backgroundColor: "#00000000",
    marginBottom: width * 0.05,
    alignItems: "center",

  },
  header: {
    fontFamily: "AbrilFatface_400Regular",
    fontSize: 60,
    color: "white",
    backgroundColor: "#00000000",
  },
  text: {
    marginTop: width * 0.02,
    marginHorizontal: width * 0.01,
    fontFamily: "Avenir",
    fontSize: 15,
    alignSelf: "flex-start",
  },
  title: {
    fontFamily: "AbrilFatface_400Regular",
    fontSize: 30,
    color: "white",
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    marginHorizontal: width * 0.01,
    alignSelf: "flex-start",
  },
});