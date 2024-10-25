import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { usePetActions } from "../hooks/usePetActions";
import { Ionicons } from "@expo/vector-icons";

import HeaderPart from "../components/HeaderPart";

import essentialstyles from "../styles";

const ReportScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [foundPetId, setFoundPetId] = useState("");
  const [foundDescription, setFoundDescription] = useState("");
  const [foundPhone, setFoundPhone] = useState("");
  const [foundLocation, setFoundLocation] = useState("");
  const [foundImg, setFoundImg] = useState("");
  const [loading, setLoading] = useState(false);
  const { reportPet, pickImage } = usePetActions();

  const handleReportPet = () => {
    const foundPetDetails = {
      petid: foundPetId,
      founddescription: foundDescription,
      foundphone: foundPhone,
      foundlocation: foundLocation,
      created_at: new Date().toISOString(),
      foundimg: foundImg,
    };
    console.log("Found Pet Details to send:", foundPetDetails);

    reportPet(foundPetDetails, setLoading);
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
          <Button
            title="Pick an image from camera roll"
            onPress={() => pickImage(setImage, setLoading, setFoundImg)}
          />

          <View style={styles.formContainer}>
            <View style={styles.inputBar}>
              <Ionicons name="qr-code-outline" size={32} color="#5b5b5b" />
              <TextInput
                onChangeText={setFoundPetId}
                value={foundPetId}
                style={styles.input}
                placeholder="Enter pets microchip number"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputBar}>
              <Ionicons name="location-outline" size={32} color="#5b5b5b" />
              <TextInput
                onChangeText={setFoundLocation}
                value={foundLocation}
                style={styles.input}
                placeholder="Enter your location"
              />
            </View>
            <View style={styles.inputBar}>
              <Ionicons
                name="phone-portrait-outline"
                size={32}
                color="#5b5b5b"
              />
              <TextInput
                onChangeText={setFoundPhone}
                value={foundPhone}
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
                onChangeText={setFoundDescription}
                value={foundDescription}
                style={styles.input}
                placeholder="Enter other important information here"
                keyboardType="text"
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                handleReportPet();
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
