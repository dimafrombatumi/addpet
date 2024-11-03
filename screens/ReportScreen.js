import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { supabase } from "../supabase";
import { decode } from "base64-arraybuffer";
import { randomUUID } from "expo-crypto";
import { useNavigation } from "@react-navigation/native";

import HeaderPart from "../components/HeaderPart";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Ionicons } from "@expo/vector-icons";
import essentialstyles from "../styles";

const ReportScreen = () => {
  const [petId, setPetId] = useState("");
  const [petType, setPetType] = useState("");
  const [petSex, setPetSex] = useState("");
  const [petLocation, setPetLocation] = useState("");
  const [petOwnerphone, setPetOwnerphone] = useState("");
  const [petImageurl, setPetImageurl] = useState("");
  const [petDescription, setPetDescription] = useState("");
  const [image, setImage] = useState(null);
  const [ownerEmail, setOwnerEmail] = useState(null);

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

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
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";

    const { data, error } = await supabase.storage
      .from("assets")
      .upload(filePath, decode(base64), { contentType });

    console.log(error);

    if (data) {
      setPetImageurl(data.path);
      return data.path;
    }
  };

  const addNewPet = async () => {
    const ImagePath = await uploadImage();
    const { data, error } = await supabase
      .from("lost_pets") // укажите свою таблицу
      .insert([
        {
          petid: petId,
          pettype: petType,
          petlocation: petLocation,
          owner_phone: petOwnerphone,
          petimgurl: ImagePath,
          petdescription: petDescription,
          owner_email: ownerEmail,
        },
      ]);

    if (error) {
      console.log("Ошибка при вставке:", error.message);
    } else {
      console.log("Данные добавлены:", data);
      navigation.navigate("HomeScreen");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={essentialstyles.container}>
          <HeaderPart userName="USER" />

          <View style={styles.imageContainer}>
            {image && (
              <Pressable onPress={() => pickImage(setImage, setLoading)}>
                <Image source={{ uri: image }} style={styles.petImage} />
              </Pressable>
            )}
            {!image && (
              <Pressable onPress={() => pickImage(petId)}>
                <Image
                  source={require("../assets/data/images/noimg.png")}
                  style={styles.petImage}
                />
              </Pressable>
            )}
          </View>
          <Button
            title="Pick an image from camera roll"
            onPress={() => pickImage(petId)}
          />

          {loading && <ActivityIndicator size="large" color="#0000ff" />}

          <View style={styles.formContainer}>
            <View style={styles.selectComponent}>
              <Text style={styles.fieldlabel}>Pet type</Text>
              <View style={styles.selectItemWrap}>
                <Pressable
                  onPress={() => setPetType("Cat")}
                  style={[
                    styles.selectItem,
                    {
                      backgroundColor: petType === "Cat" ? "#C9E9D2" : "white",
                    },
                  ]}
                >
                  <Text style={styles.selectItemText}>🐈‍⬛ Cat</Text>
                </Pressable>
                <Pressable
                  onPress={() => setPetType("Dog")}
                  style={[
                    styles.selectItem,
                    {
                      backgroundColor: petType === "Dog" ? "#C9E9D2" : "white",
                    },
                  ]}
                >
                  <Text style={styles.selectItemText}>🐕 Dog</Text>
                </Pressable>
              </View>
            </View>
            <View style={essentialstyles.inputBar}>
              <Ionicons
                style={essentialstyles.iconInput}
                name="qr-code-outline"
                size={32}
              />
              <TextInput
                onChangeText={setPetId}
                value={petId}
                style={essentialstyles.input}
                placeholder="Enter pet microchip number"
                keyboardType="default"
              />
            </View>

            <View style={styles.selectComponent}>
              <Text style={styles.fieldlabel}>Pet sex</Text>
              <View style={styles.selectItemWrap}>
                <Pressable
                  onPress={() => setPetSex("Female")}
                  style={[
                    styles.selectItem,
                    {
                      backgroundColor:
                        petSex === "Female" ? "#C9E9D2" : "white",
                    },
                  ]}
                >
                  <Text style={styles.selectItemText}>
                    <Text style={{ fontSize: 26 }}>♀️ </Text>Female
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setPetSex("Male")}
                  style={[
                    styles.selectItem,
                    {
                      backgroundColor: petSex === "Male" ? "#C9E9D2" : "white",
                    },
                  ]}
                >
                  <Text style={styles.selectItemText}>
                    <Text style={{ fontSize: 26 }}>♂️ </Text>Male
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={essentialstyles.inputBar}>
              <Ionicons
                style={essentialstyles.iconInput}
                name="location-outline"
                size={32}
              />
              <TextInput
                onChangeText={setPetLocation}
                value={petLocation}
                style={essentialstyles.input}
                placeholder="Enter pet location City"
                keyboardType="default"
              />
            </View>
            <View style={essentialstyles.inputBar}>
              <Ionicons
                style={essentialstyles.iconInput}
                name="phone-portrait-outline"
                size={32}
              />
              <TextInput
                onChangeText={setPetOwnerphone}
                value={petOwnerphone}
                style={essentialstyles.input}
                placeholder="Enter pet owner phone number"
                keyboardType="phone-pad"
              />
            </View>
            <View style={essentialstyles.inputBar}>
              <Ionicons
                style={essentialstyles.iconInput}
                name="mail-outline"
                size={32}
              />
              <TextInput
                onChangeText={setOwnerEmail}
                value={ownerEmail}
                style={essentialstyles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
            </View>

            <View style={essentialstyles.inputBar}>
              <Ionicons
                style={essentialstyles.iconInput}
                name="information-circle-outline"
                size={32}
              />
              <TextInput
                onChangeText={setPetDescription}
                value={petDescription}
                style={[essentialstyles.input, { height: 60 }]}
                placeholder="Enter other important information here"
                multiline={true}
              />
            </View>
            <TouchableOpacity onPress={addNewPet} style={styles.pressMeBtn}>
              <Text style={styles.pressMeText}>Send report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  selectComponent: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
  },

  selectItemWrap: { flexDirection: "row", gap: 10 },

  selectItem: {
    flex: 1,
    flexDirection: "row",
    fontWeight: "700",
    height: 48,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#C9E9D2",
    justifyContent: "center",
    alignItems: "center",
  },

  selectItemText: {
    fontSize: 20,
  },

  fieldlabel: {
    fontSize: 19,
  },

  formContainer: {
    flex: 1,
    gap: 17,
  },
  pressMeBtn: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#E8EBF1",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "rgba(80, 134, 231, 0.5)",
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
