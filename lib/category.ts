import { CategoryType, UserType } from "@/types";
import axios from "axios";
import { addToLS, deleteFromLS, updateLS } from "./utils";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

export const category = {
  add: async (user: KindeUser | null, category: CategoryType) => {
    if (user) {
      await axios.post("/api/categories", category)
    } else {
      addToLS("categories", category)
    }
  },
  delete: async (user: KindeUser | null, id: string) => {
    if (user) {
      await axios.delete("/api/categories/" + id)
    } else {
      deleteFromLS("categories", id)
    }
  },
  update: async (user: KindeUser | null, id: string, category: CategoryType) => {
    if (user) {
      await axios.put("/api/categories/" + id, category)
    } else {
      updateLS("categories", category)
    }
  }
}
