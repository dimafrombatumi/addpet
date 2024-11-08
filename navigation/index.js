import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LostPetScreen from "../screens/LostPetScreen";
import ReportScreen from "../screens/ReportScreen";
import LostPetsListScreen from "../screens/LostPetsListScreen";
import SearchResultsScreen from "../screens/SearchResultsScreen";
import AddPetScreen from "../screens/AddPetScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import EditPetScreen from "../screens/EditPetScreen";
import MyPetScreen from "../screens/MyPetScreen";
import PetTasksListScreen from "../screens/PetTasksListScreen";

import { Ionicons } from "@expo/vector-icons";

const Navigation = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: "#E8EBF1",
            height: 120,
          },
          headerBackImage: () => (
            <Ionicons
              style={{
                padding: 3,
                width: 33,
                height: 33,
                borderRadius: 5,
                marginLeft: 15,
                marginBottom: 10,
              }}
              name="chevron-back-outline"
              size={25}
              color="#1A3053"
            />
          ),
        }}
      >
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            title: "Add Pet App - Login",
          }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            title: "Add Pet App - Register",
          }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "Add Pet App",
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="LostPetScreen"
          component={LostPetScreen}
          options={{
            title: "Pet details",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="ReportScreen"
          component={ReportScreen}
          options={{
            title: "Report Lost Pet",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LostPetsListScreen"
          component={LostPetsListScreen}
          options={{
            title: "All Lost Pets",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SearchResultsScreen"
          component={SearchResultsScreen}
          options={{
            title: "Search Results",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddPetScreen"
          component={AddPetScreen}
          options={{
            title: "Add Pet in Database",
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="UserProfileScreen"
          component={UserProfileScreen}
          options={{
            title: "User Profile",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="EditPetScreen"
          component={EditPetScreen}
          options={{
            title: "Edit Pet",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PetTasksListScreen"
          component={PetTasksListScreen}
          options={{
            title: "Pets task details",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="MyPetScreen"
          component={MyPetScreen}
          options={{
            title: "My Pet Details",
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
