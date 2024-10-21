import { create } from "zustand";
import { supabase } from "../supabase";

export const useAllPetsStore = create((set) => ({
  uid: null,
  pets: [],

  fetchMyPets: async () => {
    // Получаем текущего пользователя
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const uid = user.id; // Получаем UID текущего пользователя

      // Получаем питомцев, принадлежащих этому пользователю
      const { data, error } = await supabase
        .from("all_pets")
        .select("*")
        .eq("owner_id", uid);

      if (error) {
        console.error("Ошибка получения питомцев:", error.message);
      } else {
        set({ pets: data });
      }
    } else {
      set({ pets: [] });
      console.error("Пользователь не залогинен");
    }
  },

  fetchLostPets: async () => {
    const { data } = await supabase.from("all_pets").select("*");
    set({ pets: data });
  },
}));
