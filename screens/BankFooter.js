import React, { useEffect, useState, useRef, useContext } from "react";
import { StyleSheet, View, Dimensions } from "react-native";

import AppContext from "../components/AppContext";

import BankFooterItem from "../components/BankFooterItem";

const { width, height } = Dimensions.get("window");

const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

export default function BankFooter() {
  const $ = useContext(AppContext);

  const [nav, setNav] = useState([]);

  const makeArr = () => {
    let fakeArr = [];
    for (const path in $.navigation) {
      fakeArr.push($.navigation[path]);
    }
    setNav(fakeArr);
  };

  useEffect(() => {
    makeArr();
  }, [$.navigation]);

  return (
    <View style={styles.footer}>
      {nav.map((footerItem, key) => (
        <BankFooterItem
          key={key}
          status={footerItem.status}
          name={footerItem.name}
          iconOn={footerItem.iconOn}
          iconOff={footerItem.iconOff}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: "10%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "gray",
    paddingTop: 5,
  },
});
