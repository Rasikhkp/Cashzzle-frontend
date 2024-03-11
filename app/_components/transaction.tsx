"use client";

import { Button } from "@/components/ui/button";
import {
    EllipsisVerticalIcon,
    PencilIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import food from "@/public/food.svg";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Transaction = () => {
    const [openOption, setOpenOption] = useState(false);

    return (
        <div className="flex items-center relative">
            <div className="w-full mr-3 flex items-center justify-between rounded-xl p-3 bg-white border border-gray-500">
                <div className="flex gap-3">
                    <Image alt="food" src={food} width={40} />
                    <div className="flex flex-col justify-center">
                        <div className="text-sm">Ember</div>
                        <div className="text-[8px]">08.00 AM</div>
                    </div>
                </div>

                <div className="font-bold text-red-500 text-sm">Rp30.000</div>
            </div>

            <AnimatePresence>
                {openOption && (
                    <motion.div
                        className="flex gap-3 overflow-clip"
                        initial={{
                            width: 0
                        }}
                        animate={{
                            width: 120,
                            transition: {
                                type: "spring",
                                bounce: .3,
                                duration: .4
                            }
                        }}
                        exit={{
                            width: 0,
                            gap: 0,
                            transition: {
                                type: "easeIn",
                                duration: .2
                            }
                        }}
                    >
                        <button className="transition-all rounded-full w-8 h-8 hover:bg-gray-100 active:bg-gray-200 flex justify-center items-center">
                            <TrashIcon className="w-4" />
                        </button>

                        <button className="transition-all rounded-full w-8 h-8 hover:bg-gray-100 active:bg-gray-200 flex justify-center items-center">
                            <PencilIcon className="w-4" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>


            <button
                className="w-8 h-8 mx-2 flex flex-none justify-center items-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-all"
                onClick={() => setOpenOption(!openOption)}
            >
                <EllipsisVerticalIcon className="h-6" />
            </button>

        </div>
    );
};

export default Transaction;
