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

const EditPetScreen = ({ route }) => {
  const { item } = route.params;

  const petId = item.petid;
  console.log(petId);
  const [petName, setPetName] = useState(item.petname || "");
  const [petType, setPetType] = useState(item.pettype || "");
  const [petSex, setPetSex] = useState(item.petsex || "");
  const [petAge, setPetAge] = useState(item.petage || "");
  const [petLocation, setPetLocation] = useState(item.petlocation || "");
  const [petOwnerphone, setPetOwnerphone] = useState(item.owner_phone || "");
  const [petImageurl, setPetImageurl] = useState(item.petimgurl || "");
  const [petColor, setPetColor] = useState(item.petcolor || "");
  const [petWeight, setPetWeight] = useState(item.petweight || "");
  const [petBreed, setPetBreed] = useState(item.petbreed || "");
  const [petDescription, setPetDescription] = useState(
    item.petdescription || ""
  );
  const [ownerEmail, setOwnerEmail] = useState(item.owner_email || "");

  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
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

  const editPet = async ({ item }) => {
    const ImagePath = await uploadImage();
    const { data, error } = await supabase
      .from("all_pets") // укажите свою таблицу
      .update([
        {
          petname: petName,
          pettype: petType,
          petsex: petSex,
          petage: petAge,
          petlocation: petLocation,
          owner_phone: petOwnerphone,
          petimgurl: ImagePath,
          petcolor: petColor,
          petweight: petWeight,
          petbreed: petBreed,
          petdescription: petDescription,
          owner_email: ownerEmail,
        },
      ])
      .eq("petid", petId)
      .single();

    if (error) {
      console.log("Ошибка при изменении:", error.message);
    } else {
      console.log("Данные изменены:", data);
      navigation.navigate("UserProfileScreen");
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
            onPress={() => pickImage(item.petid)}
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
            {/* <View style={essentialstyles.inputBar}>
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
            </View> */}
            <View style={essentialstyles.inputBar}>
              <Ionicons
                style={essentialstyles.iconInput}
                name="text-outline"
                size={32}
              />
              <TextInput
                onChangeText={setPetName}
                value={item.petName}
                style={essentialstyles.input}
                placeholder={petName}
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
                name="calendar-outline"
                size={32}
              />
              <TextInput
                onChangeText={setPetAge}
                value={petAge}
                style={essentialstyles.input}
                placeholder="Enter pet age in months"
                keyboardType="default"
              />
            </View>
            <View style={essentialstyles.inputBar}>
              <Ionicons
                style={essentialstyles.iconInput}
                name="color-palette-outline"
                size={32}
              />
              <TextInput
                onChangeText={setPetColor}
                value={petColor}
                style={essentialstyles.input}
                placeholder="Enter pet color"
                keyboardType="default"
              />
            </View>
            <View style={essentialstyles.inputBar}>
              <Ionicons
                style={essentialstyles.iconInput}
                name="scale-outline"
                size={32}
              />
              <TextInput
                onChangeText={setPetWeight}
                value={petWeight}
                style={essentialstyles.input}
                placeholder="Enter pet weight"
                keyboardType="default"
              />
            </View>
            <View style={essentialstyles.inputBar}>
              <Ionicons
                style={essentialstyles.iconInput}
                name="ribbon-outline"
                size={32}
              />
              <TextInput
                onChangeText={setPetBreed}
                value={petBreed}
                style={essentialstyles.input}
                placeholder="Enter pet breed"
                keyboardType="default"
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
            <TouchableOpacity
              onPress={() => editPet(item)}
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
    borderRadius: 10,
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

export default EditPetScreen;
