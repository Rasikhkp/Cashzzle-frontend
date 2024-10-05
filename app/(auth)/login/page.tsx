"use client";
import googleIcon from "@/public/icons/google.svg";
import React, { useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema/schema";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/features/user-slice";

const page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch()

  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async ({ email, password }: FieldValues) => {
    try {
      const {
        data: { success, message },
      } = await axios.post(
        "http://localhost:1234/api/auth/login",
        { email, password },
        { withCredentials: true },
      );
      console.log(message);

      if (success) {
        reset();
        setIsSuccess(true);
        dispatch(setUser(message))

        router.push("/app");
      } else {
        toast("Error", { description: message });
      }
    } catch (error: any) {
      console.log(error);
      toast("Error", {
        description: error.message,
      });
    }
  };

  const googleAuth = async () => {
    router.push("http://localhost:1234/auth/google");
  };

  return (
    <>
      <div className="w-fit mx-auto mt-10">
        <Toaster />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mt-10 w-80"
        >
          <div className="text-3xl font-bold mx-auto">Login to Cashzzle</div>
          <div className="w-full">
            <input
              type="text"
              {...register("email")}
              className="py-4 w-full text-sm px-8 border border-gray-400 rounded-xl outline-none focus:ring focus:ring-4 focus:ring-gray-300 transition-all"
              placeholder="Email Address"
            />
            {errors.email?.message && (
              <p className="text-red-500 text-xs mt-2">
                {errors.email?.message.toString()}
              </p>
            )}
          </div>
          <div className="relative">
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

            <button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-4 hover:text-gray-700 text-gray-900 active:text-gray-500 transition-all absolute right-4 top-5" />
              ) : (
                <EyeIcon className="w-4 hover:text-gray-700 text-gray-900 active:text-gray-500 transition-all absolute right-4 top-5" />
              )}
            </button>
          </div>

          <div className="flex justify-end">
            <Link
              href="/forget-password"
              className="text-xs text-blue-500 hover:text-blue-400 transition-all float-right underline hover:no-underline"
            >
              Forget Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSuccess}
            className="py-4 px-8 text-white justify-center items-center bg-gray-800 hover:bg-gray-900 active:bg-black font-medium rounded-xl"
          >
            Log in
          </button>

          <Separator />

          <button
            type="button"
            onClick={googleAuth}
            className="py-4 px-8 text-gray-600 flex gap-5 justify-center items-center border-2 border-gray-400 hover:bg-gray-200 active:bg-gray-300 transition-all font-medium rounded-xl"
          >
            <Image src={googleIcon} alt="google icon" width={20} />
            Continue with Google
          </button>
        </form>
      </div>
    </>
  );
};

export default page;
