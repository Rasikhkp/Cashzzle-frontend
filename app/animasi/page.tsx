"use client"

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const page = () => {
    const [open, setOpen] = useState(false)

    return (
        <div className='flex gap-5'>
            <AnimatePresence>
                {open && (

                    <motion.div
                        className='bg-blue-400 w-40 overflow-clip'
                        initial={{
                            height: 0,
                            overflow: 'clip'
                        }}
                        animate={{
                            height: 100,
                            x: 80,
                            overflow: 'visible',
                            transition: {
                                overflow: {
                                    delay: .5
                                }
                            }
                        }}
                        exit={{
                            height: 0,
                            x: 0,
                            overflow: "clip"
                        }}
                    >Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.</motion.div>
                )}
            </AnimatePresence>

            <Button className='absolute left-60 top-0' onClick={() => setOpen(!open)}>open or close</Button>

        </div >
    )
}

export default page 
