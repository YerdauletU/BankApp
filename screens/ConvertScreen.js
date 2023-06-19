import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, View, Dimensions } from "react-native";

import AppContext from "../components/AppContext";

const { width, height } = Dimensions.get("window");

const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

import ConvertScreenHeader from "./ConvertScreenHeader";
import ConvertScreenMain from "./ConvertScreenMain";

export default function ConvertScreen() {
  const $ = useContext(AppContext);

  useEffect(() => {}, []);

  return (
    <View style={styles.screen}>
      <ConvertScreenHeader />
      <ConvertScreenMain />
    </View>
  );
}

const styles = StyleSheet.create({
  asd: {
    backgroundColor: "black",
    height: "80%",
  },
});
