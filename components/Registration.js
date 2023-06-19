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
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Switch,
} from "react-native";

export default function Registration() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const useFirebase = false;

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  const onButtonPress = () => {
    setIsLoggingIn(true);
    if (useFirebase) {
    } else {
      setTimeout(() => {
        if (userEmail == " " && userPassword == " ") {
          setIsLoggedIn(true);
        }
        setIsLoggingIn(false);
      }, 1500);
    }
    // alert("Hello");
    // Alert.alert("Error");
    // Alert.alert("Error", "Ты допустил ошибку", [
    //   {
    //     text: "Yes",
    //     // onPress: ,
    //   },
    //   {
    //     text: "No",
    //     // onPress: ,
    //   },
    // ]);
  };

  return (
    <View style={styles.app} onPress={Keyboard.dismiss}>
      <ImageBackground
        style={styles.main_background}
        source={{
          uri: "https://phonoteka.org/uploads/posts/2022-02/1643998266_1-phonoteka-org-p-fon-dlya-prezentatsii-nebo-s-oblakami-1.jpg",
        }}
      >
        {/* <SafeAreaView style={styles.safeArea}> */}
          <TouchableOpacity onPress={() => setIsLoggedIn(false)}>
            <Image
              style={styles.main_image}
              source={{
                uri: "https://img.icons8.com/?size=512&id=108639&format=png",
              }}
            />
          </TouchableOpacity>
          <Text style={styles.main_text}>Hello React Native</Text>
          {isLoggedIn ? (
            <View>
              <Text>Hello user</Text>
            </View>
          ) : (
            <View style={{ alignItems: "center" }}>
              <View style={styles.inputs_wrap}>
                <TextInput
                  style={styles.user_email}
                  placeholder="user@mail.com"
                  placeholderTextColor="#aaa"
                  inputMode="email"
                  value={userEmail}
                  onChangeText={setUserEmail}
                />
                <TextInput
                  style={styles.user_password}
                  placeholder="password"
                  placeholderTextColor="#aaa"
                  secureTextEntry={true}
                  value={userPassword}
                  onChangeText={setUserPassword}
                />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                  <Text style={{ paddingLeft: 6, fontSize: 18 }}>
                    Remember me
                  </Text>
                </View>
              </View>
              {isLoggingIn ? (
                <ActivityIndicator size="small" color="#F29325" />
              ) : (
                <TouchableOpacity onPress={onButtonPress}>
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
              )}
            </View>
          )}
        {/* </SafeAreaView> */}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    height: "100%",
  },
//   safeArea: {
//     flex: 1,
//   },
  main_background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  main_image: {
    height: 248,
    width: 248,
  },
  main_text: {
    fontSize: 48,
    textAlign: "center",
  },
  inputs_wrap: {
    padding: 12,
    width: 450,
    alignItems: "center",
  },
  user_email: {
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: "white",
    color: "#333",
    width: "75%",
    marginBottom: 12,
  },
  user_password: {
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: "white",
    color: "#333",
    width: "75%",
    marginBottom: 12,
  },
});
