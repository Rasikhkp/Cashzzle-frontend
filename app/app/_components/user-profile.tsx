"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter()
  const { user } = useKindeBrowserClient()
  console.log("user di user-profile", user)

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    if (profileRef.current && !profileRef.current?.contains(e.target as Node)) {
      setShowProfile(false);
    }
  };

  const login = () => {
    router.push("api/auth/login?post_login_redirect_url=/app")
  }

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
        <button
          onClick={login}
          type="button"
          className="py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-200 active:bg-gray-300 transition-all"
        >
          Login
        </button>
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
                <div className="text-sm mb-1 text-gray-800">{`${user?.given_name} ${user?.family_name}`}</div>
                <div className="text-xs text-xs text-gray-600">
                  {user?.email}
                </div>
              </div>
            </div>
            <LogoutLink
              className="w-full flex gap-4 mt-2 items-center hover:bg-gray-200 rounded-lg active:bg-gray-300 transition-all px-4 py-3 text-sm"
            >
              <ArrowLeftStartOnRectangleIcon className="w-4" />
              Log out
            </LogoutLink>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserProfile;
