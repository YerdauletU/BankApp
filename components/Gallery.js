import React, { useState } from "react";
import {
  Alert,
  Button,
  ActivityIndicator,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
  Dimensions,
} from "react-native";

const winWidth = Dimensions.get("window").width;

const db = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1568122506084-57d12d22b683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTIlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1568122506084-57d12d22b683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTIlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1568122506084-57d12d22b683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTIlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1568122506084-57d12d22b683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTIlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1568122506084-57d12d22b683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTIlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1568122506084-57d12d22b683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTIlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1568122506084-57d12d22b683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTIlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1568122506084-57d12d22b683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTIlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1568122506084-57d12d22b683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTIlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 10,
    image:
      "https://images.unsplash.com/photo-1568122506084-57d12d22b683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTIlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 11,
    image:
      "https://images.unsplash.com/photo-1568122506084-57d12d22b683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTIlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 12,
    image:
      "https://images.unsplash.com/photo-1568122506084-57d12d22b683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTIlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 13,
    image:
      "https://images.unsplash.com/photo-1568122506084-57d12d22b683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTIlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 14,
    image:
      "https://images.unsplash.com/photo-1568122506084-57d12d22b683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTIlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 15,
    image:
      "https://images.unsplash.com/photo-1568122506084-57d12d22b683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTIlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 16,
    image:
      "https://images.unsplash.com/photo-1568122506084-57d12d22b683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTIlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 17,
    image:
      "https://images.unsplash.com/photo-1568122506084-57d12d22b683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTIlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 18,
    image:
      "https://images.unsplash.com/photo-1568122506084-57d12d22b683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTIlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 19,
    image:
      "https://images.unsplash.com/photo-1568122506084-57d12d22b683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTIlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
  {
    id: 20,
    image:
      "https://images.unsplash.com/photo-1568122506084-57d12d22b683?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTIlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  },
];

export default function Calculator() {
  const onPressFunction = (id) => {
    Alert.alert(`Pressed: ${id}`);
  };

  return (
    <View style={styles.gallery}>
      <View style={styles.headerGallery}></View>
      <View style={styles.mainGallery}>
        <ScrollView
          contentContainerStyle={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            // backgroundColor: "aqua",
            // marginHorizontal: 10,
            width: winWidth - 10,
            gap: 10,
          }}
        >
          {db.map((value) => (
            <TouchableHighlight
              onPress={() => onPressFunction(value.id)}
              key={value.id}
            >
              <Image
                style={[
                  styles.image,
                  { width: winWidth / 4 - 10, height: winWidth / 4 - 10 },
                ]}
                resizeMode="cover"
                source={{ uri: value.image }}
              />
            </TouchableHighlight>
          ))}
        </ScrollView>
      </View>
      <View style={styles.footerGallery}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  gallery: {
    flex: 1,
    // backgroundColor: "red",
  },
  headerGallery: {
    height: "10%",
    backgroundColor: "red",
  },
  mainGallery: {
    height: "80%",
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    // width: 100,
    // height: 100
    // margin: 5
  },
  footerGallery: {
    height: "10%",
    backgroundColor: "red",
  },
});
