import React from "react";
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  FlatList,
  Text,
  View
} from "react-native";

const { width, height } = Dimensions.get("screen");

const SliderItem = ({ item, index, scrollX }) => {
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
    outputRange: ["0deg", "0deg", "0deg", "-0deg"]
  });

  const rotationY = scrollX.interpolate({
    inputRange,
    outputRange: ["0deg", "0deg", "0deg", "-0deg"]
  });

  const rotationZ = scrollX.interpolate({
    inputRange,
    outputRange: ["0deg", "0deg", "0deg", "-0deg"]
  });

  const skewX = scrollX.interpolate({
    inputRange,
    outputRange: ["0deg", "0deg", "0deg", "0deg"]
  });

  const skewY = scrollX.interpolate({
    inputRange,
    outputRange: ["0deg", "0deg", "0deg", "0deg"]
  });

  return (
    <View style={{ width, height }}>
      <Animated.View
        style={{
          flex: 1,
          transform: [
            { scale },
            { rotateX: rotationX },
            { rotateY: rotationY },
            { rotateZ: rotationZ },
            { translateX: translateX },
            { translateY: translateY },
            { skewX },
            { skewY }
          ]
        }}
      >
        <ImageBackground
          source={{ uri: item.background_image }}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={{ uri: item.main_image }}
            style={{ height: 240, width: 240 }}
          />
          <Text style={{ fontSize: 24, fontWeight: "700" }}>{item.title}</Text>
          <Text style={{ fontSIze: 18, marginTop: 18 }}>
            {item.description}
          </Text>
        </ImageBackground>
      </Animated.View>
    </View>
  );
};

export default SliderItem;
