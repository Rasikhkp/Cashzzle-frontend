"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChevronDoubleUpIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useState } from "react";
import food from "@/public/food.svg";
import CategoriesCreate from "./categories-create";
import { Button } from "@/components/ui/button";

const Categories = () => {
    const [createCategory, setCreateCategory] = useState(false)
    const [viewContent, setViewContent] = useState(true)

    const openView = () => {
        if (!viewContent) {
            setViewContent(true)
        }
    }

    return (
        <Card className="my-6">
            <CardHeader onClick={openView} className={`${viewContent ? "" : "cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-all"}`}>
                <CardTitle>Categories</CardTitle>
                <CardDescription>
                    Put your spending in costume—enter categories here.
                </CardDescription>
            </CardHeader>

            {viewContent && (
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
            )}

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

export default Categories;
