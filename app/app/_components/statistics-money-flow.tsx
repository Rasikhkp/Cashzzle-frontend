import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import React, { useState } from 'react'
import ChartLine from './chart-line'
import { randomizeNumber } from '@/lib/utils'
import { getMonthDates, getWeekDates } from '@/lib/date'
import { useSelector } from 'react-redux'
import { getTransactions } from '@/redux/store'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { addMonths, addWeeks, format, setDate, subMonths, subWeeks } from 'date-fns'
import { date } from 'zod'

type LineChartData = {
    id: string;
    data: {
        x: number;
        y: number;
    }[]
}

const line = [
    {
        id: "balance",
        data: Array.from({ length: 20 }, (_, i) => ({
            x: i + 1,
            y: randomizeNumber(500000, 1000000)
        }))
    },
    {
        id: "income",
        data: Array.from({ length: 20 }, (_, i) => ({
            x: i + 1,
            y: randomizeNumber(20000, 60000)
        }))
    },
    {
        id: "spending",
        data: Array.from({ length: 10 }, (_, i) => ({
            x: i + 1,
            y: randomizeNumber(30000, 100000)
        }))
    }
]

const StatisticsMoneyFlow = () => {
    const transactions = useSelector(getTransactions)
    const [period, setPeriod] = useState<"weekly" | "monthly">("weekly")
    const [weekDate, setWeekDate] = useState<number[]>([])
    const [month, setMonth] = useState('')
    const [dateAnchor, setDateAnchor] = useState(new Date())
    const [dates, setDates] = useState(getWeekDates(new Date()))

    const isMonth = () => dates.length > 7

    const prev = () => {
        if (isMonth()) {
            setDates(getMonthDates(subMonths(dateAnchor, 1)))
            setDateAnchor(subMonths(dateAnchor, 1))
        } else {
            setDates(getWeekDates(subWeeks(dateAnchor, 1)))
            setDateAnchor(subWeeks(dateAnchor, 1))
        }
    }

    const next = () => {
        if (isMonth()) {
            setDates(getMonthDates(addMonths(dateAnchor, 1)))
            setDateAnchor(addMonths(dateAnchor, 1))
        } else {
            setDates(getWeekDates(addWeeks(dateAnchor, 1)))
            setDateAnchor(addWeeks(dateAnchor, 1))
        }
    }

    const setChartData = () => {
        let income: LineChartData = {
            id: 'income',
            data: []
        };

        let spending: LineChartData = {
            id: 'spending',
            data: []
        };

        let balance: LineChartData = {
            id: 'balance',
            data: []
        }


        dates.forEach(date => {
            let incomeVal = 0;
            let spendingVal = 0;
            let balanceVal = 0;


            transactions.forEach(transaction => {
                if (format(date, 'dd-MM-yyyy') === format(new Date(transaction.time), 'dd-MM-yyyy')) {
                    if (transaction.type === 'income') {
                        incomeVal += Number(transaction.price)
                        balanceVal += Number(transaction.price)
                    } else {
                        spendingVal += Number(transaction.price)
                        balanceVal -= Number(transaction.price)
                    }
                }
            })

            income.data.push({
                x: date.getDate(),
                y: incomeVal
            })

            spending.data.push({
                x: date.getDate(),
                y: spendingVal
            })

            balance.data.push({
                x: date.getDate(),
                y: balanceVal
            })
        })

        return [income, spending, balance]
    }


    return (
        <>
            <div className='flex justify-between my-3'>
                <Menubar className="w-fit">
                    <MenubarMenu>
                        <MenubarTrigger onClick={() => setDates(getWeekDates(new Date()))} className='hover:bg-accent transition-all duration-300'>Weekly</MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger onClick={() => setDates(getMonthDates(new Date()))} className='hover:bg-accent transition-all duration-300'>Monthly</MenubarTrigger>
                    </MenubarMenu>
                </Menubar>

                <Menubar className="w-32 flex justify-between">
                    <button onClick={prev} className='p-1 hover:bg-accent rounded-sm'>
                        <ChevronLeftIcon />
                    </button>
                    <div className='text-xs font-medium px-2'>
                        {isMonth() ? format(dateAnchor, 'MMMM') : `${dates[0].getDate()} - ${dates[6].getDate()}`}
                    </div>
                    <button onClick={next} className='p-1 hover:bg-accent rounded-sm'>
                        <ChevronRightIcon />
                    </button>
                </Menubar>
            </div>

            <ChartLine data={setChartData()} month={isMonth() ? '' : format(dateAnchor, 'MMMM')} />
        </>
    )
}

export default StatisticsMoneyFlow
