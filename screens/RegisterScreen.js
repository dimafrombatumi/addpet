import React, { useState } from "react";
import { supabase } from "../supabase";

import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import essentialstyles from "../styles";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatarUri, setAvatarUri] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePickAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarUri(result.uri);
    }
  };

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.topImage}>
        <Image
          source={require("../assets/data/images/loginbg.jpg")}
          style={styles.loginBgimg}
        />
        <Image
          source={require("../assets/data/images/templogo.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.topContainer}>
        <Text style={essentialstyles.h1}>Register</Text>
        <Text style={essentialstyles.text}>
          Please create account by filling fields
        </Text>
      </View>
      {message ? <Text>{message}</Text> : null}
      <View style={styles.formContainer}>
        {[
          {
            icon: "mail-outline",
            placeholder: "Enter Email",
            value: email,
            setter: setEmail,
            keyboardType: "email-address",
            secure: false,
          },
          {
            icon: "key-outline",
            placeholder: "Enter password",
            value: password,
            setter: setPassword,
            secure: true,
          },
          {
            icon: "person-outline",
            placeholder: "Enter user name",
            value: username,
            setter: setUsername,
            secure: false,
          },
          {
            icon: "call-outline",
            placeholder: "Enter phone number",
            value: phoneNumber,
            setter: setPhoneNumber,
            keyboardType: "phone-pad",
            secure: false,
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
          onPress={signUpWithEmail}
        >
          <Text style={styles.pressMeText}>Create User</Text>
        </TouchableOpacity>
        <Text style={essentialstyles.text}>
          Have account?{" "}
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={essentialstyles.text}>Sign In</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 15,
    height: "100%",
    backgroundColor: "#fff",
  },

  topContainer: {
    marginTop: -120,
  },

  topImage: {
    flex: 1,
  },

  loginBgimg: {
    height: 290,
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
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 16,
  },

  formContainer: {
    flex: 1,
    gap: 15,
  },
});

export default RegisterScreen;
