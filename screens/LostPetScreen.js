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
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

import RemoteImage from "../components/RemoteImage";

import { COLORS, FONT_SIZES, RADIUS, PETTYPE } from "../constants/constants";

import essentialstyles from "../styles";
import { useAllPetsStore } from "../stores/AllPetsStore";

const LostPetScreen = ({ route }) => {
  const [copiedText, setCopiedText] = React.useState("");
  const { item } = route.params;
  const petId = item.petid.toString();

  const deletePet = useAllPetsStore((state) => state.deletePet);
  const markAsLost = useAllPetsStore((state) => state.markAsLost);
  const markAsFound = useAllPetsStore((state) => state.markAsFound);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(petId);
    Alert.alert("Copied id " + petId);
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

  const handleDeletePet = async (petId) => {
    await deletePet(petId);
  };

  const handleIsLost = async () => {
    await markAsLost(petId);
    navigation.navigate("LostPetsListScreen");
  };

  const handleIsFound = async () => {
    await markAsFound(petId);
    navigation.navigate("UserProfileScreen");
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
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={essentialstyles.container}>
        <View style={styles.petInfoContainer}>
          <View style={styles.petInfoContainerTop}>
            <View style={styles.petInfoContainerLeft}>
              <View style={styles.imageContainer}>
                <RemoteImage
                  path={item.petimgurl}
                  fallback={
                    "https://images.pexels.com/photos/28216688/pexels-photo-28216688/free-photo-of-autumn-camping.png"
                  }
                  size={"large"}
                />
              </View>
              <View style={styles.petTitle}>
                <Text style={styles.petName}>{item.petname}</Text>
                <Text style={styles.petBreed}>{item.petbreed}</Text>
              </View>
            </View>
          </View>
          <View style={styles.petOptionsContainer}>
            <View style={styles.topItemBlock}>
              <Text style={styles.optionTitle}>Gender</Text>
              <Text style={styles.optionText}>{item.petsex}</Text>
            </View>
            <View style={[styles.topItemBlock, { backgroundColor: "#E6F8FF" }]}>
              <Text style={styles.optionTitle}>Age</Text>
              <Text style={styles.optionText}>{item.petage}</Text>
            </View>
            <View style={[styles.topItemBlock, { backgroundColor: "#EEEFFE" }]}>
              <Text style={styles.optionTitle}>Weigth</Text>
              <Text style={styles.optionText}>{item.petweight}</Text>
            </View>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.detailsItem}>
            <View style={styles.petidBlockInner}>
              <Text style={styles.detailsItemLabel}>Microchip number:</Text>
              <Text>{item.petid}</Text>
              <TouchableOpacity onPress={copyToClipboard}>
                <Text style={styles.copyLabel}>COPY</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.detailsItem}>
            <Text style={styles.detailsItemLabel}>Owner phone:</Text>
            <Text>{item.owner_phone}</Text>
          </View>
          <View style={styles.detailsItem}>
            <Text style={styles.detailsItemLabel}>Location:</Text>
            <Text>{item.petlocation}</Text>
          </View>
          <View style={styles.detailsItem}>
            <Text style={styles.detailsItemLabel}>Color:</Text>
            <Text>{item.petcolor}</Text>
          </View>
          <View style={styles.detailsItemDesc}>
            <Text style={styles.detailsItemLabel}>Description:</Text>
            <Text>{item.petdescription}</Text>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ReportScreen", { lostpet: item.petid })
            }
            style={styles.bottomBtnBlock}
          >
            <View
              style={[
                styles.bottomBtn,
                { backgroundColor: COLORS.ligth_green },
              ]}
            >
              <Ionicons name="happy" size={30} color={COLORS.roze} />
              <Text style={styles.optionTitle}>
                I found this {item.pettype.toLowerCase()}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 190,
    width: 190,
    justifyContent: "center",
    alignItems: "center",
  },
  petInfoContainerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  petImage: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
  },
  petInfoContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    gap: 5,
  },
  actionsContainer: {
    flexDirection: "row",
    maxHeight: 80,
    flex: 1,
    marginVertical: 10,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 10,
    gap: 5,
  },
  detailsContainer: {
    gap: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: RADIUS.default,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },

  detailsItem: {
    flexDirection: "row",
    gap: 10,
  },

  detailsItemLabel: {
    color: COLORS.grey,
    fontSize: FONT_SIZES.small,
  },

  detailsItemDesc: {
    gap: 10,
  },

  petInfoContainerLeft: {
    flexDirection: "row",
    gap: 25,
  },
  contentContainer: {
    paddingHorizontal: 15,
    gap: 15,
  },
  petTitle: {
    paddingVertical: 20,
    gap: 10,
  },

  optionTitle: {
    fontSize: 14,
  },
  optionText: {
    fontSize: 24,
  },
  editProfileIcon: {
    color: "#111",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E9E9E9",
    padding: 10,
  },
  petOptionsContainer: {
    height: 90,
    flexDirection: "row",
    marginVertical: 20,
    gap: 10,
  },

  petName: {
    fontSize: 28,
    color: "#1A3053",
  },
  petBreed: {
    color: "#1A3053",
    fontSize: 16,
  },
  topItemBlock: {
    height: "100%",
    backgroundColor: "#FCEFE9",
    borderRadius: 20,
    flex: 3,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 5,
    padding: 15,
  },

  bottomBtn: {
    height: "100%",
    flexDirection: "row",
    backgroundColor: "#FCEFE9",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    padding: 15,
  },

  bottomBtnBlock: {
    flex: 2,
  },
  petTasksContainerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  petidBlockInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  copyLabel: {
    fontSize: FONT_SIZES.small,
    padding: 10,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.light_grey,
  },
});
export default LostPetScreen;
