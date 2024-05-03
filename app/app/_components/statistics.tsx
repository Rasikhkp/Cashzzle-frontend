"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import StatisticsSpendingProgress from "./statistics-spending-progress";
import StatisticsIncomeSpendingByCategories from "./statistics-income-spending-by-categories";
import StatisticsMoneyFlow from "./statistics-money-flow";

type PieChartData = {
  id: string;
  label: string;
  value: number;
};

const Statistics = () => {
  const [open, setOpen] = useState(false);

  const openView = () => {
    if (!open) {
      setOpen(true);
    }
  };
  return (
    <Card className="mt-[69px] mb-5">
      <CardHeader
        onClick={openView}
        className={`${open ? "" : "cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-all"}`}
      >
        <CardTitle>Statistics</CardTitle>
        <CardDescription>
          Visualize your financial data with insightful statistics.
        </CardDescription>
      </CardHeader>

      <AnimatePresence>
        {open && (
          <motion.div
            className="overflow-clip"
            initial={{ height: 0 }}
            animate={{
              height: "",
              transition: {
                type: "spring",
                duration: 0.5,
              },
            }}
            exit={{
              height: 0,
              transition: {
                type: "easeOut",
                duration: 0.1,
              },
            }}
            transition={{ type: "spring" }}
          >
            <CardContent>
              <div className="text-sm font-medium mb-5">Spending progress</div>
              <StatisticsSpendingProgress />

              <div className="text-sm my-5 font-medium">
                Spending and income by category
              </div>
              <StatisticsIncomeSpendingByCategories />

              <div className="text-sm my-5 font-medium">
                Balance, Spending, and income
              </div>
              <StatisticsMoneyFlow />
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>

      {open && (
        <div className="w-full flex justify-center">
          <Button
            onClick={() => setOpen(false)}
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

export default Statistics;
