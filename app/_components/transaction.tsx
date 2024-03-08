"use client";

import { Button } from "@/components/ui/button";
import {
    EllipsisVerticalIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import food from "@/public/food.svg";
import { useEffect, useState } from "react";

const Transaction = () => {
    const [openOption, setOpenOption] = useState(false);

    return (
        <div className="flex gap-3 items-center relative">
            <div className="w-full flex items-center justify-between rounded-xl p-3 bg-white border border-gray-500">
                <div className="flex gap-3">
                    <Image alt="food" src={food} width={40} />
                    <div className="flex flex-col justify-center">
                        <div className="text-sm">Ember</div>
                        <div className="text-[8px]">08.00 AM</div>
                    </div>
                </div>

                <div className="font-bold text-red-500 text-sm">Rp30.000</div>
            </div>

            <Button
                onClick={() => setOpenOption(!openOption)}
                variant={"ghost"}
                size={"icon"}
            >
                <EllipsisVerticalIcon className="h-6" />
            </Button>

            <div
                className={`${
                    openOption ? "opacity-100 z-10" : "opacity-0 -z-0"
                } transition-all duration-300 rounded-xl options flex flex-col bg-white p-1 border border-gray-500 absolute gap-1 -bottom-14 right-0`}
            >
                <button className="rounded-lg flex items-center justify-center w-6 h-6 transition-all hover:bg-gray-200 active:bg-gray-300">
                    <PencilSquareIcon className="w-4" />
                </button>
                <button className="rounded-lg flex items-center justify-center w-6 h-6 transition-all hover:bg-gray-200 active:bg-gray-300">
                    <TrashIcon className="w-4 text-red-500" />
                </button>
            </div>
        </div>
    );
};

export default Transaction;
