import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  Pressable,
  Linking,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

import HeaderPart from "../components/HeaderPart";
import PetsButton from "../components/PetsButton";
import RemoteImage from "../components/RemoteImage";

import essentialstyles from "../styles";

const LostPetScreen = ({ route }) => {
  const [copiedText, setCopiedText] = React.useState("");
  const { item } = route.params;
  const user = useContext(UserContext);

  const handleDeletePet = async (petId) => {
    await deletePet(petId);
  };

  const handleIsLost = async () => {
    await markAsLost(petId);
  };

  const handleIsFound = async () => {
    await markAsFound(petId);
  };
  const confirmDelete = (petId) => {
    console.log("Confirm delete called for pet ID:", petId);
    Alert.alert(
      "Deletion Confirmation",
      `Are you sure you want to delete pet ${item.petname}? This action cannot be undone.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDeletePet(petId),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const confirmIsLost = (petId) => {
    console.log("Confirm Is Lost called for pet ID:", petId);
    Alert.alert(
      "Is Lost Confirmation",
      `Are you sure you want to mark pet ${item.petname} as lost?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => handleIsLost(petId),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const confirmIsFound = (petId) => {
    console.log("Confirm Is Lost called for pet ID:", petId);
    Alert.alert(
      "Your pet is found Confirmation",
      `Are you sure you want to mark pet ${item.petname} as found?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => handleIsFound(petId),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(item.petid);
    Alert.alert("Copied id " + item.petid);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };
  const callPhone = async () => {
    const phoneNumber = `tel:${item.owner_phone}`;
    try {
      const supported = await Linking.canOpenURL(phoneNumber);
      if (supported) {
        await Linking.openURL(phoneNumber);
      } else {
        Alert.alert(`Failed to open this phone number: ${phoneNumber}`);
      }
    } catch (error) {
      console.error("Error when trying to open phone number:", error);
      Alert.alert("There was an error when trying to open a phone number");
    }
  };
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={essentialstyles.container}>
          <View style={essentialstyles.petInfoContainer}>
            <View style={styles.imageContainer}>
              <RemoteImage
                path={item.petimgurl}
                fallback={
                  "https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png"
                }
                size={"large"}
              />
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.titleBlock}>
                <Text style={styles.petName}>{item.petname}</Text>
                <View style={styles.petOptions}>
                  <Text>
                    {item.pettype} - {item.petbreed}
                  </Text>
                  <Text>{item.petage} y</Text>

                  {item.petsex == "Male" ? (
                    <>
                      <Ionicons name="male" size={18} color="black" />
                      <Text>Male</Text>
                    </>
                  ) : (
                    <>
                      <Text>Female</Text>

                      <Ionicons name="female-sharp" size={18} color="black" />
                    </>
                  )}
                </View>
                <Text style={styles.petLocation}>
                  <Ionicons name="location-outline" size={18} color="red" />
                  {item.petlocation}
                </Text>
              </View>
              <View style={styles.petIdBlockWrapper}>
                <View style={styles.petIdBlock}>
                  <Ionicons name="qr-code-outline" size={24} color="#1A3053" />
                  <Text style={styles.petIdText}> {item.petid}</Text>
                </View>
                <TouchableOpacity onPress={copyToClipboard}>
                  <Ionicons name="copy-outline" size={40} color="#1A3053" />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={essentialstyles.h2}>Call pet owner now</Text>
                <TouchableOpacity
                  style={styles.petOwnerBlock}
                  onPress={callPhone}
                >
                  <Ionicons
                    name="phone-portrait-outline"
                    size={32}
                    color="#1A3053"
                  />
                  <Text style={styles.petIdText}>{item.owner_phone}</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.petDescription}>
                Pet Description: {item.petdescription}
              </Text>
            </View>
          </View>

          <PetsButton
            petsData={item}
            targetScreen={"ReportScreen"}
            buttonText={"Report About Pet"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  petInfoContainer: {
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    gap: 5,
  },
  petImage: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },

  contentContainer: {
    paddingHorizontal: 15,
    gap: 15,
  },
  titleBlock: {
    height: 100,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  petOptions: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  petName: {
    fontSize: 26,
    marginBottom: 10,
    color: "#1A3053",
  },
  petBreed: {
    flex: 3,
    color: "#1A3053",
    fontSize: 16,
    padding: 10,
    borderRadius: 10,
  },
  petAge: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    color: "#1A3053",
    borderRadius: 10,
  },
  petLocation: {
    fontSize: 16,
    color: "#1A3053",
    marginTop: 10,
    borderRadius: 10,
  },
  petSex: {
    flex: 1,
    color: "#1A3053",
    padding: 10,
    borderRadius: 10,
  },
  petIdBlockWrapper: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  petIdBlock: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#F8F5FF2",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 60,
  },
  petOwnerBlock: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#F8F5FF2",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 60,
  },
  petIdText: {
    fontSize: 18,
    color: "#1A3053",
  },
  petDescription: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#F8F5FF",
    color: "#111",
    height: 100,
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

  BottomButton: {
    paddingBottom: 30,
  },
});
export default LostPetScreen;
