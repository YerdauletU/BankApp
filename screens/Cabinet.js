import React, { useEffect, useState, useRef, useContext } from "react";
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

import ListHeader from "../components/ListHeader";

import ConverterMM from "../components/ConverterMM";
import GalleryMM from "../components/GalleryMM";
import NotesMM from "../components/NotesMM";

const { width, height } = Dimensions.get("window");

const CabinetScreen = () => {
  const $ = useContext(AppContext);

  const getGallery = () => {
    let imageArr = [];
    let id = 0;
    let asd = "https://picsum.photos"
    let qwe = "/200/300"
    for (let i = 0; i < $.user.userPhotosCount; i++) {
      id = imageArr.length + 1;
      src = 'https://picsum.photos/200/300';
      imageArr.push({id, src: asd + qwe});
    }
    setImages(imageArr);
  };

  useEffect(() => {
    // const rand = Math.floor(Math.random() * 20) + 1;
    getGallery();
    //console.table(width, height);
    console.log($.user.userPhotosCount);
  }, []);

  const scrollOffset = useRef(new Animated.Value(0)).current;

  const headerTranslationY = scrollOffset.interpolate({
    inputRange: [0, 100],
    outputRange: [-80, 0],
    extrapolate: "clamp",
  });

  const HEADER_HEIGHT = 42;

  const [images, setImages] = useState([
    {
      src: "https://cdn.hswstatic.com/gif/why-is-sky-blue.jpg",
      name: "sky",
      key: 1,
    },
    {
      src: "https://picsum.photos/200/300",
      name: "another sky",
      key: 2,
    },
    {
      src: "https://nt.global.ssl.fastly.net/binaries/content/gallery/website/national/regions/suffolk/places/sutton-hoo/library/spring/1586349-the-woodland-in-spring-at-sutton-hoo-suffolk.jpg?auto=webp&width=767&crop=16:9&dpr=2%202x",
      name: "yeah, another one",
      key: 3,
    },
    {
      src: "https://img.freepik.com/free-photo/mountains-lake_1398-1150.jpg",
      name: "yeah, another one",
      key: 4,
    },
    {
      src: "https://www.advantour.com/img/armenia/armenia-nature.jpg",
      name: "yeah, another one",
      key: 5,
    },
    {
      src: "https://www.advantour.com/img/armenia/armenia-nature.jpg",
      name: "yeah, another one",
      key: 6,
    },
    {
      src: "https://www.advantour.com/img/armenia/armenia-nature.jpg",
      name: "yeah, another one",
      key: 7,
    },
    {
      src: "https://www.advantour.com/img/armenia/armenia-nature.jpg",
      name: "yeah, another one",
      key: 8,
    },
    {
      src: "https://www.advantour.com/img/armenia/armenia-nature.jpg",
      name: "yeah, another one",
      key: 9,
    },
    {
      src: "https://www.advantour.com/img/armenia/armenia-nature.jpg",
      name: "yeah, another one",
      key: 10,
    },
    {
      src: "https://www.advantour.com/img/armenia/armenia-nature.jpg",
      name: "yeah, another one",
      key: 11,
    },
  ]);

  const renderItem = ({ item }) => {
    const ITEM_WIDTH = width / 3; // 90
    const URI = "https://picsum.photos/200/300";
    return (
      // <TouchableOpacity>
      <Image
        source={{ uri: item.src }}
        style={{
          width: ITEM_WIDTH,
          height: ITEM_WIDTH,
          backgroundColor: "#eee",
        }}
      />
      // </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View
        style={{
          transform: [{ translateY: headerTranslationY }],
          backgroundColor: "red",
          position: "absolute",
          top: 0,
          left: 0,
          width,
          zIndex: 1,
          elevation: 6,
        }}
      >
        <View
          style={{
            height: HEADER_HEIGHT,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 6,

            backgroundColor: "#eee",
          }}
        >
          <View>
            <Text style={{ fontSize: 24, fontWeight: "500", color: "#000" }}>
              Navigation
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{
                height: HEADER_HEIGHT - 12,
                width: HEADER_HEIGHT - 12,
                margin: 5,
              }}
              source={{
                uri: "https://img.icons8.com/?size=512&id=37784&format=png",
              }}
            />
            <Image
              style={{
                height: HEADER_HEIGHT - 12,
                width: HEADER_HEIGHT - 12,
                margin: 5,
              }}
              source={{
                uri: "https://img.icons8.com/?size=512&id=59832&format=png",
              }}
            />
          </View>
        </View>
      </Animated.View>
      <Animated.FlatList
        ListHeaderComponent={<ListHeader user={$.user} />}
        data={images}
        renderItem={renderItem}
        numColumns={3}
        // horizontal={true}
        // pagingEnabled={true}
        // bounces={false}
        // contentContainerStyle={{ width, height }}
        showsHorizontalScrollIndicator={false}
        // refreshControl={
        //   <RefreshControl onRefresh={() => {}} tintColor="#000" />
        // }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffset } } }],
          { useNativeDriver: true }
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default CabinetScreen;
