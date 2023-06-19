import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, View, Dimensions } from "react-native";

import AppContext from "../components/AppContext";

import HomeScreen from "./HomeScreen";
import ConvertScreen from "./ConvertScreen";
import BinanceScreen from "./BinanceScreen";
import ShopScreen from "./ShopScreen";
import SettingsScreen from "./SettingsScreen";

const { width, height } = Dimensions.get("window");

const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

export default function BankMain() {
  const $ = useContext(AppContext);

  useEffect(() => {}, []);

  return (
    <View style={styles.main}>
      {$.navigation.home.status && <HomeScreen />}
      {$.navigation.convert.status && <ConvertScreen />}
      {$.navigation.binance.status && <BinanceScreen />}
      {$.navigation.shop.status && <ShopScreen />}
      {$.navigation.settings.status && <SettingsScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "gainsboro",
    height: "90%",
  },
});
