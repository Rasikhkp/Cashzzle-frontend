"use client";

import { useSelector } from "react-redux";
import Transaction from "./transaction";
import { getCurrentDate, getTransactions } from "@/redux/store";
import { getDayAndDate } from "@/lib/utils";
import { format } from "date-fns";

const TransactonList = () => {
  let transactions = useSelector(getTransactions)
  console.log('transactions di transaction-list', transactions)
  const currentDate = useSelector(getCurrentDate);

  transactions = transactions.filter(
    (t) =>
      format(new Date(t.time), "MM-yyyy") === format(currentDate, "MM-yyyy"),
  );
  console.log("transactions after filtered", transactions)

  return (
    <div className="transaction-list flex text-sm py-3 flex-col gap-3 h-[85vh] border-b border-gray-700 overflow-y-scroll">
      {transactions?.map((t: any, i) => {
        return (
          <div key={i}>
            {new Date(t.time).getDate() !==
              new Date(transactions[i - 1]?.time).getDate() && (
                <div className="font-medium mb-3">{getDayAndDate(t.time)}</div>
              )}

            <Transaction data={t} />
          </div>
        );
      })}
    </div>
  );
};

export default TransactonList;
