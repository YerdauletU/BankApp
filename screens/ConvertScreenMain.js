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

import ConvertScreenItem from "../components/ConvertScreenItem";

const { width, height } = Dimensions.get("window");

const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;

const db = {
  data: {
    ADA: { code: "ADA", value: 0.006133 },
    AED: { code: "AED", value: 0.008261 },
    AFN: { code: "AFN", value: 0.195708 },
    ALL: { code: "ALL", value: 0.23215 },
    AMD: { code: "AMD", value: 0.869482 },
    ANG: { code: "ANG", value: 0.004054 },
    AOA: { code: "AOA", value: 1.242856 },
    ARS: { code: "ARS", value: 0.530017 },
    AUD: { code: "AUD", value: 0.003451 },
    AVAX: { code: "AVAX", value: 0.000154 },
    AWG: { code: "AWG", value: 0.004055 },
    AZN: { code: "AZN", value: 0.003824 },
    BAM: { code: "BAM", value: 0.004094 },
    BBD: { code: "BBD", value: 0.004542 },
    BDT: { code: "BDT", value: 0.241158 },
    BGN: { code: "BGN", value: 0.004101 },
    BHD: { code: "BHD", value: 0.000848 },
    BIF: { code: "BIF", value: 6.345877 },
    BMD: { code: "BMD", value: 0.00225 },
    BNB: { code: "BNB", value: 0.000007 },
    BND: { code: "BND", value: 0.003039 },
    BOB: { code: "BOB", value: 0.015544 },
    BRL: { code: "BRL", value: 0.011235 },
    BSD: { code: "BSD", value: 0.002249 },
    BTC: { code: "BTC", value: 0 },
    BTN: { code: "BTN", value: 0.185814 },
    BWP: { code: "BWP", value: 0.030853 },
    BYN: { code: "BYN", value: 0.005677 },
    BYR: { code: "BYR", value: 44.090385 },
    BZD: { code: "BZD", value: 0.004534 },
    CAD: { code: "CAD", value: 0.003063 },
    CDF: { code: "CDF", value: 5.25261 },
    CHF: { code: "CHF", value: 0.002039 },
    CLF: { code: "CLF", value: 0.000065 },
    CLP: { code: "CLP", value: 1.800285 },
    CNY: { code: "CNY", value: 0.015892 },
    COP: { code: "COP", value: 10.002459 },
    CRC: { code: "CRC", value: 1.207918 },
    CUC: { code: "CUC", value: 0.002261 },
    CUP: { code: "CUP", value: 0.053983 },
    CVE: { code: "CVE", value: 0.232375 },
    CZK: { code: "CZK", value: 0.049666 },
    DJF: { code: "DJF", value: 0.399783 },
    DKK: { code: "DKK", value: 0.01562 },
    DOP: { code: "DOP", value: 0.122711 },
    DOT: { code: "DOT", value: 0.00042 },
    DZD: { code: "DZD", value: 0.307578 },
    EGP: { code: "EGP", value: 0.069474 },
    ERN: { code: "ERN", value: 0.033743 },
    ETB: { code: "ETB", value: 0.122149 },
    ETH: { code: "ETH", value: 0.000001 },
    EUR: { code: "EUR", value: 0.002096 },
    FJD: { code: "FJD", value: 0.005059 },
    FKP: { code: "FKP", value: 0.001822 },
    GBP: { code: "GBP", value: 0.001822 },
    GEL: { code: "GEL", value: 0.005815 },
    GGP: { code: "GGP", value: 0.001822 },
    GHS: { code: "GHS", value: 0.025138 },
    GIP: { code: "GIP", value: 0.001822 },
    GMD: { code: "GMD", value: 0.134071 },
    GNF: { code: "GNF", value: 19.469542 },
    GTQ: { code: "GTQ", value: 0.017555 },
    GYD: { code: "GYD", value: 0.475727 },
    HKD: { code: "HKD", value: 0.017619 },
    HNL: { code: "HNL", value: 0.055495 },
    HRK: { code: "HRK", value: 0.015794 },
    HTG: { code: "HTG", value: 0.318279 },
    HUF: { code: "HUF", value: 0.778556 },
    IDR: { code: "IDR", value: 33.760897 },
    ILS: { code: "ILS", value: 0.008381 },
    IMP: { code: "IMP", value: 0.001822 },
    INR: { code: "INR", value: 0.185731 },
    IQD: { code: "IQD", value: 2.946862 },
    IRR: { code: "IRR", value: 95.154352 },
    ISK: { code: "ISK", value: 0.313177 },
    JEP: { code: "JEP", value: 0.001822 },
    JMD: { code: "JMD", value: 0.348657 },
    JOD: { code: "JOD", value: 0.001596 },
    JPY: { code: "JPY", value: 0.316405 },
    KES: { code: "KES", value: 0.31122 },
    KGS: { code: "KGS", value: 0.197035 },
    KHR: { code: "KHR", value: 9.25 },
    KMF: { code: "KMF", value: 1.033539 },
    KPW: { code: "KPW", value: 2.02455 },
    KRW: { code: "KRW", value: 2.977073 },
    KWD: { code: "KWD", value: 0.000692 },
    KYD: { code: "KYD", value: 0.001874 },
    KZT: { code: "KZT", value: 1 },
    LAK: { code: "LAK", value: 39.760121 },
    LBP: { code: "LBP", value: 33.838753 },
    LKR: { code: "LKR", value: 0.669158 },
    LRD: { code: "LRD", value: 0.377806 },
    LSL: { code: "LSL", value: 0.044203 },
    LTC: { code: "LTC", value: 0.000025 },
    LTL: { code: "LTL", value: 0.006642 },
    LVL: { code: "LVL", value: 0.001361 },
    LYD: { code: "LYD", value: 0.010854 },
    MAD: { code: "MAD", value: 0.023016 },
    MATIC: { code: "MATIC", value: 0.002444 },
    MDL: { code: "MDL", value: 0.040105 },
    MGA: { code: "MGA", value: 9.920355 },
    MKD: { code: "MKD", value: 0.128974 },
    MMK: { code: "MMK", value: 4.723367 },
    MNT: { code: "MNT", value: 7.773944 },
    MOP: { code: "MOP", value: 0.018154 },
    MRO: { code: "MRO", value: 0.077158 },
    MUR: { code: "MUR", value: 0.102443 },
    MVR: { code: "MVR", value: 0.034418 },
    MWK: { code: "MWK", value: 2.301252 },
    MXN: { code: "MXN", value: 0.039659 },
    MYR: { code: "MYR", value: 0.01035 },
    MZN: { code: "MZN", value: 0.142282 },
    NAD: { code: "NAD", value: 0.044203 },
    NGN: { code: "NGN", value: 1.03815 },
    NIO: { code: "NIO", value: 0.082107 },
    NOK: { code: "NOK", value: 0.024891 },
    NPR: { code: "NPR", value: 0.297294 },
    NZD: { code: "NZD", value: 0.003721 },
    OMR: { code: "OMR", value: 0.000866 },
    PAB: { code: "PAB", value: 0.002249 },
    PEN: { code: "PEN", value: 0.00825 },
    PGK: { code: "PGK", value: 0.007918 },
    PHP: { code: "PHP", value: 0.125726 },
    PKR: { code: "PKR", value: 0.641111 },
    PLN: { code: "PLN", value: 0.009501 },
    PYG: { code: "PYG", value: 16.221668 },
    QAR: { code: "QAR", value: 0.00819 },
    RON: { code: "RON", value: 0.010398 },
    RSD: { code: "RSD", value: 0.24578 },
    RUB: { code: "RUB", value: 0.177712 },
    RWF: { code: "RWF", value: 2.547573 },
    SAR: { code: "SAR", value: 0.008437 },
    SBD: { code: "SBD", value: 0.018747 },
    SCR: { code: "SCR", value: 0.030318 },
    SDG: { code: "SDG", value: 1.350833 },
    SEK: { code: "SEK", value: 0.024324 },
    SGD: { code: "SGD", value: 0.003037 },
    SHP: { code: "SHP", value: 0.002737 },
    SLL: { code: "SLL", value: 44.427883 },
    SOL: { code: "SOL", value: 0.00011 },
    SOS: { code: "SOS", value: 1.281098 },
    SRD: { code: "SRD", value: 0.083907 },
    STD: { code: "STD", value: 46.560304 },
    SVC: { code: "SVC", value: 0.019682 },
    SYP: { code: "SYP", value: 5.65197 },
    SZL: { code: "SZL", value: 0.044203 },
    THB: { code: "THB", value: 0.078126 },
    TJS: { code: "TJS", value: 0.024584 },
    TMT: { code: "TMT", value: 0.007873 },
    TND: { code: "TND", value: 0.006967 },
    TOP: { code: "TOP", value: 0.005357 },
    TRY: { code: "TRY", value: 0.044929 },
    TTD: { code: "TTD", value: 0.015267 },
    TWD: { code: "TWD", value: 0.069044 },
    TZS: { code: "TZS", value: 5.3201 },
    UAH: { code: "UAH", value: 0.083069 },
    UGX: { code: "UGX", value: 8.386193 },
    USD: { code: "USD", value: 0.00225 },
    UYU: { code: "UYU", value: 0.087022 },
    UZS: { code: "UZS", value: 25.734439 },
    VEF: { code: "VEF", value: 5864.448489 },
    VND: { code: "VND", value: 52.824179 },
    VUV: { code: "VUV", value: 0.269892 },
    WST: { code: "WST", value: 0.006036 },
    XAF: { code: "XAF", value: 1.373127 },
    XAG: { code: "XAG", value: 0.000096 },
    XAU: { code: "XAU", value: 0.000001 },
    XCD: { code: "XCD", value: 0.006079 },
    XDR: { code: "XDR", value: 0.00168 },
    XOF: { code: "XOF", value: 1.373328 },
    XPD: { code: "XPD", value: 0.000002 },
    XPF: { code: "XPF", value: 0.251158 },
    XPT: { code: "XPT", value: 0.000002 },
    XRP: { code: "XRP", value: 0.004731 },
    YER: { code: "YER", value: 0.563166 },
    ZAR: { code: "ZAR", value: 0.044225 },
    ZMK: { code: "ZMK", value: 20.248284 },
    ZMW: { code: "ZMW", value: 0.043357 },
    ZWL: { code: "ZWL", value: 0.724341 },
  },
  meta: { last_updated_at: "2023-05-27T23:59:59Z" },
};

export default function ConvertScreenMain() {
  const $ = useContext(AppContext);

  const [refreshing, setRefreshing] = useState(false);

  const [dataBase, setDataBase] = useState([]);
  const [otherBase, setOtherBase] = useState([]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      // alert("ok");
      getCash();
    }, 2000);
  };

  async function getCash() {
    // const response = await fetch(`${$.converter.endpoint}?apikey=${$.converter.apikey}&base_currency=${$.converter.currency}`); /*&currencies=USD,RUB,EUR";*/
    // const res = await response.json();

    let frontDb = [];
    let backDb = [];
    let otherDb = [];

    for (const elem in db.data) {
      let name = db.data[elem].code;
      let value = db.data[elem].value;
      let date = db.meta.last_updated_at.split("T")[0];
      let time = db.meta.last_updated_at.split("T")[1].replaceAll("Z", "");

      if (value < 1) {
        value = 1 / value;
        value = value.toFixed(2);
      } else {
        value = value.toFixed(2);
      }

      if ($.converter.currencies.includes(db.data[elem].code)) {
        let id = frontDb.length + 1;
        frontDb.push({ id, name, value, date, time });
      } else if (db.data[elem].code !== $.converter.currency) {
        let id = backDb.length + 1;
        backDb.push({ id, name, value, date, time });
        otherDb.push(name);
      }
    }

    let fakeOb = { ...$.converter };
    fakeOb.front = [...frontDb];
    fakeOb.back = [...backDb];
    fakeOb.others = [...otherDb];

    $.setConverter(fakeOb);
    setDataBase(frontDb);
    setOtherBase(backDb);
  }

  useEffect(() => {
    getCash();
  }, [$.converter.currencies.join("")]);

  const renderItem = ({ item }) => {
    const ITEM_WIDTH = width / 5; // 90
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#1C1C1E",
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <Image
          source={{
            uri: `https://www.countryflagicons.com/FLAT/64/${
              item.name[0] + item.name[1]
            }.png`,
          }}
          style={{
            width: ITEM_WIDTH,
            height: ITEM_WIDTH,
            // backgroundColor: "#eee",
          }}
        />
        <View style={{ flexDirection: "column" }}>
          <Text style={{ color: "white", fontSize: 30 }}>
            {item.name}: {item.value}
          </Text>
          <Text style={{ color: "white", fontSize: 15 }}>
            {item.date}== {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      style={styles.main}
      ListHeaderComponent={<ConvertScreenItem />}
      data={dataBase}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="white"
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "black",
    height: "88%",
    paddingHorizontal: 20,
    backgroundColor: "black",
  },
});
