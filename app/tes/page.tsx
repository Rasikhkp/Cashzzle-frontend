"use client"

import { Button } from '@/components/ui/button'
import useConfirm from '@/hooks/useConfirm'
import React from 'react'

const page = () => {
    const [Dialog, confirm] = useConfirm('Are you sure?', 'lorem lsdkjflajsd ladsjf lakdfj lakdsfjl ajfd jlsj ')

    const handleClick = async () => {
        console.log('masuk')
        const ans = await confirm()
        console.log(ans)
    }

    return (
        <div className='h-[700px]'>
            <Button onClick={handleClick}>munculkan</Button>

            {/*@ts-ignore*/}
            <Dialog />
        </div>
    )
}

export default page
