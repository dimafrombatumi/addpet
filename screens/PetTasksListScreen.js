import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import essentialstyles from "../styles";
import { COLORS, FONT_SIZES, RADIUS } from "../constants/constants";
import { Ionicons } from "@expo/vector-icons";
import { useAllPetsStore } from "../stores/AllPetsStore";

const PetTasksListScreen = ({ route }) => {
  const idpet = route.params?.idpet;
  const petname = route.params?.petname;

  const fetchPetAllTasks = useAllPetsStore((state) => state.fetchPetAllTasks);
  const fetchPetDoneTasks = useAllPetsStore((state) => state.fetchPetDoneTasks);
  const fetchPetCurrentTasks = useAllPetsStore(
    (state) => state.fetchPetCurrentTasks
  );

  const donePetTask = useAllPetsStore((state) => state.donePetTask);
  const undonePetTask = useAllPetsStore((state) => state.undonePetTask);

  const all_pettasks = useAllPetsStore((state) => state.all_pettasks);
  const donetasks = useAllPetsStore((state) => state.donetasks);
  const currenttasks = useAllPetsStore((state) => state.currenttasks);

  let doneNum = donetasks.length;
  let currentNum = currenttasks.length;
  let alltaskNum = doneNum + currentNum;
  const undonePetTaskHeandler = async (taskid) => {
    console.log(taskid);
    await undonePetTask(taskid);
  };

  const currentPetTaskHeandler = async (taskid) => {
    await donePetTask(taskid);
  };

  useEffect(() => {
    fetchPetDoneTasks(idpet);
    fetchPetCurrentTasks(idpet);
  }, [idpet]);

  return (
    <View style={essentialstyles.container}>
      <View style={styles.tasksContainer}>
        <Text style={essentialstyles.h2}>
          All tasks for {petname} - {alltaskNum}
        </Text>

        <View style={styles.currentTasksContainer}>
          <Text style={essentialstyles.h2}>
            Current tasks - {currenttasks.length}
          </Text>

          {currenttasks.map((task, idpet) => {
            return (
              <View
                style={[
                  styles.taskContainer,
                  { backgroundColor: COLORS.ligth_green },
                ]}
                key={idpet}
              >
                <View style={styles.taskContainerLeft}>
                  <Text style={essentialstyles.h2}>{task.task_title}</Text>
                  <Text style={styles.taskDescription}>
                    {task.task_description}
                  </Text>
                  <Text style={essentialstyles.text}>{task.place}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => undonePetTaskHeandler(task.task_id)}
                >
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={32}
                    color={COLORS.green}
                    style={styles.checkmarks}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <View style={styles.doneTasksContainer}>
          <Text style={essentialstyles.h2}>
            Done tasks - {donetasks.length}
          </Text>

          {donetasks.map((task, idpet) => {
            return (
              <View
                style={[
                  styles.taskContainer,
                  { backgroundColor: COLORS.light_grey },
                ]}
                key={idpet}
              >
                <View style={styles.taskContainerLeft}>
                  <Text>{task.task_title}</Text>
                  <Text style={styles.taskDescription}>
                    {task.task_description}
                  </Text>
                  <Text style={essentialstyles.text}>{task.place}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => currentPetTaskHeandler(task.task_id)}
                >
                  <Ionicons
                    name="ellipse-outline"
                    size={32}
                    color={COLORS.grey}
                    style={styles.checkmarks}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tasksContainer: {
    flexDirection: "column",
    marginVertical: 10,
    borderRadius: RADIUS.default,
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 20,
    height: "95%",
  },

  taskContainer: {
    flexDirection: "row",
    borderColor: COLORS.light_grey,
    borderWidth: 1,
    borderRadius: RADIUS.default,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  taskContainerLeft: {},

  taskTitle: {
    fontSize: FONT_SIZES.medium,
    textDecorationLine: "",
  },

  taskDescription: {
    fontSize: FONT_SIZES.medium,
  },
  currentTasksContainer: {
    backgroundColor: COLORS.white,
    flexDirection: "column",

    borderRadius: RADIUS.default,
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 20,
  },

  doneTasksContainer: {
    backgroundColor: COLORS.white,
    flexDirection: "column",
    borderRadius: RADIUS.default,
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 20,
  },
});

export default PetTasksListScreen;
