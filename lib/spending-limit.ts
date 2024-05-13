import { SpendingLimitType, UserType } from "@/types";
import axios from "axios";
import { addToLS, deleteFromLS, updateLS, upsertLS } from "./utils";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

export const spendingLimit = {
  delete: async (user: KindeUser | null, id: string) => {
    if (user) {
      await axios.delete("/api/spendingLimit/" + id)
    } else {
      deleteFromLS("spending-limits", id)
    }
  },
  upsert: async (user: KindeUser | null, spendingLimit: SpendingLimitType) => {
    if (user) {
      await axios.put("/api/spendingLimit/", spendingLimit)
    } else {
      upsertLS("spending-limits", spendingLimit)
    }
  }
}
