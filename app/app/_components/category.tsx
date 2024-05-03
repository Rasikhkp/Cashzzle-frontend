import { deleteFromLS, setLS } from "@/lib/utils";
import { deleteCategory } from "@/redux/features/categories-slice";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoriesCreateEdit from "./categories-create-edit";
import useConfirm from "@/hooks/useConfirm";
import { getTransactions, getUser } from "@/redux/store";
import { fillTransactions } from "@/redux/features/transactions-slice";
import { category } from "@/lib/category";

const Category = ({
  icon,
  name,
  id,
}: {
  icon: string;
  name: string;
  id: string;
}) => {
  const [options, setOptions] = useState(false);
  const [edit, setEdit] = useState(false);
  const user = useSelector(getUser)
  const categoryRef = useRef<HTMLDivElement>(null);
  const transactions = useSelector(getTransactions);
  const dispatch = useDispatch();
  const [Dialog, confirm] = useConfirm(
    "Are you sure?",
    "Proceeding will leave the transactions with this category uncategorized.",
  );

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (
        categoryRef?.current &&
        !categoryRef.current.contains(e.target as Node)
      ) {
        setOptions(false);
      }
    });
  });

  const remove = async (e: MouseEvent) => {
    e.stopPropagation();
    const ans = await confirm();

    if (!ans) return;

    setOptions(false);
    category.delete(user, id)
    dispatch(deleteCategory(id));

    const newTransactionList = transactions.map((transaction) => {
      if (transaction.categoryId === id) {
        return { ...transaction, categoryId: "" };
      }

      return transaction;
    });

    setLS("transactions", newTransactionList);
    dispatch(fillTransactions(newTransactionList));
  };

  return (
    <>
      {/* @ts-ignore */}
      <Dialog />
      <div
        ref={categoryRef}
        onClick={() => setOptions(true)}
        className="cursor-pointer bg-white hover:bg-gray-100 relative rounded-lg border border-gray-500 py-2 px-3 text-xs flex items-center"
      >
        <Image src={icon} width={24} height={24} alt="food" />

        <div className="mx-2">{name}</div>

        <div
          className={`${options ? "z-10 opacity-100" : "-z-10 opacity-0"
            } transition-all duration-300 flex justify-center gap-2 items-center w-full h-full bg-white/30 absolute rounded-lg inset-0 backdrop-blur-sm`}
        >
          <button
            onClick={() => setEdit(!edit)}
            className="transition-all drop-shadow hover:bg-gray-300 active:bg-gray-400 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
          >
            <PencilSquareIcon className="w-3 text-gray-700" />
          </button>

          <button
            onClick={remove}
            className="hover:bg-gray-300 drop-shadow active:bg-gray-400 transition-all w-6 h-6 flex items-center justify-center rounded-full bg-gray-200"
          >
            <TrashIcon className="w-3 text-red-500" />
          </button>
        </div>

        {edit && (
          <CategoriesCreateEdit
            setOpen={setEdit}
            data={{ icon, name, id }}
            type="update"
            className="absolute bottom-[140%] left-0"
          />
        )}
      </div>
    </>
  );
};

export default Category;
