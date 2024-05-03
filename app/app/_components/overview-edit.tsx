import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CreateTransaction from "./create-transaction";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  TCreateTransactionSchema,
  TOverviewSchema,
  createTransactionSchema,
  overviewSchema,
} from "@/lib/schema";
import { nanoid } from "nanoid";
import {
  addTransaction,
  updateTransaction,
} from "@/redux/features/transactions-slice";
import { addToLS, setLS, updateLS } from "@/lib/utils";
import { getCategories, getCurrentDate, getUser } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { upsertSpendingLimit } from "@/redux/features/spending-limit-slice";
import { spendingLimit } from "@/lib/spending-limit";
import { format } from "date-fns";
import { useSelectedLayoutSegment } from "next/navigation";

const OverviewEdit = ({
  setOpenEdit,
  amount,
  name,
}: {
  setOpenEdit: any;
  amount: number;
  name: string;
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const user = useSelector(getUser)
  const currentDate = useSelector(getCurrentDate)

  const form = useForm<TOverviewSchema>({
    resolver: zodResolver(overviewSchema),
    defaultValues: {
      amount: amount.toString(),
    },
  });

  const onSubmit = (values: TOverviewSchema) => {
    const newData = {
      id: nanoid(),
      categoryId: "",
      description: "unknown transaction",
      price: Math.abs(amount - Number(values.amount)).toString(),
      time: new Date(),
      type: "" as "spending" | "income",
    };

    switch (name) {
      case "Spending":
        newData.type = "spending";

        break;
      case "Income":
        newData.type = "income";

        break;
      case "Balance":
        if (Number(values.amount) > Number(amount)) {
          newData.type = "income";
        } else {
          newData.type = "spending";
        }

        break;
      case "Spending Limit":
        const spendingLimitData = {
          id: nanoid(),
          date: format(currentDate, 'MM-yy'),
          spendingLimit: values.amount.toString(),
          userId: user ? user.id : undefined
        }

        spendingLimit.upsert(user, spendingLimitData)
        dispatch(upsertSpendingLimit(spendingLimitData))

        break;
    }

    if (name !== "Spending Limit") {
      addToLS("transactions", newData);
      dispatch(addTransaction(newData));
    }

    setOpenEdit(false);
  };

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {name === "Spending Limit" ? "Set Spending Limit" : `Edit ${name}`}
          </DialogTitle>
          <DialogDescription>
            {name === "Spending Limit"
              ? "Please enter your desired spending limit for this period"
              : "Caution: Direct edits may result in unexpected transaction adjustments."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="10000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-6 flex gap-4 w-full">
              <Button
                onClick={() => setOpenEdit(false)}
                type="button"
                variant="outline"
                className="w-full"
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full">
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default OverviewEdit;
