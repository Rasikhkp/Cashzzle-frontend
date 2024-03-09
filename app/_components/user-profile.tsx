import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import React from 'react'

const UserProfile = () => {
    const isLoggedIn = true

    return (
        <div className='z-10 h-[68.5px] gap-4 flex items-center justify-end font-bold text-3xl fixed xl:w-[calc(378px)] w-[calc(33%-48px)] fixed bg-white/30 backdrop-blur-sm'>
            {isLoggedIn ? (
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            ) : (
                <>
                    <Button variant={"outline"}>Sign In</Button>
                    <Button>Sign Up</Button>
                </>
            )}

        </div>
    )
}

export default UserProfile
