"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ChartPie from "./chart-pie"
import { Progress } from '@/components/ui/progress'
import { randomizeColor, randomizeNumber } from '@/lib/utils'
import React, { useState } from 'react'
import ChartLine from './chart-line'
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ChevronDoubleUpIcon } from '@heroicons/react/24/outline'

const spending = [
    {
        id: "belanja",
        label: "belanja",
        value: 300000,
        color: randomizeColor()
    },
    {
        id: "main",
        label: "main",
        value: 300000,
        color: randomizeColor()
    },
    {
        id: "entertainment",
        label: "entertainment",
        value: 300000,
        color: randomizeColor()
    }
]

const income = [
    {
        id: "brc",
        label: "brc",
        value: 300000,
        color: randomizeColor()
    },
    {
        id: "orang tua",
        label: "orang tua",
        value: 300000,
        color: randomizeColor()
    }
]

const line = [
    {
        id: "balance",
        color: '#240A34',
        data: Array.from({ length: 30 }, (_, i) => ({
            x: i + 1,
            y: randomizeNumber(500000, 1000000)
        }))
    },
    {
        id: "income",
        color: '#891652',
        data: Array.from({ length: 30 }, (_, i) => ({
            x: i + 1,
            y: randomizeNumber(20000, 60000)
        }))
    },
    {
        id: "spending",
        color: "#EABE6C",
        data: Array.from({ length: 30 }, (_, i) => ({
            x: i + 1,
            y: randomizeNumber(30000, 100000)
        }))
    }
]

const Statistics = () => {
    const [open, setOpen] = useState(true)

    const openView = () => {
        if (!open) {
            setOpen(true)
        }
    }

    return (
        <Card className='mt-[69px] mb-5'>
            <CardHeader onClick={openView} className={`${open ? "" : "cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-all"}`}>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Visualize your financial data with insightful statistics.</CardDescription>
            </CardHeader>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="overflow-clip"
                        initial={{ height: 0 }}
                        animate={{
                            height: "",
                            transition: {
                                type: "spring"
                            }
                        }}
                        exit={{
                            height: 0,
                            transition: {
                                type: "easeOut",
                                duration: .1
                            }
                        }}
                        transition={{ type: "spring" }}
                    >
                        <CardContent>
                            <div className='text-sm font-medium mb-5'>Spending progress</div>
                            <div className='text-xs text-muted-foreground'>Stay mindful of your spending.</div>
                            <Progress value={60} className='my-2' />
                            <div className='text-xs text-muted-foreground'>Rp 300.000/Rp 1.000.000</div>

                            <div className="text-sm my-5 font-medium">Spending and income by category</div>
                            <div className='flex gap-3'>
                                <ChartPie data={spending} label="Spending" />
                                <ChartPie data={income} label="Income" />
                            </div>

                            <div className="text-sm my-5 font-medium">Balance, Spending, and income</div>
                            <div className='flex justify-between my-3'>
                                <Menubar className="w-fit">
                                    <MenubarMenu>
                                        <MenubarTrigger className='hover:bg-accent transition-all duration-300'>Weekly</MenubarTrigger>
                                    </MenubarMenu>
                                    <MenubarMenu>
                                        <MenubarTrigger className='hover:bg-accent transition-all duration-300'>Monthly</MenubarTrigger>
                                    </MenubarMenu>
                                </Menubar>

                                <Menubar className="w-fit">
                                    <button className='p-1 hover:bg-accent rounded-sm'>
                                        <ChevronLeftIcon />
                                    </button>
                                    <div className='text-xs font-medium px-2'>21 - 28</div>
                                    <button className='p-1 hover:bg-accent rounded-sm'>
                                        <ChevronRightIcon />
                                    </button>
                                </Menubar>
                            </div>

                            <ChartLine data={line} />

                        </CardContent>
                    </motion.div>
                )}
            </AnimatePresence>

            {open && (
                <div className="w-full flex justify-center">
                    <Button onClick={() => setOpen(false)} variant={"ghost"} size={"icon"} >
                        <ChevronDoubleUpIcon className="w-3" />
                    </Button>
                </div>
            )}
        </Card>
    )
}

export default Statistics
