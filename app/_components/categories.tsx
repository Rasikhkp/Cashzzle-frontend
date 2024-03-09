"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useState } from "react";
import food from "@/public/food.svg";
import CategoriesCreate from "./categories-create";

const Categories = () => {
    const [createCategory, setCreateCategory] = useState(false)

    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>
                    Put your spending in costume—enter categories here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative">
                    <button onClick={() => setCreateCategory(!createCategory)} className="cursor-pointer rounded-full w-8 h-8 bg-gray-800 hover:bg-gray-900 active:bg-black transition-all flex justify-center items-center">
                        {createCategory ?
                            <MinusIcon className="w-5 text-white" />
                            :
                            <PlusIcon className="w-5 text-white" />}
                    </button>

                    {createCategory && <CategoriesCreate />}
                </div>

                <div className="flex flex-wrap gap-3 mt-6">
                    {Array.from({ length: 6 }, (_, i) => (
                        <div key={i} className="rounded-lg border border-gray-500 p-2 text-xs flex items-center gap-2">
                            <Image src={food} width={24} alt="food" />
                            Belanja
                        </div>
                    ))}

                </div>
            </CardContent>
        </Card>
    );
};

export default Categories;
