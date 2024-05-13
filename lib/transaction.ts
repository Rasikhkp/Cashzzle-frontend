import { TransactionType, UserType } from "@/types";
import axios from "axios";
import { addToLS, deleteFromLS, updateLS } from "./utils";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

export const transaction = {
  add: async (user: KindeUser | null, transaction: TransactionType) => {
    if (user) {
      await axios.post("/api/transactions", transaction)
    } else {
      addToLS("transactions", transaction)
    }
  },
  delete: async (user: KindeUser | null, id: string) => {
    if (user) {
      await axios.delete("/api/transactions/" + id)
    } else {
      deleteFromLS("transactions", id)
    }
  },
  update: async (user: KindeUser | null, id: string, transaction: TransactionType) => {
    if (user) {
      await axios.put("/api/transactions/" + id, transaction)
    } else {
      updateLS("transactions", transaction)
    }
  }
}
