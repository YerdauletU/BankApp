import React, { useState, useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  FlatList,
  Text,
  View
} from "react-native";
import LessonGallerySlider from "./LessonGallerySlider";

const { width, height } = Dimensions.get("screen");

const App = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);

  const slides = [
    {
      id: 1,
      background_image:
        "https://natworld.info/wp-content/uploads/2016/08/Rassvet-skvoz-gustuyu-stenu-lesnyh-derevev.jpg",
      main_image: "",
      title: "",
      description: ""
    },
    {
      id: 2,
      background_image:
        "https://gamerwall.pro/uploads/posts/2022-03/1648710748_1-gamerwall-pro-p-fon-na-temu-priroda-krasivie-1.jpg",
      main_image: "",
      title: "",
      description: ""
    },
    {
      id: 3,
      background_image:
        "https://img.freepik.com/free-photo/mountains-lake_1398-1150.jpg",
      main_image: "",
      title: "",
      description: ""
    },
    {
      id: 4,
      background_image:
        "https://i0.wp.com/5sfer.com/wp-content/uploads/2015/08/8ipwnn.jpg",
      main_image: "",
      title: "",
      description: ""
    },
    {
      id: 5,
      background_image:
        "https://www.advantour.com/img/armenia/armenia-nature.jpg",
      main_image: "",
      title: "",
      description: ""
    }
  ];

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    //console.log(viewableItems);
    //setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 60 }).current;

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        data={slides}
        renderItem={({ item, index }) => (
          <LessonGallerySlider item={item} index={index} scrollX={scrollX}></LessonGallerySlider>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ width, height }}
        horizontal={true}
        pagingEnabled={true}
        bounces={false}
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />
    </View>
  );
};

export default App;
