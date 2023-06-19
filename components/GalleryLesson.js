import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("screen");

const App = () => {
  const [images, setImages] = useState([
    {
      src: "https://cdn.hswstatic.com/gif/why-is-sky-blue.jpg",
      name: "sky",
      key: 1,
    },
    {
      src: "https://images.nationalgeographic.org/image/upload/v1638892272/EducationHub/photos/hoh-river-valley.jpg",
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
  ]);

  const renderItem = ({ item }) => {
    return (
      //   <TouchableOpacity>
      <Image source={{ uri: item.src }} style={{ width, height }} />
      //   </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={images}
        renderItem={renderItem}
        horizontal={true}
        pagingEnabled={true}
        bounces={false}
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ width, height }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  //   image: {
  //   },
});

export default App;