import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View
} from "react-native";

const ListHeaderComponent = ({
  isCategoriesLoaded,
  categories,
  setCurrentCategory
}) => {
  return (
    <View
      style={{
        padding: 24,
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

export default ListHeaderComponent;
