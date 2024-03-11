"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";

const CreateTransaction = () => {
    const [viewContent, setViewContent] = useState(true)


    const form = useForm<TCreateTransactionSchema>({
        resolver: zodResolver(createTransactionSchema),
    });

    const onSubmit = () => { };

    const openView = () => {
        if (!viewContent) {
            setViewContent(true)
        }
    }
    return (
        <Card className="mt-6">
            <CardHeader onClick={openView} className={`${viewContent ? "" : "cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-all"}`}>
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
                                type: "spring"
                            }
                        }}
                        exit={{
                            height: 0,
                            transition: {
                                type: "easeOut",
                                duration: .1
                            }
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
                                                    <Input
                                                        placeholder="Makan Siang"
                                                        {...field}
                                                    />
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
                                                        <Select>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Empty..." />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="light">
                                                                    Light
                                                                </SelectItem>
                                                                <SelectItem value="dark">
                                                                    Dark
                                                                </SelectItem>
                                                                <SelectItem value="system">
                                                                    System
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <RadioGroup className="flex gap-4 pt-3">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="spending" id="r1" />
                                            <Label htmlFor="r2">Spending</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="income" id="r2" />
                                            <Label htmlFor="r3">Income</Label>
                                        </div>
                                    </RadioGroup>

                                    <div className="pt-6 flex gap-4 w-full">
                                        <Button variant="outline" className="w-full">
                                            Clear
                                        </Button>
                                        <Button className="w-full">
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
                    <Button onClick={() => setViewContent(false)} variant={"ghost"} size={"icon"} >
                        <ChevronDoubleUpIcon className="w-3" />
                    </Button>
                </div>
            )}
        </Card>
    );
};

export default CreateTransaction;
