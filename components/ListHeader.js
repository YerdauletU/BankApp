import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  useColorScheme,
} from "react-native";

import { COLORS } from "../config.json";

const listHeader = ({ user }) => {
  //const theme = useColorScheme();

  const HEADER_HEIGHT = 42;

  const images = [
    {
      key: 1,
      src: "https://cdn.motor1.com/images/mgl/JJkj4/s3/nissan-gt-r-t-spec.jpg",
      title: "title one",
    },
  ];

  return (
    <View>
      <View
        style={{
          height: HEADER_HEIGHT,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 6,

          backgroundColor: "#eee",
        }}
      >
        <View>
          <Text style={{ fontSize: 24, fontWeight: "500", color: "#000" }}>
            Navigation
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{
              height: HEADER_HEIGHT - 12,
              width: HEADER_HEIGHT - 12,
              margin: 5,
            }}
            source={{
              uri: "https://img.icons8.com/?size=512&id=37784&format=png",
            }}
          />
          <Image
            style={{
              height: HEADER_HEIGHT - 12,
              width: HEADER_HEIGHT - 12,
              margin: 5,
            }}
            source={{
              uri: "https://img.icons8.com/?size=512&id=59832&format=png",
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 12,
        }}
      >
        <Image
          style={{
            height: 120,
            width: 120,
            backgroundColor: "#eee",
            borderRadius: 60,
          }}
          source={{
            uri: user.picture.medium,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            paddingHorizontal: 24,
            flex: 1,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "500", color: "#000" }}>1200</Text>
            <Text>Posts</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "500", color: "#000" }}>1200</Text>
            <Text>Followers</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: "500", color: "#000" }}>1200</Text>
            <Text>Following</Text>
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 12 }}>
        <Text style={{ fontWeight: "700", color: "#000" }}>
          {user.name.first} {user.name.last}
        </Text>
        <Text style={{ color: "#aaa" }}>Personal blog</Text>
        <Text style={{ color: "#333" }}>
          Hey, I am {user.dob.age} come say hi at {user.location.city}
        </Text>
      </View>
      <View style={{ padding: 12, flexDirection: "row" }}>
        <View
          style={{
            flex: 1,
            paddingVertical: 6,
            paddingHorizontal: 18,
            borderRadius: 3,
            borderWidth: 2,
            borderColor: "#ccc",
            alignItems: "center",
          }}
        >
          <Text>Insights</Text>
        </View>
        <View
          style={{
            marginHorizontal: 6, //!!!!! gap
            flex: 1,
            paddingVertical: 6,
            paddingHorizontal: 18,
            borderRadius: 3,
            borderWidth: 2,
            borderColor: "#ccc",
            alignItems: "center",
          }}
        >
          <Text>Contact</Text>
        </View>
        <View
          style={{
            flex: 1,
            paddingVertical: 6,
            paddingHorizontal: 18,
            borderRadius: 3,
            borderWidth: 2,
            borderColor: "#ccc",
            alignItems: "center",
          }}
        >
          <Text>Add Shop</Text>
        </View>
      </View>
      <View style={{ padding: 12 }}>
        <FlatList
          data={images}
          renderItem={({ item }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  backgroundColor: "#eee",
                }}
                source={{ uri: item.src }}
              />
              <Text style={{ color: "black" }}>{item.title}</Text>
            </View>
          )}
          horizontal={true}
        />
      </View>
    </View>
  );
};

export default listHeader;
