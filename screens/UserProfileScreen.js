import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { randomUUID } from "expo-crypto";
import { Button, Platform } from "react-native";

import MyPetsInProfile from "../components/MyPetsInProfile";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAllPetsStore } from "../stores/AllPetsStore";
import essentialstyles from "../styles";
import { COLORS, FONT_SIZES, SPACING, RADIUS } from "../constants/constants";
import UserContext from "../context/UserContext";
import Avatar from "../components/Avatar";
import { supabase } from "../supabase";

const ProfileScreen = () => {
  const session = useContext(UserContext);

  const [avatar, setAvatar] = useState(""); // Хранит URI аватара
  const [uploading, setUploading] = useState(false);
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  const navigation = useNavigation();

  const fetchMyPets = useAllPetsStore((state) => state.fetchMyPets);
  const fetchUserData = useAllPetsStore((state) => state.fetchUserData);
  const mypets = useAllPetsStore((state) => state.mypets);
  const user = useAllPetsStore((state) => state.user);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image?.startsWith("file://")) return null;
    try {
      setUploading(true);
      const base64 = await FileSystem.readAsStringAsync(image, {
        encoding: "base64",
      });
      const filePath = `${randomUUID()}.png`;

      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(filePath, decode(base64), { contentType: "image/png" });

      if (error) throw error;
      return data.path;
    } catch (error) {
      Alert.alert("Ошибка загрузки", error.message);
    } finally {
      setUploading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("Пользователь не найден!");

      const avatarUrl = await uploadImage();

      const updates = {
        id: session.user.id,
        username,
        website,
        avatar_url: avatarUrl || user.avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;

      Alert.alert("Profile updated!");
    } catch (error) {
      Alert.alert("Error while updating", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPets();
    fetchUserData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={essentialstyles.container}>
          <View style={styles.topContainer}>
            <View>
              {user.avatar_url && (
                <Avatar
                  uploadLocal={image}
                  avatarImg={user.avatar_url}
                  style={styles.avatar}
                />
              )}
              <Button
                title={uploading ? "Uploading..." : "Change Avatar"}
                onPress={pickImage}
                disabled={uploading}
              />
            </View>
            <Text style={styles.username}>{user.username}</Text>
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

            {/* <Button
              title="Press to schedule a notification"
              onPress={async () => {
                await schedulePushNotification();
              }}
            /> */}
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
              {
                icon: "call-outline",
                placeholder: "Website",
                value: website,
                setter: setWebsite,
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
              onPress={() => updateProfile(username, website, avatar)}
              style={essentialstyles.pressMeBtn}
            >
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
