import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";
import { auth } from "../firebaseConfig";
import { updateProfile, updateEmail } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import essentialstyles from "../styles";
import UserContext from "../context/UserContext";
import HeaderPart from "../components/HeaderPart";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Для обновления пароля можете сделать дополнительное поле, если нужно
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const user = useContext(UserContext);

  const handleUpdateProfile = async () => {
    try {

      if (username) {
        await updateProfile(auth.currentUser, {
          displayName: username,
        });
      }

      if (email) {
        await updateEmail(auth.currentUser, email);
      }

      setMessage("Profile data successfully updated!");
    } catch (error) {
      setMessage(`Error during data update: ${error.message}`);
    }
  };

  return (
    <SafeAreaView>
      <View style={essentialstyles.container}>
        <HeaderPart userName={user.displayName} />
        {user && (
          <View style={styles.container}>
            <Image
              source={
                user.photoURL
                  ? { uri: user.photoURL }
                  : require("../assets/data/images/noimg.png")
              }
              style={styles.avatar}
            />
            <Text style={styles.username}>
              {user.displayName || "Пользователь"}
            </Text>
          </View>
        )}

        <View style={styles.formContainer}>
          {[
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
              index
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
            )
          )}
          <Pressable
            style={essentialstyles.pressMeBtn}
            onPress={handleUpdateProfile}
          >
            <Text style={essentialstyles.pressMeText}>Update profile</Text>
          </Pressable>
        </View>

        {message ? <Text>{message}</Text> : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
    backgroundColor: "#fff",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    fontSize: 24,
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#74C1FC",
  },
  formContainer: {
    width: "100%",
    marginTop: 20,
    gap: 10,
  },
});

export default ProfileScreen;
