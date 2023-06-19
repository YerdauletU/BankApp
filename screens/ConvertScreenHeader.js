import React, { useEffect, useState, useRef, useContext } from "react";
import {
  Animated,
  FlatList,
  Pressable,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Dimensions,
} from "react-native";

import AppContext from "../components/AppContext";

const { width, height } = Dimensions.get("window");

const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

export default function ConvertScreenHeader() {
  const $ = useContext(AppContext);

  useEffect(() => {}, []);

  return (
    <View style={[styles.header, {backgroundColor: "green"}]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 16 }}>
            {$.converter.currency}
          </Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ color: "white", fontSize: 16 }}>Главная</Text>
        </View>
        <View>
          <Text style={{ color: "dodgerblue", fontSize: 16 }}>Изменить</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "red",
    height: "12%",
    justifyContent: "flex-end",
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "black",
  },
});
