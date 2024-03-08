"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    PencilSquareIcon,
    TrashIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { MouseEvent, useState } from "react";
import OverviewInfo from "./overview-info";

const Overview = () => {
    const [edit, setEdit] = useState(false);

    const openEdit = () => {
        setEdit(true);
    };

    const closeEdit = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setEdit(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                    Discover your financial story in a glance.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <OverviewInfo amount={1000000} name="Balance" />
                <OverviewInfo amount={300000} name="Income" />
                <OverviewInfo amount={400000} name="Spending" />
                <OverviewInfo amount={500000} name="Spending Limit" />
            </CardContent>
        </Card>
    );
};

export default Overview;
