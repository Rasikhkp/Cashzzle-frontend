"use client";

import { Button } from "@/components/ui/button";
import { setCurrentDate } from "@/redux/features/transactions-slice";
import { getCurrentDate } from "@/redux/store";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { addMonths, format, subMonths } from "date-fns";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const MonthNavigation = () => {
  const currentDate = useSelector(getCurrentDate);
  const dispatch = useDispatch();

  return (
    <div className="w-full border-b border-gray-700 items-center flex justify-between py-4">
      <Button
        onClick={() => dispatch(setCurrentDate(subMonths(currentDate, 1)))}
        variant={"ghost"}
        size={"icon"}
      >
        <ChevronLeftIcon className="w-6" />
      </Button>

      <div className="font-medium">{format(currentDate, "MMMM, yyyy")}</div>

      <Button
        onClick={() => dispatch(setCurrentDate(addMonths(currentDate, 1)))}
        variant={"ghost"}
        size={"icon"}
      >
        <ChevronRightIcon className="w-6" />
      </Button>
    </div>
  );
};

export default MonthNavigation;
