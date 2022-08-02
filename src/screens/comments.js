import { getAuth } from "firebase/auth";
import { collection, doc, setDoc, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { View, TouchableOpacity, FlatList, SafeAreaView, TextInput, Dimensions, Text, KeyboardAvoidingView } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet } from "react-native";
import { v4 } from "uuid";

export default function Comments({route}) {
    const firestore = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    const [comments, setComments] = useState([]);
    const [post, setPost] = useState('');
    const [text, setText] = useState('');

    const loadItems = async () => {
        const data = [];
        const commentsRef = collection(firestore, 'reviews', route.params.user, 'posts', route.params.post, 'comments');
        const querySnapshot = await getDocs(commentsRef);
        querySnapshot.forEach((comment) => {
            data.push(comment.data())
        })
        data.sort((a, b) => b.Date - a.Date)
        setComments(data);
        setPost(route.params.post)
    }

    useEffect(() => {
        loadItems();
      }, [comments]);


    const postComment = async () => {
        if (text != '') { 
            const docRef = doc(firestore, "reviews", route.params.user, "posts", route.params.post, "comments", v4())
            setDoc(docRef, {
                Text: text,
                User: user.uid,
                CommentId: docRef.id,
                Date: new Date()
            })
            }
            setText('');
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
              <Text style={styles.text}>{item.Text}</Text>    
            </View>
        );
      };

    return (
        <SafeAreaView style = {globalStyles.background}>
            <View style= {styles.inputView}>
                <TextInput
                    style = {styles.textInput}
                    placeholder="Share your thoughts!"
                    placeholderTextColor="black"
                    autoCapitalize="none"
                    onChangeText={(text) => setText(text)}
                    value = {text}
                />

                <TouchableOpacity style = {styles.post} onPress = {postComment}>
                    <MaterialCommunityIcons name = "send" size = {30} color = "#DDC2EF" />
                </TouchableOpacity>
            </View>

            <View>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={comments}
                    renderItem={renderItem}
                    style = {{marginTop: height * 0.05}}
                />
            </View>
        </SafeAreaView>
    );
}

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
    textInput: {
        fontFamily: 'Avenir',
        fontSize: 18,
        flex: 0.9,
        padding: 15
    },
    inputView: {
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 20,
        width: width * 0.9,
        alignSelf: 'center',
        marginTop: 30
    },
    post: {
        justifyContent: 'center'
    },
    card: {
        width: width * 0.9,
        marginBottom: width * 0.05,
        alignItems: "center",
        backgroundColor: "#E7D5E9",
        borderRadius: 10,
        alignSelf: "center"
    },
    text: {
        fontFamily: 'Avenir',
        fontSize: 16,
        padding: 20,
        alignSelf: "flex-start"
    }
})