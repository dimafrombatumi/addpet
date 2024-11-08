import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import MyPetsInProfile from "../components/MyPetsInProfile";

import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../supabase";
import { useNavigation } from "@react-navigation/native";
import { useAllPetsStore } from "../stores/AllPetsStore";
import essentialstyles from "../styles";
import { COLORS, FONT_SIZES, SPACING, RADIUS } from "../constants/constants";

const ProfileScreen = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const navigation = useNavigation();
  const fetchMyPets = useAllPetsStore((state) => state.fetchMyPets);

  const mypets = useAllPetsStore((state) => state.mypets);

  useEffect(() => {
    fetchMyPets();
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={essentialstyles.container}>
          <View style={styles.topContainer}>
            <Image
              source={require("../assets/data/images/ava.jpg")}
              style={styles.avatar}
            />
            <Text style={styles.username}>Пользователь</Text>
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={() => {
                supabase.auth.signOut();
                navigation.navigate("LoginScreen");
              }}
            >
              <Text style={styles.logoutBtnTxt} logoutBtnTxt>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
          <MyPetsInProfile mypets={mypets} />

          <View style={styles.formContainer}>
            <Text style={essentialstyles.h2}>Edit your info</Text>

            {[
              {
                icon: "person-outline",
                placeholder: "Enter new user name",
                value: username,
                setter: setUsername,
                secure: false,
              },
              {
                icon: "call-outline",
                placeholder: "Enter new phone number",
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
            <Pressable style={essentialstyles.pressMeBtn}>
              <Text style={essentialstyles.pressMeText}>Update profile</Text>
            </Pressable>
          </View>

          {message ? <Text>{message}</Text> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    padding: SPACING.sm,
    borderRadius: RADIUS.default,
    backgroundColor: COLORS.white,
    flex: 1,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  username: {
    fontSize: FONT_SIZES.large,
    marginBottom: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  formContainer: {
    padding: SPACING.sm,
    borderRadius: RADIUS.default,
    backgroundColor: COLORS.white,
    flex: 1,
    gap: 10,
  },
  petListBlock: {
    flex: 1,
  },
  logoutBtn: {
    width: "25%",
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#FF5844",
    borderColor: "#FF5844",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutBtnTxt: {
    fontSize: 18,
    color: "#FFF",
    paddingHorizontal: 10,
    paddingVertical: 5,

    borderRadius: 15,
  },
});

export default ProfileScreen;
