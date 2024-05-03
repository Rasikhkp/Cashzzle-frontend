import { SpendingLimitType, UserType } from "@/types";
import axios from "axios";
import { addToLS, deleteFromLS, updateLS, upsertLS } from "./utils";

const opt = {
  withCredentials: true
}

export const spendingLimit = {
  add: async (user: UserType | null, spendingLimit: SpendingLimitType) => {
    if (user) {
      await axios.post("http://localhost:1234/api/transactions", spendingLimit, opt)
    } else {
      addToLS("spending-limits", spendingLimit)
    }
  },
  delete: async (user: UserType | null, id: string) => {
    if (user) {
      await axios.delete("http://localhost:1234/api/spendingLimits/" + id, opt)
    } else {
      deleteFromLS("spending-limits", id)
    }
  },
  update: async (user: UserType | null, id: string, spendingLimit: SpendingLimitType) => {
    if (user) {
      await axios.put("http://localhost:1234/api/spendingLimits/" + id, spendingLimit, opt)
    } else {
      updateLS("spending-limits", spendingLimit)
    }
  },
  upsert: async (user: UserType | null, spendingLimit: SpendingLimitType) => {
    if (user) {
      await axios.put("http://localhost:1234/api/spendingLimits/", spendingLimit, opt)
    } else {
      upsertLS("spending-limits", spendingLimit)
    }
  }
}
