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
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import OverviewInfo from "./overview-info";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getBalance, getIncome, getSpending, getSpendingLimit } from "@/redux/store";
import { getFromLS } from "@/lib/utils";
import { setSpendingLimit } from "@/redux/features/spending-limit-slice";

const Overview = () => {
    const [viewContent, setViewContent] = useState(true)
    const balance = useSelector(getBalance)
    const income = useSelector(getIncome)
    const spending = useSelector(getSpending)
    const spendingLimit = useSelector(getSpendingLimit)
    const dispatch = useDispatch()

    const openView = () => {
        if (!viewContent) {
            setViewContent(true)
        }
    }

    useEffect(() => {
        const spendingLimit = getFromLS('spending limit')
        dispatch(setSpendingLimit(spendingLimit))
    }, [])

    return (
        <Card className="mt-[69px]">
            <CardHeader onClick={openView} className={`${viewContent ? "" : "cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-all"}`}>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                    Discover your financial story in a glance.
                </CardDescription>
            </CardHeader>

            <AnimatePresence>
                {viewContent && (
                    <motion.div
                        className="overflow-clip"
                        initial={{ height: 0 }}
                        animate={{
                            height: "",
                            transition: {
                                type: "spring",
                                duration: .3
                            }
                        }}
                        exit={{
                            height: 0,
                            transition: {
                                type: "easeOut",
                                duration: .1
                            }
                        }}
                        transition={{ type: "spring" }}
                    >
                        <CardContent className="grid grid-cols-2 gap-4">
                            <OverviewInfo amount={balance} name="Balance" />
                            <OverviewInfo amount={income} name="Income" />
                            <OverviewInfo amount={spending} name="Spending" />
                            <OverviewInfo amount={spendingLimit} name="Spending Limit" />
                        </CardContent>
                    </motion.div>
                )}
            </AnimatePresence>

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

export default Overview;
