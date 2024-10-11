// LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import essentialstyles from "../styles";
import { auth } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("HomeScreen");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topImage}>
        <Image
          source={require("../assets/data/images/loginbg.jpg")}
          style={styles.loginBgimg}
        />
        <View style={styles}></View>
        <Image
          source={require("../assets/data/images/templogo.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.topContainer}>
        <Text style={essentialstyles.h1}>Login</Text>
        <Text style={essentialstyles.text}>Please sign in to continue</Text>
      </View>
      {message ? <Text>{message}</Text> : null}
      <View style={styles.formContainer}>
        {[
          {
            icon: "person-circle-outline",
            placeholder: "Enter user name",
            value: email,
            setter: setEmail,
            keyboardType: "text",
            secure: false,
          },
          {
            icon: "finger-print-outline",
            placeholder: "Enter password",
            value: password,
            setter: setPassword,
            secure: true,
          },
        ].map(
          (
            { icon, placeholder, value, setter, keyboardType, secure },
            index,
          ) => (
            <View key={index} style={essentialstyles.inputBar}>
              <Ionicons
                style={essentialstyles.iconInput}
                name={icon}
                size={32}
              />
              <TextInput
                onChangeText={setter}
                value={value}
                style={essentialstyles.input}
                placeholder={placeholder}
                keyboardType={keyboardType || "default"}
                secureTextEntry={secure}
              />
            </View>
          ),
        )}
        <TouchableOpacity
          style={essentialstyles.pressMeBtn}
          onPress={handleSignIn}
        >
          <Text style={styles.pressMeText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={essentialstyles.text}>
          Don't have an account?{" "}
          <TouchableOpacity
            onPress={function () {
              navigation.navigate("RegisterScreen");
            }}
          >
            <Text style={essentialstyles.text}>Sign Up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
    padding: 15,
    height: "100%",
    backgroundColor: "#fff",
  },
  topContainer: {
    marginTop: 60,
  },
  formContainer: {
    flex: 1,
    gap: 20,
  },
  topImage: {
    flex: 1,
  },
  loginBgimg: {
    height: 400,
    objectFit: "cover",
    width: "100%",
    borderRadius: 40,
    border: 1,
  },

  logo: {
    height: 100,
    width: 100,
    top: -57,
    alignSelf: "center",
    borderRadius: 10,
  },
  logoBlock: {
    backgroundColor: "#fff",
    padding: 30,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
  },
});

export default LoginScreen;
