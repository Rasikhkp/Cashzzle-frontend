import { TransactionType, UserType } from "@/types";
import axios from "axios";
import { addToLS, deleteFromLS, updateLS } from "./utils";

const opt = {
  withCredentials: true
}

export const transaction = {
  add: async (user: UserType | null, transaction: TransactionType) => {
    if (user) {
      await axios.post("http://localhost:1234/api/transactions", transaction, opt)
    } else {
      addToLS("transactions", transaction)
    }
  },
  delete: async (user: UserType | null, id: string) => {
    if (user) {
      await axios.delete("http://localhost:1234/api/transactions/" + id, opt)
    } else {
      deleteFromLS("transactions", id)
    }
  },
  update: async (user: UserType | null, id: string, transaction: TransactionType) => {
    if (user) {
      await axios.put("http://localhost:1234/api/transactions/" + id, transaction, opt)
    } else {
      updateLS("transactions", transaction)
    }
  }
}
