"use client"

import { useDispatch, useSelector } from "react-redux";
import Transaction from "./transaction";
import { getCurrentDate, getTransactions } from "@/redux/store";
import { useEffect } from "react";
import { getDayAndDate, getFromLS } from "@/lib/utils";
import { fillTransactions } from "@/redux/features/transactions-slice";
import { format } from "date-fns";

const TransactonList = () => {
    const dontknow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let transactions = useSelector(getTransactions)
    const currentDate = useSelector(getCurrentDate)
    const dispatch = useDispatch()

    transactions = transactions.filter(t => format(new Date(t.time), 'MM-yyyy') === format(currentDate, 'MM-yyyy'))

    useEffect(() => {
        const data = getFromLS("transactions")

        if (data) {
            dispatch(fillTransactions(data))
        }

    }, [])

    return (
        <div className="transaction-list flex text-sm py-3 flex-col gap-3 h-[85vh] border-b border-gray-700 overflow-y-scroll">
            {transactions?.map((t: any, i) => {

                return (
                    <>
                        {new Date(t.time).getDate() !== new Date(transactions[i - 1]?.time).getDate() && (
                            <div className="font-medium">{getDayAndDate(t.time)}</div>
                        )}

                        <Transaction data={t} key={i} />
                    </>
                )
            })}
        </div>
    );
};

export default TransactonList;
