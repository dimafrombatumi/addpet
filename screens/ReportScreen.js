import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
  Alert,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { Ionicons } from "@expo/vector-icons";

import essentialstyles from "../styles";
import HeaderPart from "../components/HeaderPart";


const ReportScreen = ({ route }) => {
  const lostpet = route.params?.lostpet;
  const [image, setImage] = useState(null);
  const [petId, setPetId] = useState(lostpet?.petid);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <SafeAreaView>
      <ScrollView>
      <View style={essentialstyles.container}>
      <HeaderPart />

        <View style={styles.imageContainer}>
          {image && (
            <Pressable onPress={pickImage}>
              <Image source={{ uri: image }} style={styles.petImage} />
            </Pressable>
          )}
          {!image && (
            <Pressable onPress={pickImage}>
              <Image
                source={require("../assets/data/images/noimg.png")}
                style={styles.petImage}
              />
            </Pressable>
          )}
        </View>
        <Button title="Pick an image from camera roll" onPress={pickImage} />

        <View style={styles.formContainer}>
          <View style={styles.inputBar}>
            <Ionicons name="qr-code-outline" size={32} color="#5b5b5b" />
            {lostpet ? (
              <TextInput
                onChange={setPetId}
                value={petId}
                style={styles.input}
                placeholder="Enter pets microchip number"
                keyboardType="numeric"
              />
            ) : (
              <TextInput
                onChange={setPetId}
                value={petId}
                style={styles.input}
                placeholder="Enter pets microchip number"
                keyboardType="numeric"
              />
            )}
          </View>
          <View style={styles.inputBar}>
            <Ionicons name="location-outline" size={32} color="#5b5b5b" />
            <TextInput style={styles.input} placeholder="Enter your location" />
          </View>
          <View style={styles.inputBar}>
            <Ionicons name="phone-portrait-outline" size={32} color="#5b5b5b" />
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              keyboardType="tel"
            />
          </View>
          <View style={styles.inputBar}>
            <Ionicons
              name="information-circle-outline"
              size={32}
              color="#5b5b5b"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter other important information here"
              keyboardType="text"
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              Alert.alert("Sent");
            }}
            style={styles.pressMeBtn}
          >
            <Text style={styles.pressMeText}>Send report</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    gap: 15,
  },

  inputBar: {
    gap: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    paddingLeft: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  input: {
    flex: 1,
    fontSize: 20,
    height: 40,
  },
  pressMeBtn: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#E8EBF1",
    borderRadius: 10,
    borderColor: "1.5px solid rgba(80, 134, 231, 0.5)",
    borderWidth: 3,
    flexDirection: "row-reverse",
  },
  pressMeText: {
    color: "#01222A",
  },
  imageContainer: {
    height: 360,
  },
  petImage: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
});

export default ReportScreen;
