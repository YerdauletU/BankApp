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

import AppContext from "./AppContext";

const { width, height } = Dimensions.get("window");

const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const ICON_WIDTH = SCREEN_WIDTH / 15;

export default function BankFooterItem({ status, name, iconOn, iconOff }) {
  const $ = useContext(AppContext);

  const navChange = (key) => {
    if (!$.navigation[key].status) {
      let fakeNav = { ...$.navigation };
      for (const item in fakeNav) {
        fakeNav[item].status = false;
      }
      fakeNav[key].status = true;
      $.setNavigation(fakeNav);
    }
  };

  useEffect(() => {}, []);

  return (
    <Pressable style={[styles.nav]} onPress={() => navChange(name)}>
      <Image source={{ uri: status ? iconOn : iconOff }} style={styles.icon} />
      <Text style={styles.iconText}>{name.toUpperCase()}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  nav: {
    width: SCREEN_WIDTH / 5,
    height: "60%",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    width: ICON_WIDTH,
    height: ICON_WIDTH,
  },
  iconText: {
    fontSize: 10,
  },
});
