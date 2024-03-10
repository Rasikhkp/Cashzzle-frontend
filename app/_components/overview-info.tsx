"use client";

import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { MouseEvent, useState } from "react";
import { formatToRupiah } from "@/lib/utils";

const OverviewInfo = ({ amount, name }: { amount: number; name: string }) => {
    const [edit, setEdit] = useState(false);

    const openEdit = () => {
        setEdit(true);
    };

    const closeEdit = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setEdit(false);
    };



    return (
        <div
            onClick={openEdit}
            className="border cursor-pointer hover:bg-gray-100 border-gray-300 rounded-lg relative p-3 overflow-clip"
        >
            <div className="font-bold">{formatToRupiah(amount)}</div>
            <div className="text-xs text-gray-400">{name}</div>
            <div
                className={`${edit ? "z-10 opacity-100" : "-z-10 opacity-0"
                    } transition-all duration-300 flex justify-center gap-3 items-center w-full h-full bg-white/30 absolute inset-0 backdrop-blur-sm`}
            >
                <button className="transition-all hover:bg-gray-300 active:bg-gray-400 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <PencilSquareIcon className="w-5 text-gray-700" />
                </button>
                <button
                    onClick={closeEdit}
                    className="hover:bg-gray-300 active:bg-gray-400 transition-all w-10 h-10 flex items-center justify-center rounded-full bg-gray-200"
                >
                    <XMarkIcon className="w-5 text-gray-700" />
                </button>
            </div>
        </div>
    );
};

export default OverviewInfo;
