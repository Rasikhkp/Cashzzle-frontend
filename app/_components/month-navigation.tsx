import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";

const MonthNavigation = () => {
    return (
        <div className="w-full border-b border-gray-700 items-center flex justify-between py-4">
            <Button variant={"ghost"} size={"icon"}>
                <ChevronLeftIcon className="w-6" />
            </Button>

            <div className="font-medium">March, 2024</div>

            <Button variant={"ghost"} size={"icon"}>
                <ChevronRightIcon className="w-6" />
            </Button>
        </div>
    );
};

export default MonthNavigation;
