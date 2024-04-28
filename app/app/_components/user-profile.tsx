"use client"

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

type User = {
    id: string,
    name: string,
    email: string,
    picture?: string,
    hashedPassword?: string
}

const UserProfile = () => {
    const [showProfile, setShowProfile] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const profileRef = useRef<HTMLButtonElement | null>(null);
    const router = useRouter()

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        const getUser = async () => {
            try {
                const { data: { success, message } } = await axios.get("http://localhost:1234/api/user", { withCredentials: true })
                console.log('message', message)

                if (success) {
                    setUser(message)
                } else {
                    console.log(message)
                }
            } catch (error) {
                console.log(error)
            }
        }

        getUser()

        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const logout = async () => {
        const { data: { success, message } } = await axios.get("http://localhost:1234/api/logout", { withCredentials: true })

        if (success) {
            router.push("/login")
        } else {
            console.log(message)
        }
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (
            profileRef.current &&
            !profileRef.current?.contains(e.target as Node)
        ) {
            setShowProfile(false);
        }
    };

    return (
        <div className='z-10 h-[68.5px] flex items-center justify-end font-bold text-3xl fixed xl:w-[calc(378px)] w-[calc(33%-48px)] fixed bg-white/30 backdrop-blur-sm pr-3'>
            {user ? (
                <button
                    ref={profileRef}
                    onClick={() => setShowProfile(!showProfile)}
                    className='hover:ring-4 hover:ring-gray-200 active:ring-gray-300 transition-all rounded-full'
                >
                    <Avatar>
                        <AvatarImage
                            src={user?.picture || "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"}
                            alt="profile image"
                        />
                    </Avatar>
                </button>
            ) : (
                <button onClick={() => router.push("/register")} type='button' className='py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-200 active:bg-gray-300 transition-all'>Sign up</button>
            )}

            <AnimatePresence>
                {showProfile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="px-4 pt-4 pb-2 absolute top-16 right-3 w-72 drop-shadow-[0_0_5px_rgba(0,0,0,0.25)] rounded-xl bg-white font-medium" >
                        <div className='flex gap-4 pb-4 items-center border-b-2 border-gray-300'>
                            <Avatar>
                                <AvatarImage src={user?.picture || "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"} alt="image profile" />
                            </Avatar>

                            <div>
                                <div className='text-sm mb-1 text-gray-800'>{user?.name}</div>
                                <div className='text-xs text-xs text-gray-600'>{user?.email}</div>
                            </div>
                        </div>
                        <button type='button' onClick={logout} className='w-full flex gap-4 mt-2 items-center hover:bg-gray-200 rounded-lg active:bg-gray-300 transition-all px-4 py-3 text-sm'>
                            <ArrowLeftStartOnRectangleIcon className='w-4' />
                            Log out
                        </button>
                    </motion.div >
                )}
            </AnimatePresence>
        </div>
    )
}

export default UserProfile
