import React, { useState, useContext, useEffect } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import essentialstyles from "../styles";
import HeaderPart from "../components/HeaderPart";
import MyPetsInProfile from "../components/MyPetsInProfile";
import { supabase } from "../supabase";
import { useNavigation } from "@react-navigation/native";
import { useAllPetsStore } from "../stores/AllPetsStore";

const ProfileScreen = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const navigation = useNavigation();
  // const useremail = session?.user.id;
  const fetchMyPets = useAllPetsStore((state) => state.fetchMyPets);

  const mypets = useAllPetsStore((state) => state.mypets);

  useEffect(() => {
    fetchMyPets();
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={essentialstyles.container}>
          <HeaderPart />
          <View style={styles.topContainer}>
            <Image
              source={require("../assets/data/images/noimg.png")}
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
    gap: 5,
    backgroundColor: "#fff",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
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
  petListBlock: {
    flex: 1,
  },
  logoutBtn: {
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: "#FF5844",
    borderColor: "#FF5844",
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
