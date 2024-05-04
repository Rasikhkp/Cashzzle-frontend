"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { deleteFromLS, getFromLS } from "@/lib/utils";
import { setUser } from "@/redux/features/user-slice";
import { getUser } from "@/redux/store";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLButtonElement | null>(null);
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  console.log("user di user-profile", user)
  const router = useRouter();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    const userString = localStorage.getItem("active-user")
    dispatch(setUser(userString && JSON.parse(userString)))

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const logout = async () => {
    const {
      data: { success, message },
    } = await axios.get("http://localhost:1234/api/auth/logout", {
      withCredentials: true,
    });

    if (success) {
      localStorage.removeItem("active-user")
      dispatch(setUser(null))
      router.push("/login");
    } else {
      console.log(message);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (profileRef.current && !profileRef.current?.contains(e.target as Node)) {
      setShowProfile(false);
    }
  };

  return (
    <>
      {user ? (
        <button
          ref={profileRef}
          onClick={() => setShowProfile(!showProfile)}
          className="hover:ring-4 hover:ring-gray-200 active:ring-gray-300 transition-all rounded-full"
        >
          <Avatar>
            <AvatarImage
              src={
                user?.picture ||
                "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
              }
              alt="profile image"
            />
          </Avatar>
        </button>
      ) : (
        <Link
          href={'/login'}
          type="button"
          className="py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-200 active:bg-gray-300 transition-all"
        >
          Login
        </Link>
      )}

      <AnimatePresence>
        {showProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 pt-4 pb-2 absolute top-16 right-3 w-72 drop-shadow-[0_0_5px_rgba(0,0,0,0.25)] rounded-xl bg-white font-medium"
          >
            <div className="flex gap-4 pb-4 items-center border-b-2 border-gray-300">
              <Avatar>
                <AvatarImage
                  src={
                    user?.picture ||
                    "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
                  }
                  alt="image profile"
                />
              </Avatar>

              <div>
                <div className="text-sm mb-1 text-gray-800">{user?.name}</div>
                <div className="text-xs text-xs text-gray-600">
                  {user?.email}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={logout}
              className="w-full flex gap-4 mt-2 items-center hover:bg-gray-200 rounded-lg active:bg-gray-300 transition-all px-4 py-3 text-sm"
            >
              <ArrowLeftStartOnRectangleIcon className="w-4" />
              Log out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserProfile;
