"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  TCreateTransactionSchema,
  createTransactionSchema,
} from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { addToLS } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getUser } from "@/redux/store";
import { addTransaction } from "@/redux/features/transactions-slice";
import { nanoid } from "nanoid";
import { transaction } from "@/lib/transaction";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const CreateTransaction = () => {
  const [viewContent, setViewContent] = useState(false);
  const categories = useSelector(getCategories);
  const { user } = useKindeBrowserClient()
  const dispatch = useDispatch();

  const form = useForm<TCreateTransactionSchema>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      description: "",
      price: "",
      category: undefined,
      type: "spending",
    },
  });

  const onSubmit = (values: TCreateTransactionSchema) => {
    const data = {
      id: nanoid(),
      categoryId: values.category,
      description: values.description,
      price: values.price,
      type: values.type,
      time: new Date().toISOString(),
      userId: user ? user.id : undefined
    };

    transaction.add(user, data)
    dispatch(addTransaction(data));

    form.reset();
  };

  const resetField = () => {
    form.reset();
  };

  const openView = () => {
    if (!viewContent) {
      setViewContent(true);
    }
  };
  return (
    <Card className="mt-6">
      <CardHeader
        onClick={openView}
        className={`${viewContent ? "" : "cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-all"}`}
      >
        <CardTitle>Create Transaction</CardTitle>
        <CardDescription>
          Document your financial journey in this section.
        </CardDescription>
      </CardHeader>
      <AnimatePresence>
        {viewContent && (
          <motion.div
            className="overflow-clip"
            initial={{ height: 0 }}
            animate={{
              height: "",
              transition: {
                type: "spring",
                duration: 0.3,
              },
            }}
            exit={{
              height: 0,
              transition: {
                type: "easeOut",
                duration: 0.1,
              },
            }}
            transition={{ type: "spring" }}
          >
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3"
                >
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
                            <Input
                              type="number"
                              placeholder="10000"
                              {...field}
                            />
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
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Empty..." />
                              </SelectTrigger>
                              <SelectContent>
                                {categories?.map((c: any, i) => (
                                  <SelectItem value={c.id} key={i}>{c.name}</SelectItem>
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
                            defaultValue="spending"
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="spending" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Spending
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="income" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Income
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-6 flex gap-4 w-full">
                    <Button
                      onClick={resetField}
                      type="button"
                      variant="outline"
                      className="w-full"
                    >
                      Clear
                    </Button>
                    <Button type="submit" className="w-full">
                      Create
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>

      {viewContent && (
        <div className="w-full flex justify-center">
          <Button
            onClick={() => setViewContent(false)}
            variant={"ghost"}
            size={"icon"}
          >
            <ChevronDoubleUpIcon className="w-3" />
          </Button>
        </div>
      )}
    </Card>
  );
};

export default CreateTransaction;
