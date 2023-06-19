import React, { useEffect, useState, useRef, useContext } from "react";

import { StyleSheet } from "react-native";

import AppContext from "./components/AppContext";

import BankMain from "./screens/BankMain";
import BankFooter from "./screens/BankFooter";

const App = () => {
  const [navigation, setNavigation] = useState({
    home: {
      name: "home",
      status: true,
      iconOn: "https://img.icons8.com/?size=512&id=8vbzuDEPLmLn&format=png",
      iconOff: "https://img.icons8.com/?size=512&id=zGxhiS80f0zM&format=png",
      link: {
        on: "https://icons8.com/icon/8vbzuDEPLmLn/bank",
        off: "https://icons8.com/icon/zGxhiS80f0zM/bank",
      },
    },
    convert: {
      name: "convert",
      status: false,
      iconOn: "https://img.icons8.com/?size=512&id=AJxYYTuJtYDw&format=png",
      iconOff: "https://img.icons8.com/?size=512&id=ePaVF31bUN43&format=png",
      link: {
        on: "https://icons8.com/icon/AJxYYTuJtYDw/euro-exchange",
        off: "https://icons8.com/icon/ePaVF31bUN43/euro-exchange",
      },
    },
    binance: {
      name: "binance",
      status: false,
      iconOn: "https://img.icons8.com/?size=512&id=7971&format=png",
      iconOff: "https://img.icons8.com/?size=512&id=3552&format=png",
      link: {
        on: "https://icons8.com/icon/7971/bitcoin",
        off: "https://icons8.com/icon/3552/bitcoin",
      },
    },
    shop: {
      name: "shop",
      status: false,
      iconOn: "https://img.icons8.com/?size=512&id=51779&format=png",
      iconOff: "https://img.icons8.com/?size=512&id=87825&format=png",
      link: {
        on: "https://icons8.com/icon/51779/shopping-mall",
        off: "https://icons8.com/icon/87825/shopping-mall",
      },
    },
    settings: {
      name: "settings",
      status: false,
      iconOn: "https://img.icons8.com/?size=512&id=2969&format=png",
      iconOff: "https://img.icons8.com/?size=512&id=364&format=png",
      link: {
        on: "https://icons8.com/icon/2969/settings",
        off: "https://icons8.com/icon/364/settings",
      },
    },
  });
  const [converter, setConverter] = useState({
    endpoint: "https://api.currencyapi.com/v3/latest",
    apikey: "EHPn4lKeJyrnUTorN8FAx1McsdmZNKhg12LRqXDE",
    currency: "KZT",
    currencies: ["USD", "EUR", "RUB"],
    others: [],
    front: [],
    back: [],
  });

  const APP_STATE = {
    navigation,
    setNavigation,
    converter,
    setConverter,
  };

  useEffect(() => {}, []);

  return (
    <AppContext.Provider value={APP_STATE}>
      <BankMain />
      <BankFooter />
    </AppContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({});