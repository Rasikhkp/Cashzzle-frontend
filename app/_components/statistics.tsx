"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Pie from "./pie"
import { Progress } from '@/components/ui/progress'
import { randomizeColor } from '@/lib/utils'
import React from 'react'

const spending = [
    {
        id: "belanja",
        label: "belanja",
        value: 40,
        color: randomizeColor()
    },
    {
        id: "main",
        label: "main",
        value: 30,
        color: randomizeColor()
    },
    {
        id: "entertainment",
        labek: "entertainment",
        value: 100,
        color: randomizeColor()
    }
]

const income = [
    {
        id: "brc",
        label: "brc",
        value: 30,
        color: randomizeColor()
    },
    {
        id: "orang tua",
        label: "orang tua",
        value: 50,
        color: randomizeColor()
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
                    <Pie data={spending} label="Spending" />
                    <Pie data={income} label="Income" />
                </div>


            </CardContent>

        </Card>
    )
}

export default Statistics
