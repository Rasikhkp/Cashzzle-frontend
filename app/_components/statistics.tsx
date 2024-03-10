"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import ChartPie from "./chart-pie"
import { Progress } from '@/components/ui/progress'
import { randomizeColor, randomizeNumber } from '@/lib/utils'
import React from 'react'
import ChartLine from './chart-line'
import { Menubar, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { randomInt } from 'crypto'

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
    return (
        <Card className='mt-[69px]'>
            <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Visualize your financial data with insightful statistics.</CardDescription>
            </CardHeader>
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
                        <MenubarMenu>
                            <MenubarTrigger className='hover:bg-accent transition-all duration-300'><ChevronLeftIcon /></MenubarTrigger>
                        </MenubarMenu>
                        <div className='text-xs font-medium'>21 - 28</div>
                        <MenubarMenu>
                            <MenubarTrigger className='hover:bg-accent transition-all duration-300'><ChevronRightIcon /></MenubarTrigger>
                        </MenubarMenu>
                    </Menubar>
                </div>

                <ChartLine data={line} />


            </CardContent>

        </Card>
    )
}

export default Statistics
