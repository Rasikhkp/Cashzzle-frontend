"use client";

import { emailSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";

const page = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async ({ email }: FieldValues) => {
    try {
      const {
        data: { success, message },
      } = await axios.post("http://localhost:1234/api/forget-password", {
        email,
      });

      if (success) {
        toast("Reset password link sent!", { description: message });
        reset();
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
        className="flex w-80 flex-col gap-5 mt-32"
      >
        <p className="text-gray-500 font-medium text-sm">
          Please enter your email address, we will send you a link for resetting
          your password
        </p>
        <input
          type="text"
          {...register("email")}
          className="py-4 text-sm px-8 border border-gray-400 rounded-xl outline-none focus:ring focus:ring-4 focus:ring-gray-300 transition-all"
          placeholder="Email Address"
        />
        {errors.email?.message && (
          <p className="text-red-500 text-xs mt-2">
            {errors.email?.message.toString()}
          </p>
        )}

        <button
          type="submit"
          className="py-4 px-8 text-white justify-center items-center bg-gray-800 hover:bg-gray-900 active:bg-black font-medium rounded-xl"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default page;
