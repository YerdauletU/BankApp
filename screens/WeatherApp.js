import React, { useEffect, useState, useRef } from "react";
import {
  Animated,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  View,
  SafeAreaView,
  StyleSheet
} from "react-native";
import ListItem from "../components/ListItem";

const d = new Date();
let hour = d.getHours();

const { width, height } = Dimensions.get("screen");

const App = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const locations = [
    { key: 1, name: "Almaty", lat: 43.26, lon: 76.93 },
    { key: 2, name: "Astana", lat: 51.18, lon: 71.45 }
  ];

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    //console.log(viewableItems);
    //setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 60 }).current;

  return (
    <SafeAreaView style={styles.app}>
      <Animated.FlatList
        data={locations}
        renderItem={({ item, index }) => (
          <ListItem item={item} index={index} scrollX={scrollX} />
        )}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        //!!!только для web
        // contentContainerStyle={{ width, height }}
        bounces={false}
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "#aaa"
  }
});

export default App;

//////////////////////////////////////////////////////////////

/*import React, { useEffect, useState, useRef, useContext } from "react";
import AppContext from "../components/AppContext";
import {
  Animated,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";

// const $ = useContext(AppContext);

const UNIT_SIZE = 86;

const d = new Date();
let hour = d.getHours();

const weatherIcons = {
  0: "https://img.icons8.com/?size=512&id=15352&format=png",
  1: "https://img.icons8.com/?size=512&id=15359&format=png",
  2: "https://img.icons8.com/?size=512&id=15341&format=png",
  3: "https://img.icons8.com/?size=512&id=19541&format=png"
};

const weatherQuote = {
  0: "",
  1: "",
  2: "",
  3: ["ЗОНТИК ПРИГОДИТСЯ", "Вы его возьмите"]
};

const App = () => {
  const getWeather = async () => {
    let url = "https://api.open-meteo.com/v1/forecast";
    url += "?latitude=43.26";
    url += "&longitude=76.93";
    url +=
      "&hourly=temperature_2m,apparent_temperature,precipitation_probability,precipitation,weathercode";
    url += "&forecast_days=1";
    url += "&timezone=Asia/Almaty";

    //?latitude=43.26&longitude=76.93&hourly=temperature_2m,relativehumidity_2m,apparent_temperature&current_weather=true&windspeed_unit=ms

    await fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setCurrentWeather(result);

        //setCurrentTemp(Math.round(result.hourly?.temperature_2m[hour]));
      });
  };

  useEffect(() => {
    getWeather();
  }, []);

  const [currentWeather, setCurrentWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const currentLocationName = "Almaty";
  const [currentTemp, setCurrentTemp] = useState("..");
  const currentWeatherIcon =
    "https://img.icons8.com/?size=512&id=wXO1Ic658KO7&format=png";
  const feelsLikeTemp = "18";

  return (
    <SafeAreaView style={styles.app}>
      <View style={styles.headerWrap}>
        <Text style={styles.headerText}>{currentLocationName}</Text>
        <Text>
          {currentWeather.latitude || "..."},{currentWeather.longitude || "..."}
        </Text>
      </View>
      <View style={styles.weatherIcon}>
        <Image
          style={{ height: UNIT_SIZE * 3, width: UNIT_SIZE * 3 }}
          source={{
            uri: weatherIcons[currentWeather.hourly?.weathercode[hour]]
          }}
        />
      </View>
      <View style={styles.centered}>
        <View style={styles.row}>
          <Text style={styles.currentTempText}>
            {Math.round(currentWeather.hourly?.temperature_2m[hour]) || "..."}
          </Text>
          <Text style={styles.currentTempOText}>o</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.feelsLikeText}>
            ощущается как{" "}
            {Math.round(currentWeather.hourly?.apparent_temperature[hour]) ||
              "..."}
          </Text>
          <Text style={styles.feelsLikeOText}>o</Text>
        </View>
      </View>
      <View style={[styles.centered, { flex: 2 }]}>
        <Text style={styles.goodMorningText}>
          {weatherQuote[currentWeather.hourly?.weathercode[hour]][0]}
        </Text>
        <Text style={styles.dayNameText}>
          {weatherQuote[currentWeather.hourly?.weathercode[hour]][1]}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
    fontSize: UNIT_SIZE / 3
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

export default App;*/
