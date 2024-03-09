import Image from 'next/image'
import React, { useState } from 'react'
import food from "@/public/food.svg";
import { Card } from '@/components/ui/card';

const CategoriesChooseIcon = () => {
    const [openChooseIcon, setOpenChooseIcon] = useState(false)
    return (
        <div className='relative'>
            <button onClick={() => setOpenChooseIcon(!openChooseIcon)} type='button' className="flex border border-gray-800 rounded-lg items-center justify-center w-[38px] h-[38px]">
                <Image
                    src={food}
                    width={24}
                    alt="food"
                />
            </button>

            {openChooseIcon && (
                <Card className='absolute right-0 bottom-[150%] p-3 flex flex-wrap w-[220px] justify-center gap-3'>
                    {Array.from({ length: 16 }, (_, i) => (
                        <button type='button' key={i} className="flex border border-gray-800 rounded-lg items-center justify-center w-[38px] h-[38px]">
                            <Image
                                src={food}
                                width={24}
                                alt="food"
                            />
                        </button>
                    ))}
                </Card>
            )}
        </div>
    )
}

export default CategoriesChooseIcon
