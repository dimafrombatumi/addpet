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
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

import RemoteImage from "../components/RemoteImage";

import essentialstyles from "../styles";
import { useAllPetsStore } from "../stores/AllPetsStore";

import { COLORS, SPACING, FONT_SIZES, RADIUS } from "../constants/constants";

const MyPetScreen = ({ route }) => {
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
            <TouchableOpacity
              onPress={function () {
                navigation.navigate("EditPetScreen");
              }}
            >
              <Ionicons
                style={styles.editProfileIcon}
                name="create-outline"
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.petOptionsContainer}>
            <View style={styles.topItemBlock}>
              <Text style={styles.optionTitle}>Gender</Text>
              <Text style={styles.optionText}>{item.petsex}</Text>
            </View>
            <View
              style={[
                styles.topItemBlock,
                { backgroundColor: COLORS.ligth_blue },
              ]}
            >
              <Text style={styles.optionTitle}>Age</Text>
              <Text style={styles.optionText}>{item.petage} years</Text>
            </View>
            <View
              style={[
                styles.topItemBlock,
                { backgroundColor: COLORS.ligth_violet },
              ]}
            >
              <Text style={styles.optionTitle}>Weigth</Text>
              <Text style={styles.optionText}>{item.petweight} kg</Text>
            </View>
          </View>
          <View style={styles.petidBlock}>
            <Text style={styles.optionTitle}>Pet microchip ID:</Text>
            <View style={styles.petidBlockInner}>
              <Text style={styles.petidText}>{item.petid}</Text>

              <TouchableOpacity onPress={copyToClipboard}>
                <Text style={styles.copyLabel}>COPY</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.petTasksContainer}>
          <View style={styles.petTasksContainerTitle}>
            <Text style={essentialstyles.h2}>Tasks for {item.petname}</Text>
            <TouchableOpacity>
              <Ionicons
                style={styles.addPetIcon}
                name="add-outline"
                size={25}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={function () {
                navigation.navigate("PetTasksListScreen", { idpet: petId });
              }}
            >
              <Text style={styles.seeAllPetsButton}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.petTasks}>
            <TouchableOpacity>
              <View style={styles.petTasksItem}>
                <View style={styles.petTasksItemLeft}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={30}
                    color={COLORS.light_grey}
                    style={styles.checkmarks}
                  />
                  <View style={styles.petTasksItemDescription}>
                    <Text style={styles.petTaskTitle}>
                      1111111Vaccination for Mike
                    </Text>
                    <Text style={styles.petTaskDesc}>Vaccination for Mike</Text>
                  </View>
                </View>
                <Text>18 Aprl 2025</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.petTasksItem}>
              <View style={styles.petTasksItemLeft}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={30}
                  color={COLORS.light_grey}
                  style={styles.checkmarks}
                />
                <View style={styles.petTasksItemDescription}>
                  <Text style={styles.petTaskTitle}>Vaccination for Mike</Text>
                  <Text style={styles.petTaskDesc}>Vaccination for Mike</Text>
                </View>
              </View>
              <Text>18 Aprl 2025</Text>
            </View>
            <View style={styles.petTasksItem}>
              <View style={styles.petTasksItemLeft}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={30}
                  color={COLORS.green}
                  style={styles.checkmarks}
                />
                <View style={styles.petTasksItemDescription}>
                  <Text style={styles.petTaskTitle}>Vaccination for Mike</Text>
                  <Text style={styles.petTaskDesc}>Vaccination for Mike</Text>
                </View>
              </View>
              <Text>18 Aprl 2025</Text>
            </View>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={() => confirmDelete(petId)}
            style={styles.bottomBtnBlock}
          >
            <View style={styles.bottomBtn}>
              <Ionicons name="trash" size={30} color={COLORS.roze} />
              <Text style={styles.optionTitle}>Delete pet</Text>
            </View>
          </TouchableOpacity>
          {item.islost === false ? (
            <TouchableOpacity
              onPress={() => confirmIsLost(petId)}
              style={styles.bottomBtnBlock}
            >
              <View
                style={[
                  styles.bottomBtn,
                  { backgroundColor: COLORS.ligth_green },
                ]}
              >
                <Ionicons name="alert-circle" size={30} color={COLORS.roze} />
                <Text style={styles.optionTitle}>I lost pet</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => confirmIsFound(petId)}
              style={styles.bottomBtnBlock}
            >
              <View
                style={[
                  styles.bottomBtn,
                  { backgroundColor: COLORS.light_green },
                ]}
              >
                <Ionicons name="happy" size={30} color={COLORS.roze} />
                <Text style={styles.optionTitle}>I found pet</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 110,
    width: 110,
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
    borderRadius: RADIUS.default,
  },
  petInfoContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 10,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.default,
    padding: 10,
    gap: 5,
  },
  actionsContainer: {
    flexDirection: "row",
    maxHeight: 80,
    flex: 1,
    marginVertical: 10,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.default,
    padding: 10,
    gap: 5,
  },
  petTasksContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.default,
    paddingHorizontal: 15,
    paddingVertical: 20,
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
    fontSize: FONT_SIZES.small,
    color: COLORS.grey,
  },
  optionText: {
    fontSize: 24,
  },
  editProfileIcon: {
    color: COLORS.black,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.light_grey,
    padding: 10,
  },
  petOptionsContainer: {
    height: 90,
    flexDirection: "row",
    marginVertical: 20,
    gap: 10,
  },

  petName: {
    color: COLORS.black,
    fontSize: FONT_SIZES.extraLarge,
  },
  petBreed: {
    color: COLORS.black,
    fontSize: FONT_SIZES.small,
  },
  topItemBlock: {
    height: "100%",
    backgroundColor: COLORS.ligth_roze,
    borderRadius: RADIUS.default,
    flex: 3,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 5,
    padding: 15,
  },

  petidBlock: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  petidText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.black,
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

  bottomBtn: {
    height: "100%",
    flexDirection: "row",
    backgroundColor: COLORS.ligth_roze,
    borderRadius: RADIUS.default,
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

  seeAllPetsButton: {
    flex: 1,
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.light_grey,
  },

  petTasks: {
    gap: 25,
  },

  petTasksItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  petTasksItemLeft: {
    flexDirection: "row",
    gap: 10,
  },

  petTaskTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },

  petTaskDesc: {
    fontSize: 15,
  },

  addPetIcon: {
    padding: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.light_grey,
  },
});
export default MyPetScreen;
