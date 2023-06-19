import React, { useState, useContext } from "react";
import AppContext from "../components/AppContext";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  ImageBackground,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

//export default function App() {
const LoginScreen = ({ navigation }) => {
  const $ = useContext(AppContext);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const useFirebase = true;

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((prev) => !prev);

  const onButtonPress = () => {
    setIsLoggingIn(true);
    if (useFirebase) {
      fetch("https://randomuser.me/api/")
        .then((response) => response.json())
        .then((result) => {
          let user = result.results[0];
          const rand = Math.floor(Math.random() * 20) + 1;
          let imageArr = [];
          for (let i = 0; i < rand; i++) {
            let id = imageArr.length + 1;
            let src = "https://picsum.photos/200/300";
            imageArr.push({ id, src });
          }
          fakeUser = { ...user, userPhotos: imageArr, userPhotosCount: rand };
          $.setUser(fakeUser);
          navigation.navigate("cabinet");
          setIsLoggingIn(false);
        });
    } else {
      setTimeout(() => {
        // url: 'https://randomuser.me/api/',
        // dataType: 'json',
        // success: function(data) {
        //     console.log(data);
        // }
        //$.setUser()

        if (userEmail == " " && userPassword == " ") {
          setIsLoggedIn(true);
          navigation.navigate("cabinet");
        }
        setIsLoggingIn(false);
      }, 1500);
    }

    // alert("Hello");
    // Alert.alert("Error");
  };

  return (
    <View style={styles.app}>
      <ImageBackground
        style={[styles.main_background, { height: windowHeight / 1 }]}
        source={{
          uri: "https://phonoteka.org/uploads/posts/2022-02/1643998266_1-phonoteka-org-p-fon-dlya-prezentatsii-nebo-s-oblakami-1.jpg",
        }}
      >
        {/* <ScrollView contentContainerStyle={styles.app}>           */}
        <Image
          style={styles.main_image}
          source={{
            uri: "https://img.icons8.com/?size=512&id=108639&format=png",
          }}
        />
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
                style={styles.user_pasword}
                placeholder="password"
                placeholderTextColor="#aaa"
                secureTextEntry={true}
                value={userPassword}
                onChangeText={setUserPassword}
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isEnabled ? "#F29325" : "#f4f3f4"}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
                <Text style={{ paddingLeft: 6, fontSize: 18 }}>
                  Запомнить меня
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
        <View style={{ height: 160, width: "100%" }}></View>
        {/* </ScrollView> */}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    //flex: 1
  },
  main_background: {
    //flex: 1,
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
    // flexDirection: "row"
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
  user_pasword: {
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: "white",
    color: "#333",
    width: "75%",
    marginBottom: 12,
  },
});

export default LoginScreen;
