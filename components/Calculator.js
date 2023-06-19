import React, { useState } from "react";
import {
  Alert,
  Button,
  ActivityIndicator,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  Switch,
} from "react-native";

export default function Calculator () {
  const [inputAlgorithm, setInputAlgorithm] = useState("");

  const getAction = () => {
    if (!inputAlgorithm) return "nooo";
    alert(eval(inputAlgorithm));
  };
  return (
    <View style={styles.calculator}>
      <TextInput
        style={styles.input}
        value={inputAlgorithm}
        onChangeText={setInputAlgorithm}
      />
      <TouchableOpacity onPress={getAction}>
        <View
          style={{
            borderRadius: 6,
            backgroundColor: "#F29325",
            paddingVertical: 12,
            paddingHorizontal: 18,
          }}
        >
          <Text>Log In</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  calculator: {
    // flex: 1,
  },
  input: {
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: "#6495ED",
    color: "white",
    width: "75%",
  },
});
