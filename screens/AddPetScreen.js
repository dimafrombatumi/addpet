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
import React, { useContext, useState } from "react";
import essentialstyles from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { usePetActions } from "../hooks/usePetActions";
import UserContext from "../context/UserContext";
import HeaderPart from "../components/HeaderPart";


const AddPetScreen = () => {
  const [petId, setPetId] = useState("");
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [petSex, setPetSex] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petLocation, setPetLocation] = useState("");
  const [petOwnerphone, setPetOwnerphone] = useState("");
  const [petImageurl, setPetImageurl] = useState("");
  const [petColor, setPetColor] = useState("");
  const [petWeight, setPetWeight] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petDescription, setPetDescription] = useState("");
  const [image, setImage] = useState(null);
  const [ownerId, setOwnerId] = useState(null);
  const [ownerEmail, setOwnerEmail] = useState(null);

  const [loading, setLoading] = useState(false);

  const { pickImage, addPet } = usePetActions();

  const user = useContext(UserContext);
  const uid = user.uid;
  const handleAddPet = () => {
    const petDetails = {
      uid: user.uid,
      petid: petId,
      pettype: petType,
      petname: petName,
      petsex: petSex,
      petage: petAge,
      petcolor: petColor,
      petweight: petWeight,
      petimageurl: petImageurl,
      petlocation: petLocation,
      petownerphone: petOwnerphone,
      petdescription: petDescription,
      petbreed: petBreed,
      created_at: new Date().toISOString(),
      owner_email: ownerEmail,
      owner_id: uid,
    };
    addPet(petDetails, setLoading);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={essentialstyles.container}>
        <HeaderPart userName={user.displayName}/>

          <View style={styles.imageContainer}>
            {image && (
              <Pressable
                onPress={() =>
                  pickImage(setImage, setLoading, setPetImageurl, petId)
                }
              >
                <Image source={{ uri: image }} style={styles.petImage} />
              </Pressable>
            )}
            {!image && (
              <Pressable
                onPress={() => pickImage(setImage, setLoading, setPetImageurl)}
              >
                <Image
                  source={require("../assets/data/images/noimg.png")}
                  style={styles.petImage}
                />
              </Pressable>
            )}
          </View>
          <Button
            title="Pick an image from camera roll"
            onPress={() => pickImage(setImage, setLoading, setPetImageurl)}
          />

          {loading && <ActivityIndicator size="large" color="#0000ff" />}

          <View style={styles.formContainer}>
            {[
              {
                icon: "qr-code-outline",
                placeholder: "Enter pets microchip number",
                value: petId,
                setter: setPetId,
                keyboardType: "numeric",
              },
              {
                icon: "text-outline",
                placeholder: "Enter pet name",
                value: petName,
                setter: setPetName,
              },
              {
                icon: "paw-outline",
                placeholder: "Enter pet type",
                value: petType,
                setter: setPetType,
              },
              {
                icon: "male-female-outline",
                placeholder: "Enter pet sex",
                value: petSex,
                setter: setPetSex,
              },
              {
                icon: "location-outline",
                placeholder: "Enter pet location (city)",
                value: petLocation,
                setter: setPetLocation,
              },
              {
                icon: "phone-portrait-outline",
                placeholder: "Enter pet owner phone number",
                value: petOwnerphone,
                setter: setPetOwnerphone,
                keyboardType: "phone-pad",
              },
              {
                icon: "information-circle-outline",
                placeholder: "Enter other important information here",
                value: petDescription,
                setter: setPetDescription,
              },
              {
                icon: "calendar-outline",
                placeholder: "Enter pet age",
                value: petAge,
                setter: setPetAge,
                keyboardType: "phone-pad",
              },
              {
                icon: "color-palette-outline",
                placeholder: "Enter pet color",
                value: petColor,
                setter: setPetColor,
              },
              {
                icon: "scale-outline",
                placeholder: "Enter pet weight",
                value: petWeight,
                setter: setPetWeight,
              },
              {
                icon: "ribbon-outline",
                placeholder: "Enter pet breed",
                value: petBreed,
                setter: setPetBreed,
              },
            ].map(
              ({ icon, placeholder, value, setter, keyboardType }, index) => (
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
                  />
                </View>
              ),
            )}

            <TouchableOpacity onPress={handleAddPet} style={styles.pressMeBtn}>
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

export default AddPetScreen;
