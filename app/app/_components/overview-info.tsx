"use client";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { formatToRupiah } from "@/lib/utils";
import OverviewEdit from "./overview-edit";

const OverviewInfo = ({ amount, name }: { amount: number; name: string }) => {
  const [edit, setEdit] = useState(false);
  const [openOption, setOpenOption] = useState(false);
  const overviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (
        overviewRef?.current &&
        !overviewRef.current.contains(e.target as Node)
      ) {
        setOpenOption(false);
      }
    });
  });

  return (
    <>
      <div
        ref={overviewRef}
        onClick={() => setOpenOption(true)}
        className="border cursor-pointer hover:bg-gray-100 border-gray-300 rounded-lg relative p-3 overflow-clip"
      >
        <div className="font-bold">{formatToRupiah(amount || 0)}</div>
        <div className="text-xs text-gray-400">{name}</div>
        <div
          className={`${openOption ? "z-10 opacity-100" : "-z-10 opacity-0"
            } transition-all duration-300 flex justify-center gap-3 items-center w-full h-full bg-white/30 absolute inset-0 backdrop-blur-sm`}
        >
          <button
            onClick={() => setEdit(true)}
            className="transition-all drop-shadow hover:bg-gray-300 active:bg-gray-400 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
          >
            <PencilSquareIcon className="w-4 text-gray-700" />
          </button>
        </div>
        {edit && (
          <OverviewEdit setOpenEdit={setEdit} name={name} amount={amount} />
        )}
      </div>
    </>
  );
};

export default OverviewInfo;
