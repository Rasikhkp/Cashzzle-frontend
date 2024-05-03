"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronDoubleUpIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import CategoriesCreateEdit from "./categories-create-edit";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { getCategories } from "@/redux/store";
import Category from "./category";

const Categories = () => {
  const [createCategory, setCreateCategory] = useState(false);
  const [viewContent, setViewContent] = useState(true);
  const categories = useSelector(getCategories)

  const openView = () => {
    if (!viewContent) {
      setViewContent(true);
    }
  };

  return (
    <Card className="my-6">
      <CardHeader
        onClick={openView}
        className={`${viewContent ? "" : "cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-all"}`}
      >
        <CardTitle>Categories</CardTitle>
        <CardDescription>
          Put your spending in costume—enter categories here.
        </CardDescription>
      </CardHeader>

      <AnimatePresence>
        {viewContent && (
          <motion.div
            initial={{ height: 0, overflow: "clip" }}
            animate={{
              height: "",
              overflow: "visible",
              transition: {
                type: "spring",
                duration: 0.3,
                overflow: {
                  delay: 0.5,
                },
              },
            }}
            exit={{
              height: 0,
              overflow: "clip",
              transition: {
                type: "easeOut",
                duration: 0.1,
              },
            }}
            transition={{
              overflow: { delay: 1 },
            }}
          >
            <CardContent>
              <div className="relative z-10">
                <button
                  onClick={() => setCreateCategory(!createCategory)}
                  className="cursor-pointer rounded-full w-8 h-8 bg-gray-800 hover:bg-gray-900 active:bg-black transition-all flex justify-center items-center"
                >
                  {createCategory ? (
                    <MinusIcon className="w-5 text-white" />
                  ) : (
                    <PlusIcon className="w-5 text-white" />
                  )}
                </button>

                {createCategory && (
                  <CategoriesCreateEdit
                    setOpen={setCreateCategory}
                    type="create"
                    className="absolute top-0 left-10 "
                  />
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {categories?.map((category: any, index: any) => (
                  <Category
                    key={index}
                    id={category.id}
                    icon={category.icon}
                    name={category.name}
                  />
                  // {/* <div key={index} className="cursor-pointer hover:bg-gray-100 relative overflow-clip rounded-lg border border-gray-500 py-2 px-3 text-xs flex items-center gap-2"> */}
                  // {/*     <Image src={category.icon} width={24} height={24} alt="food" /> */}
                  // {/*     {category.name} */}
                  // {/* </div> */}
                ))}
              </div>
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

export default Categories;
