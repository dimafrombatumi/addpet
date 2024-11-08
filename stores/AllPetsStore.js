import { create } from "zustand";
import { supabase } from "../supabase";

export const useAllPetsStore = create((set) => ({
  uid: null,
  allpets: [],
  mypets: [],
  pettasks: [],

  addMyPet: async () => {
    const { data, error } = await supabase.from("all_pets").insert([
      {
        petid: petId,
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
      }, // объект с данными, которые нужно вставить
    ]);
    set({ mypets: data });
  },

  fetchMyPets: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const uid = user.id;

      const { data, error } = await supabase
        .from("all_pets")
        .select("*")
        .eq("owner_id", uid);

      if (error) {
        console.error("Ошибка получения питомцев:", error.message);
      } else {
        console.log(data);

        set({ mypets: data });
      }
    } else {
      set({ mypets: [] });
      console.error("Пользователь не залогинен");
    }
  },

  fetchLostPets: async () => {
    const { data } = await supabase.from("all_pets").select("*");
    set({ allpets: data });
  },

  addPetTask: async () => {
    const { data, error } = await supabase.from("pet_tasks").insert([
      {
        task_title: taskTitle,
        task_description: taskDescription,
        notify_before: notifyBefore,
        task_type: taskType,
        place: place,
        task_status: taskStatus,
      }, // объект с данными, которые нужно вставить
    ]);
    set({ pettasks: data });
  },

  fetchPetTasks: async (idpet) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const uid = user.id;
      const { data, error } = await supabase
        .from("pet_tasks")
        .select("*")
        .eq("petid", idpet);

      if (error) {
        console.error("Ошибка получения записей:", error.message);
      } else {
        console.log("PETTASKS__________", data);

        set({ pettasks: data });
      }
    } else {
      set({ pettasks: [] });
      console.error("Пользователь не залогинен");
    }
  },

  donePetTask: async (taskid) => {
    const { error } = await supabase
      .from("pet_tasks")
      .update({
        task_status: false,
      })
      .eq("task_id", taskid);
  },

  deletePet: async (petId) => {
    console.log("Attempting to delete pet with ID:", petId);
    const { data, error } = await supabase
      .from("all_pets")
      .delete()
      .eq("petid", petId);

    if (error) {
      console.log("Delete error:", error.message);
    } else {
      console.log("Pet deleted from DB:", data);
      set((state) => ({
        mypets: state.mypets.filter((pet) => pet.petid !== petId),
        allpets: state.allpets.filter((pet) => pet.petid !== petId),
      }));
    }
    return data;
  },

  reportPet: async (
    petId,
    petType,
    petLocation,
    petOwnerphone,
    ImagePath,
    petDescription,
    ownerEmail
  ) => {
    const { error } = await supabase.from("lost_pets").insert({
      petid: petId,
      pettype: petType,
      petlocation: petLocation,
      owner_phone: petOwnerphone,
      petimgurl: ImagePath,
      petdescription: petDescription,
      owner_email: ownerEmail,
    });
  },

  markAsLost: async (petId) => {
    const { error } = await supabase
      .from("all_pets")
      .update({
        islost: true,
      })
      .eq("petid", petId);
  },

  markAsFound: async (petId) => {
    const { error } = await supabase
      .from("all_pets")
      .update({
        islost: false,
      })
      .eq("petid", petId);
  },
}));
