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

export default function SettingsScreen() {
  const $ = useContext(AppContext);

  useEffect(() => {}, []);

  return (
    <View style={styles.main}></View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "blue",
    height: "100%",
  },
});