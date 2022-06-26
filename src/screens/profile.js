import { StyleSheet,Text,View,TouchableOpacity,SafeAreaView, ScrollView, Alert} from "react-native";
import { globalStyles } from '../../styles/globalStyles';
import React, { useEffect, useState } from "react";
import { getAuth } from 'firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-elements";
import { getDownloadURL, getStorage, ref } from "@firebase/storage";
import { RefreshControl } from "react-native";

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );

const LogoutButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.logoutButtonText}>{title}</Text>
    </TouchableOpacity>
  );


export default function Profile() {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigation = useNavigation();

  const [url, setUrl] = useState();
  const [name, setName] = useState();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setName(user.displayName);
    const func = async () => {
      const storage = getStorage();
      const profileRef = ref(storage, 'profile/' + user.uid);
      const defaultRef = ref(storage, 'profile/default-profile.jpg')

      await getDownloadURL(profileRef).then((result) => {
        setUrl(result);
      }).catch((error) => {
        getDownloadURL(defaultRef).then((result) => {
          setUrl(result);
        })
      })
    }
    func();
    setRefreshing(false);
  }, [refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
  }

  const signOut = () => auth.signOut();

  return(
      <SafeAreaView style={globalStyles.background}>
        <Text style = {globalStyles.header}>Profile.</Text>

        <ScrollView contentContainerStyle = {globalStyles.container} 
                    refreshControl = {<RefreshControl refreshing = {refreshing} onRefresh = {onRefresh}/>} >
          
          <View style = {styles.image}>
            <Avatar source={{uri: url}} size = {200} rounded = {true}>
              <Avatar.Accessory size = {40} onPress = {() => navigation.navigate('EditProfileScreen')} />
            </Avatar>
          </View>
          
          <Text style = {styles.name}>{name}</Text>
          
          <View style={styles.screenContainer}>
              <AppButton title="my body" backgroundColor="#007bff"  onPress = { () => Alert.alert('This page is not available yet😭')}/>
          </View>

          <View style={styles.screenContainer}>
              <AppButton title="saved looks" backgroundColor="#007bff" onPress = { () => Alert.alert('This page is not available yet😭')}/>
          </View>

          <View style={styles.screenContainer}>
              <AppButton title="wishlist" backgroundColor="#007bff" onPress = {() => navigation.navigate('WishlistScreen')} />
          </View>

          <View style={styles.screenContainer}>
              <LogoutButton title="log out" backgroundColor="#007bff" onPress = {signOut} />
          </View>
          </ScrollView>
      </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  image: {
    marginTop: 20,
  },
  name: {
    marginTop: 10,
    marginBottom: -10,
    fontSize: 20,
    fontFamily: "AbrilFatface_400Regular",
    color: "black",
    borderBottomWidth: 25,
  },
  screenContainer: {
    justifyContent: "flex-start",
    padding: 16,
  },
  appButtonContainer: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 40,
    paddingVertical: 10,
  },
  appButtonText: {
    fontSize: 25,
    fontFamily: "AbrilFatface_400Regular",
    color: "black",
    alignSelf: "center",
  },
  logoutButtonText: {
    fontSize: 20,
    fontFamily: "AbrilFatface_400Regular",
    color: "#DDC2EF",
    alignSelf: "center",
  },
});