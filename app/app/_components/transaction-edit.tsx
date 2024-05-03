import React from "react";
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
  createTransactionSchema,
} from "@/lib/schema";
import { nanoid } from "nanoid";
import {
  addTransaction,
  updateTransaction,
} from "@/redux/features/transactions-slice";
import { addToLS, updateLS } from "@/lib/utils";
import { getCategories, getUser } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { transaction } from "@/lib/transaction";

const TransactionEdit = ({ setOpenEdit, data }: any) => {
  const categories = useSelector(getCategories);
  const dispatch = useDispatch();
  const user = useSelector(getUser)

  const form = useForm<TCreateTransactionSchema>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      description: data.description,
      price: data.price,
      category: data.categoryId,
      type: data.type,
    },
  });

  const onSubmit = (values: TCreateTransactionSchema) => {
    console.log(values);
    const newData = {
      id: data.id,
      categoryId: values.category,
      description: values.description,
      price: values.price,
      type: values.type,
      time: data.time,
      userId: user ? user.id : undefined
    };

    dispatch(updateTransaction(newData));
    transaction.update(user, data.id, newData)

    setOpenEdit(false);
  };

  return (
    <Dialog defaultOpen={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
          <DialogDescription>
            Ever wonder what it's like to rewrite the past? Here's your chance.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Makan Siang" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="10000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={data.categoryId}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Empty..." />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((c: any, i: number) => (
                            <SelectItem key={i} value={c.id}>{c.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={data.type}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="spending" />
                        </FormControl>
                        <FormLabel className="font-normal">Spending</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="income" />
                        </FormControl>
                        <FormLabel className="font-normal">Income</FormLabel>
                      </FormItem>
                    </RadioGroup>
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

export default TransactionEdit;
