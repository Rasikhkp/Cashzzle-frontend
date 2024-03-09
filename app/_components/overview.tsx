"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChevronDoubleUpIcon,
    PencilSquareIcon,
    TrashIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { MouseEvent, useState } from "react";
import OverviewInfo from "./overview-info";
import { Button } from "@/components/ui/button";

const Overview = () => {
    const [edit, setEdit] = useState(false);
    const [viewContent, setViewContent] = useState(true)

    const openEdit = () => {
        setEdit(true);
    };

    const closeEdit = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setEdit(false);
    };

    const openView = () => {
        if (!viewContent) {
            setViewContent(true)
        }
    }

    return (
        <Card>
            <CardHeader onClick={openView} className={`${viewContent ? "" : "cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-all"}`}>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                    Discover your financial story in a glance.
                </CardDescription>
            </CardHeader>

            {viewContent && (
                <CardContent className="grid grid-cols-2 gap-4">
                    <OverviewInfo amount={1000000} name="Balance" />
                    <OverviewInfo amount={300000} name="Income" />
                    <OverviewInfo amount={400000} name="Spending" />
                    <OverviewInfo amount={500000} name="Spending Limit" />
                </CardContent>
            )}

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
