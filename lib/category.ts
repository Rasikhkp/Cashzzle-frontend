import { CategoryType, UserType } from "@/types";
import axios from "axios";
import { addToLS, deleteFromLS, updateLS } from "./utils";

const opt = {
  withCredentials: true
}

export const category = {
  add: async (user: UserType | null, category: CategoryType) => {
    if (user) {
      await axios.post("http://localhost:1234/api/categories", category, opt)
    } else {
      addToLS("categories", category)
    }
  },
  delete: async (user: UserType | null, id: string) => {
    if (user) {
      await axios.delete("http://localhost:1234/api/categories/" + id, opt)
    } else {
      deleteFromLS("categories", id)
    }
  },
  update: async (user: UserType | null, id: string, category: CategoryType) => {
    if (user) {
      await axios.put("http://localhost:1234/api/categories/" + id, category, opt)
    } else {
      updateLS("categories", category)
    }
  }
}
