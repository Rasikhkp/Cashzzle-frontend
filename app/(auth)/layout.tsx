"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const path = usePathname();
  const isRegister = () =>
    path.includes("register") || path.includes("reset-password");

  return (
    <div className="flex min-h-screen flex-col justify-between gap-3">
      <div className="w-full justify-between items-center py-3 px-6 flex">
        <Link href={"/app"} className="flex gap-3 group hover:underline">
          <ArrowLeftIcon className="w-4 group-hover:-translate-x-2 transition-all" />
          Back to app
        </Link>
        <Link href={isRegister() ? "/login" : "/register"}>
          <button
            type="button"
            className="py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-200 active:bg-gray-300 transition-all"
          >
            {isRegister() ? "Login" : "Sign up"}
          </button>
        </Link>
      </div>

      <div>{children}</div>

      <div className="w-full justify-center items-center py-10 border-y border-gray-200 flex">
        <Link
          href={isRegister() ? "/login" : "/register"}
          className="text-blue-500 hover:text-blue-400 transition-all hover:underline"
        >
          {isRegister()
            ? "Already have an account? Log in"
            : "Don't have an account? Sign up"}
        </Link>
      </div>
    </div>
  );
};

export default layout;
