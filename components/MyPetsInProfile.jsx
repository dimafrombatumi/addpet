import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React,{useEffect} from "react";
import MyPetItem from "./MyPetItem";
import essentialstyles from "../styles";
import { useAllPetsStore } from "../stores/AllPetsStore";

const MyPetsInProfile = () => {
  const fetchMyPets = useAllPetsStore((state => state.fetchMyPets))
  const mypets = useAllPetsStore((state) => state.pets);
  useEffect(()=>{fetchMyPets()},[])

  return (
    <View>
      <Text style={essentialstyles.h2}>List oF My Pets</Text>
      <View style={styles.myPetItemContainer}>
      {mypets.length === 0 ? (
          <View style={styles.gapContainer}>
           <Image style={styles.nopetsImg} source={require("../assets/data/images/nopets.png")}
         />
          <Text style={styles.nopetsText}t>No pets added</Text></View>
          ):(
      <FlatList
            data={mypets}
            keyExtractor={(item) => item.petid}
            numColumns={2}
            renderItem={({ item }) => <MyPetItem item={item} navigation />}
            columnWrapperStyle={styles.flatListWrap}
          />)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  myPetItemContainer: {
    padding: 7,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
  },
  petImg: {
    height: 60,
    width: 60,
  },
  nopetsImg:{
    alignSelf: "center",
    width: 80,
    height: 80
  },

    nopetsText:{
      alignSelf:"center",
      fontSize:22
    },
});

export default MyPetsInProfile;
