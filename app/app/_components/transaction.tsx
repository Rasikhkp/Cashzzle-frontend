"use client";

import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  format12HourTime,
  formatToRupiah,
} from "@/lib/utils";
import useConfirm from "@/hooks/useConfirm";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "@/redux/features/transactions-slice";
import TransactionEdit from "./transaction-edit";
import { getCategories, getUser } from "@/redux/store";
import noImage from "@/public/icons/no_image.svg";
import { transaction } from "@/lib/transaction";
import { TransactionType } from "@/types";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const Transaction = ({ data }: { data: TransactionType }) => {
  const [openOption, setOpenOption] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { user } = useKindeBrowserClient()

  const [Dialog, confirm] = useConfirm(
    "Are you sure?",
    "This action will remove you transaction forever ever okay?!",
  );
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);

  const getCategoryIcon = () =>
    categories.find((c) => c.id === data.categoryId)?.icon || noImage;

  const remove = async () => {
    const ans = await confirm();

    setOpenOption(false);
    if (!ans) return;

    transaction.delete(user, data.id!)
    dispatch(deleteTransaction(data.id!));
  };

  return (
    <>
      {/* @ts-ignore */}
      <Dialog />
      {openEdit && <TransactionEdit setOpenEdit={setOpenEdit} data={data} />}

      <div className="flex items-center relative">
        <div className="w-full mr-3 overflow-clip flex items-center justify-between rounded-xl p-3 bg-white border border-gray-500">
          <div className="flex gap-3">
            <Image
              alt="category icon"
              src={getCategoryIcon()}
              height={40}
              width={40}
            />
            <div className="flex flex-col justify-center overflow-clip">
              <div
                className="text-xs truncate font-medium"
                title={data.description}
              >
                {data.description}
              </div>
              <div className="text-[8px] truncate font-medium">
                {format12HourTime(data.time.toString())}
              </div>
            </div>
          </div>

          <AnimatePresence>
            {!openOption && (
              <motion.div
                className={`${data.type === "spending" ? "text-red-500" : "text-blue-500"} font-bold text-sm text-nowrap`}
                initial={{
                  width: "0%",
                }}
                animate={{
                  width: "",
                  transition: {
                    duration: 0.2,
                  },
                }}
                exit={{
                  width: "0%",
                  transition: {
                    duration: 0.1,
                  },
                }}
              >
                {data.type === "spending" ? "-" : "+"}
                {formatToRupiah(Number(data.price))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {openOption && (
            <motion.div
              className="flex gap-3 overflow-clip"
              initial={{
                width: 0,
              }}
              animate={{
                width: 120,
                transition: {
                  type: "spring",
                  bounce: 0.3,
                  duration: 0.4,
                },
              }}
              exit={{
                width: 0,
                gap: 0,
                transition: {
                  type: "easeIn",
                  duration: 0.2,
                },
              }}
            >
              <button
                onClick={remove}
                className="transition-all rounded-full w-8 h-8 hover:bg-gray-100 active:bg-gray-200 flex justify-center items-center"
              >
                <TrashIcon className="w-4 text-red-500" />
              </button>

              <button
                onClick={() => setOpenEdit(true)}
                className="transition-all rounded-full w-8 h-8 hover:bg-gray-100 active:bg-gray-200 flex justify-center items-center"
              >
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
    </>
  );
};

export default Transaction;
