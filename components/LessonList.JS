import React, { useEffect, useState, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View
} from "react-native";
//import ListHeaderComponent from "./ListHeaderComponent";

const { width, height } = Dimensions.get("screen");

const ListHeaderComponent = ({
  translateY,
  isCategoriesLoaded,
  categories,
  setCurrentCategory
}) => {
  const HEADER_HEIGHT = height / 4;

  return (
    <View
      style={{
        height: HEADER_HEIGHT,
        backgroundColor: "#aaa",
        jusifyContent: "center",
        textAlign: "center"
      }}
    >
      <Text style={{ fontSize: 24 }}>
        Heeeey! Добро пожаловать в наш магазин техники
      </Text>
      {isCategoriesLoaded ? (
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <View style={{ padding: 12 }}>
              <Pressable
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 18,
                  borderRadius: 6,
                  backgroundColor: "#eee"
                }}
                onPress={() => setCurrentCategory(item)}
              >
                <Text style={{ fontSize: 18 }}>{item}</Text>
              </Pressable>
            </View>
          )}
          keyExtractor={(item, index) => index}
          horizontal={true}
          initialScrollIndex={0}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const ListFooterComponent = () => {
  return (
    <View style={{ padding: 48, backgroundColor: "#aaa", textAlign: "center" }}>
      <Text>Вы просмотрели все товары из категории смартфоны</Text>
      {/* <Pressable>загрузить еще...</Pressable> */}
    </View>
  );
};

const ListItemRender = ({ item, scrollY, index }) => {
  const ITEM_HEIGHT = 196;

  const opacity = scrollY.interpolate({
    inputRange: [
      -1,
      index * ITEM_HEIGHT,
      (1 + index) * ITEM_HEIGHT,
      (3 + index) * ITEM_HEIGHT
    ],
    outputRange: [1, 1, 0.5, 0.5],
    extrapolate: "clamp"
  });

  const scale = scrollY.interpolate({
    inputRange: [
      (-5 + index) * ITEM_HEIGHT,
      (-3 + index) * ITEM_HEIGHT,
      index * ITEM_HEIGHT,
      //-1,
      (0 + index) * ITEM_HEIGHT,
      (1 + index) * ITEM_HEIGHT
    ],
    outputRange: [0.5, 1, 1, 1, 0.5],
    extrapolate: "clamp"
  });

  return (
    <Animated.View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        opacity,
        height: ITEM_HEIGHT,
        transform: [{ scale }]
      }}
    >
      <View style={{ padding: 12 }}>
        <Image
          source={{ uri: item.thumbnail }}
          style={{
            height: 180,
            width: 145,
            backgroundColor: "#aaa",
            borderRadius: 6
          }}
          resizeMode="cover"
        />
      </View>
      <View style={{ padding: 12 }}>
        <Text style={{ fontSize: 24, fontWeight: "500" }}>{item.title}</Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "500",
            width: 240
          }}
        >
          {item.description}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>{item.brand}</Text>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>${item.price}</Text>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>{item.rating}</Text>
      </View>
    </Animated.View>
  );
};

const App = () => {
  const [isItemsLoaded, setIsItemsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [isCategoriesLoaded, setIsCategoriesLoaded] = useState(false);
  const [categories, setCategories] = useState([]);

  const [currentCategory, setCurrentCategory] = useState("smartphones");

  // переменная для анимации
  const scrollY = useRef(new Animated.Value(0)).current;
  const inputRange = [0, 80];

  const translateY = scrollY.interpolate({
    inputRange,
    outputRange: [0, -160],
    extrapolate: "clamp"
  });

  const opacity = scrollY.interpolate({
    inputRange,
    outputRange: [0, 1],
    extrapolate: "clamp"
  });

  const getCategories = () => {
    //Service to get the data from the server to render
    fetch("https://dummyjson.com/products/categories")
      .then((response) => response.json())
      .then((responseJson) => {
        setCategories(responseJson);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsCategoriesLoaded(true));
  };

  const getData = (currentCategory, isCategoriesLoaded) => {
    if (!isCategoriesLoaded) return;
    //Service to get the data from the server to render
    //fetch("https://dummyjson.com/products/category/" + currentCategory)
    fetch("https://dummyjson.com/products/")
      .then((response) => response.json())
      .then((responseJson) => {
        setItems(responseJson.products);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsItemsLoaded(true));
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getData(currentCategory, isCategoriesLoaded);
  }, [isCategoriesLoaded, currentCategory]);

  return (
    <View style={{ flex: 1, backgroundColor: "#eee" }}>
      {isItemsLoaded ? (
        <>
          {/* <Animated.View
            style={{
              position: "absolute",
              zIndex: 1,
              backgroundColor: "red",
              width,
              height: height / 5,
              transform: [{ translateY }, { translateX: 0 }],
              opacity
            }}
          >
            <Text>Animatable Header</Text>
          </Animated.View> */}
          <Animated.FlatList
            data={items}
            contentContainerStyle={{}}
            renderItem={({ item, index }) => (
              <ListItemRender scrollY={scrollY} item={item} index={index} />
            )}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl
                //refresh control used for the Pull to Refresh
                refreshing={true}
                onRefresh={getData}
              />
            }
            numColumns={1}
            onEndReached={() => {
              console.log("endreached");
            }}
            //stickyHeaderIndices={[2]}
            // ListHeaderComponent={() => (
            //   <ListHeaderComponent
            //     translateY={translateY}
            //     categories={categories}
            //     isCategoriesLoaded={isCategoriesLoaded}
            //     setCurrentCategory={setCurrentCategory}
            //   />
            // )}
            ListFooterComponent={ListFooterComponent}
            snapToInterval={100}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
          />
        </>
      ) : (
        <ActivityIndicator size="large" color="#aaa" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default App;
