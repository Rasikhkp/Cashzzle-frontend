"use client";

import { passwordSchema } from "@/schema/schema";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";

const page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const searchParams = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async ({ password }: FieldValues) => {
    try {
      const {
        data: { success, message },
      } = await axios.post("http://localhost:1234/api/new-password", {
        password,
        token: searchParams.get("token"),
      });

      if (success) {
        setIsSuccess(true);
        router.push("/login");
      } else {
        toast("Error", { description: message });
      }
    } catch (error) {
      console.log(error);
      toast("Error", { description: "Internal Server Error" });
    }
  };
  return (
    <div className="w-full flex justify-center">
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-80 flex-col gap-5 justify-center items-center mt-20"
      >
        <div className="text-3xl font-bold">Reset Password</div>
        <p className="text-gray-500 font-medium text-sm">
          Enter your new Password
        </p>

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="py-4 w-full text-sm px-8 border border-gray-400 rounded-xl outline-none focus:ring focus:ring-4 focus:ring-gray-300 transition-all"
            placeholder="Password"
          />
          {errors.password?.message && (
            <p className="text-red-500 text-xs mt-2">
              {errors.password?.message.toString()}
            </p>
          )}

          <button onClick={() => setShowPassword(!showPassword)} type="button">
            {showPassword ? (
              <EyeSlashIcon className="w-4 hover:text-gray-700 text-gray-900 active:text-gray-500 transition-all absolute right-4 top-5" />
            ) : (
              <EyeIcon className="w-4 hover:text-gray-700 text-gray-900 active:text-gray-500 transition-all absolute right-4 top-5" />
            )}
          </button>
        </div>

        <div className="relative w-full">
          <input
            type={showConfirm ? "text" : "password"}
            {...register("confirm")}
            className="py-4 w-full text-sm px-8 border border-gray-400 rounded-xl outline-none focus:ring focus:ring-4 focus:ring-gray-300 transition-all"
            placeholder="Confirm Password"
          />
          {errors.confirm?.message && (
            <p className="text-red-500 text-xs mt-2">
              {errors.confirm?.message.toString()}
            </p>
          )}

          <button onClick={() => setShowConfirm(!showConfirm)} type="button">
            {showConfirm ? (
              <EyeSlashIcon className="w-4 hover:text-gray-700 text-gray-900 active:text-gray-500 transition-all absolute right-4 top-5" />
            ) : (
              <EyeIcon className="w-4 hover:text-gray-700 text-gray-900 active:text-gray-500 transition-all absolute right-4 top-5" />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={isSuccess}
          className="py-4 px-8 text-white w-full justify-center items-center bg-gray-800 hover:bg-gray-900 active:bg-black font-medium rounded-xl"
        >
          Create New Password
        </button>
      </form>
    </div>
  );
};

export default page;
