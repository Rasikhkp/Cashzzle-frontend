'use client'

import { CheckBadgeIcon, XCircleIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import BeatLoader from 'react-spinners/BeatLoader'

const page = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const searchParams = useSearchParams()


    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const { data: { success, message } } = await axios.post("http://localhost:1234/api/verify-email", {
                    token: searchParams.get("token")
                })

                if (success) {
                    setLoading(false)
                    console.log(message)
                } else {
                    setError(message)
                    setLoading(false)
                    console.log(message)
                }
            } catch (error: any) {
                setError(error.message.toString())
                console.log('catch tidak sukses')
                console.log(error)
            }
        }

        verifyEmail()

        // setTimeout(() => {
        //     setLoading(false)
        // }, 4000);
    }, [])
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='flex flex-col gap-5 items-center justify-center'>
                {loading ? (
                    <BeatLoader
                        color={'#6b7280'}
                        loading={true}
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                ) : error ? (
                    <XCircleIcon className='w-40' />
                ) : (
                    <CheckBadgeIcon className='w-40' />
                )}

                <div className='text-3xl font-bold'>
                    {loading ? "Verifying your Email" : error ? "Email not verified" : "Email verified"}
                </div>

                {error && (
                    <p className='text-2xl font-semibold'>{error}</p>
                )}

                {loading || error ? (
                    <Link href={'/register'}>
                        <button type="button" className='py-4 px-8 text-white justify-center items-center bg-gray-800 hover:bg-gray-900 active:bg-black font-medium rounded-xl'>
                            Back to Sign Up
                        </button>
                    </Link>
                ) : (
                    <Link href={'/login'}>
                        <button type="button" className='py-4 px-8 text-white justify-center items-center bg-gray-800 hover:bg-gray-900 active:bg-black font-medium rounded-xl'>
                            Back to Log in
                        </button>
                    </Link>
                )}

            </div>
        </div>
    )
}

export default page
