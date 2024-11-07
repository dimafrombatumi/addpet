import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import essentialstyles from "../styles";
import { COLORS, FONT_SIZES, RADIUS } from "../constants/constants";
import { Ionicons } from "@expo/vector-icons";
import { useAllPetsStore } from "../stores/AllPetsStore";

const PetTasksListScreen = ({ route }) => {
  const idpet = route.params?.idpet;
  const fetchPetTasks = useAllPetsStore((state) => state.fetchPetTasks);
  const pettasks = useAllPetsStore((state) => state.pettasks);

  useEffect(() => {
    if (idpet) {
      fetchPetTasks(idpet);
    }
  }, [idpet]);

  return (
    <View style={essentialstyles.container}>
      <View style={styles.tasksContainer}>
        <Text style={essentialstyles.h2}>All tasks</Text>
        {pettasks.map((task, idpet) => {
          return (
            <View style={styles.taskContainer} key={idpet}>
              <View style={styles.taskContainerLeft}>
                <Text
                  style={[
                    essentialstyles.h2,
                    {
                      textDecorationLine:
                        task.task_status === false ? "line-through" : "none",
                    },
                  ]}
                >
                  {task.task_title}
                </Text>
                <Text style={styles.taskDescription}>
                  {task.task_description}
                </Text>
                <Text style={essentialstyles.text}>{task.place}</Text>
              </View>
              <Ionicons
                name="checkmark-circle-outline"
                size={32}
                color={task.task_status === true ? COLORS.roze : COLORS.green}
                style={styles.checkmarks}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tasksContainer: {
    flexDirection: "column",
    marginVertical: 10,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.default,
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 10,
    height: "95%",
  },

  taskContainer: {
    flexDirection: "row",
    borderColor: COLORS.light_grey,
    borderWidth: 1,
    borderRadius: RADIUS.default,
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 20,
  },

  taskContainerLeft: {},

  taskTitle: {
    fontSize: FONT_SIZES.medium,
    textDecorationLine: "",
  },

  taskDescription: {
    fontSize: FONT_SIZES.medium,
  },
});
export default PetTasksListScreen;
