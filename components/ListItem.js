import React, { useEffect, useState } from "react";
import {
  Animated,
  Image,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  StyleSheet
} from "react-native";

const UNIT_SIZE = 86;

const { width, height } = Dimensions.get("screen");

const d = new Date();
let hour = d.getHours();

const ListItem = ({ item, index, scrollX }) => {
  const inputRange = [-1, width * index, width * index, width * (index + 1)];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.95, 1, 1, 0.95]
  });

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [100, 0, 0, 100]
  });
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [0, 0, 0, 0]
  });

  const rotationX = scrollX.interpolate({
    inputRange,
    outputRange: ["45deg", "0deg", "0deg", "-45deg"]
  });

  const rotationY = scrollX.interpolate({
    inputRange,
    outputRange: ["45deg", "0deg", "0deg", "-45deg"]
  });

  const rotationZ = scrollX.interpolate({
    inputRange,
    outputRange: ["45deg", "0deg", "0deg", "-45deg"]
  });

  const weatherIcons = {
    0: "https://img.icons8.com/?size=512&id=15352&format=png",
    1: "https://img.icons8.com/?size=512&id=15359&format=png",
    2: "https://img.icons8.com/?size=512&id=15341&format=png",
    3: "https://img.icons8.com/?size=512&id=19541&format=png"
  };

  const weatherQuote = {
    0: ["Очень жарко", "Мороженка в помощь"],
    1: ["ЗОНТИК ПРИГОДИТСЯ", "Вы его возьмите"],
    2: ["ЗОНТИК ПРИГОДИТСЯ", "Вы его возьмите"],
    3: ["Зонтик пригодится", "А лучше два"]
  };
  const [cwq, setCWQ] = useState(["...", "..."]);

  const weatherBgColor = {
    0: "#fff",
    1: "#f003",
    2: "#0f03",
    3: "#eee"
  };
  const [cwbg, setCWBG] = useState("#fff");

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const updated_at = "";
  const getWeather = async (lat, lon) => {
    setIsLoading(true);
    let url = "https://api.open-meteo.com/v1/forecast";
    url += "?latitude=" + lat;
    url += "&longitude=" + lon;
    url +=
      "&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,weathercode";
    url += "&forecast_days=1";
    url += "&timezone=Asia/Almaty";

    //?latitude=43.26&longitude=76.93&hourly=temperature_2m,relativehumidity_2m,apparent_temperature&current_weather=true&windspeed_unit=ms

    await fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setCWQ(weatherQuote[result.hourly?.weathercode[hour]]);
        setCWBG(weatherBgColor[result.hourly?.weathercode[hour]]);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getWeather(item.lat, item.lon);
  }, []);

  return (
    <View style={[styles.app, { backgroundColor: cwbg }]}>
      <Animated.View
        style={[
          styles.headerWrap,
          {
            flex: 1,
            transform: [
              { scale },
              { translateX: translateX },
              { translateY: translateY }
            ]
          }
        ]}
      >
        <Text style={styles.headerText}>{item.name}</Text>
        <Text>
          {item.lat || "..."},{item.lon || "..."}
        </Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.weatherIcon,
          {
            transform: [
              { rotateX: rotationX },
              { rotateY: rotationY },
              { rotateZ: rotationZ }
            ]
          }
        ]}
      >
        <Image
          style={{ height: UNIT_SIZE * 3, width: UNIT_SIZE * 3 }}
          source={{
            uri: weatherIcons[data.hourly?.weathercode[hour]]
          }}
        />
      </Animated.View>
      <View style={styles.centered}>
        <View style={styles.row}>
          <Text style={styles.currentTempText}>
            {Math.round(data.hourly?.temperature_2m[hour]) || "..."}
          </Text>
          <Text style={styles.currentTempOText}>o</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.feelsLikeText}>
            ощущается как{" "}
            {Math.round(data.hourly?.apparent_temperature[hour]) || "..."}
          </Text>
          <Text style={styles.feelsLikeOText}>o</Text>
        </View>
      </View>
      <View style={[styles.centered, { flex: 2 }]}>
        <Text style={styles.goodMorningText}>
          {cwq != undefined ? cwq[0] : "..."}
        </Text>
        <Text style={styles.dayNameText}>
          {cwq != undefined ? cwq[1] : "..."}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width,
    height
  },
  headerWrap: {
    justifyContent: "center",
    alignItems: "center",
    padding: UNIT_SIZE / 8
  },
  headerText: {
    color: "#000",
    fontWeight: "500",
    fontSize: UNIT_SIZE / 4
  },
  weatherIcon: { flex: 2, justifyContent: "center", alignItems: "center" },
  currentTempText: {
    color: "#000",
    fontWeight: "400",
    fontSize: UNIT_SIZE,
    lineHeight: UNIT_SIZE * 1.2
  },
  currentTempOText: {
    color: "#000",
    fontWeight: "500",
    fontSize: UNIT_SIZE / 3,
    marginTop: UNIT_SIZE / 8
  },
  feelsLikeText: {
    color: "#aaa",
    fontWeight: "400",
    fontSize: UNIT_SIZE / 4,
    lineHeight: UNIT_SIZE / 3
  },
  feelsLikeOText: {
    color: "#aaa",
    fontWeight: "500",
    lineHeight: UNIT_SIZE / 8
  },
  goodMorningText: {
    color: "#000",
    fontSize: UNIT_SIZE / 5
  },
  dayNameText: {
    color: "#000",
    fontWeight: "400",
    fontSize: UNIT_SIZE / 4
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" }
});

export default ListItem;
