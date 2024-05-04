import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import React, { useState } from "react";
import ChartLine from "./chart-line";
import { getMonthDates, getWeekDates, getWeekMonthRange } from "@/lib/date";
import { useSelector } from "react-redux";
import { getTransactions } from "@/redux/store";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import {
  addMonths,
  addWeeks,
  eachDayOfInterval,
  format,
  subMonths,
  subWeeks,
} from "date-fns";

const StatisticsMoneyFlow = () => {
  const transactions = useSelector(getTransactions);
  const [dateAnchor, setDateAnchor] = useState(new Date());
  const [dates, setDates] = useState(getWeekDates(new Date()));

  const isMonth = () => dates.length > 7;

  const currentMonth = () => {
    setDates(getMonthDates(new Date()));
    setDateAnchor(new Date());
  }

  const currentWeek = () => {
    setDates(getWeekDates(new Date()));
    setDateAnchor(new Date());
  }

  const prev = () => {
    if (isMonth()) {
      setDates(getMonthDates(subMonths(dateAnchor, 1)));
      setDateAnchor(subMonths(dateAnchor, 1));
    } else {
      setDates(getWeekDates(subWeeks(dateAnchor, 1)));
      setDateAnchor(subWeeks(dateAnchor, 1));
    }
  };

  const next = () => {
    if (isMonth()) {
      setDates(getMonthDates(addMonths(dateAnchor, 1)));
      setDateAnchor(addMonths(dateAnchor, 1));
    } else {
      setDates(getWeekDates(addWeeks(dateAnchor, 1)));
      setDateAnchor(addWeeks(dateAnchor, 1));
    }
  };

  const getMoneyFlow = () => {
    if (transactions[0]) {
      const firstTransactionDate = new Date(transactions[0].time);

      const dates = eachDayOfInterval({
        start: firstTransactionDate,
        end: new Date(),
      });

      const income = dates.map((date) => {
        return {
          x: date,
          y: transactions
            .filter(
              (t) =>
                (format(new Date(t.time), "dd-MM-yyyy") === format(date, "dd-MM-yyyy"))
                &&
                t.type === "income",
            )
            .map((t) => Number(t.price))
            .reduce((acc, curr) => acc + curr, 0)
        };
      });

      const spending = dates.map((date) => {
        return {
          x: date,
          y: transactions
            .filter(
              (t) =>
                (format(new Date(t.time), "dd-MM-yyyy") === format(date, "dd-MM-yyyy"))
                &&
                t.type === "spending"

            )
            .map((t) => Number(t.price))
            .reduce((acc, curr) => acc + curr, 0)
        };
      });

      let balanceVal = 0;

      const balance = dates.map((date) => {
        balanceVal += transactions
          .filter(
            (t) =>
              format(new Date(t.time), "dd-MM-yyyy") ===
              format(date, "dd-MM-yyyy"),
          )
          .reduce(
            (acc, curr) =>
              curr.type === "income"
                ? acc + Number(curr.price)
                : acc - Number(curr.price),
            0,
          )

        return {
          x: date,
          y: balanceVal,
        };
      });

      return [
        {
          id: "income",
          data: income,
        },
        {
          id: "spending",
          data: spending,
        },
        {
          id: "balance",
          data: balance,
        },
      ];

    } else {
      return [
        {
          id: "income",
          data: [{ x: new Date(), y: null }],
        },
        {
          id: "spending",
          data: [{ x: new Date(), y: null }],
        },
        {
          id: "balance",
          data: [{ x: new Date(), y: null }],
        },
      ];

    }
  };


  const setChartData = () => {
    const categories = ["income", "spending", "balance"];

    const getChartData = (categoryIndex: number) => {
      const categoryData = getMoneyFlow()[categoryIndex].data;

      return dates.map((date) => {
        const transaction = categoryData.find(
          (data) => format(data.x, 'dd-MM-yyyy') === format(date, 'dd-MM-yyyy')
        );

        return {
          x: date.getDate(),
          y: transaction ? transaction.y : null
        };
      });
    };

    const chartData = categories.map((category, index) => ({
      id: category,
      data: getChartData(index)
    }));

    return chartData;
  };

  return (
    <>
      <div className="flex justify-between my-3">
        <Menubar className="w-fit">
          <MenubarMenu>
            <MenubarTrigger
              onClick={currentWeek}
              className="hover:bg-accent transition-all duration-300"
            >
              Weekly
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              onClick={currentMonth}
              className="hover:bg-accent transition-all duration-300"
            >
              Monthly
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>

        <Menubar className="w-[140px] flex justify-between">
          <button onClick={prev} className="p-1 hover:bg-accent rounded-sm">
            <ChevronLeftIcon />
          </button>
          <div className="text-xs font-medium px-2">
            {isMonth()
              ? format(dates[0], "MMM, yy")
              : `${dates[0].getDate()} - ${dates[6].getDate()}`}
          </div>
          <button onClick={next} className="p-1 hover:bg-accent rounded-sm">
            <ChevronRightIcon />
          </button>
        </Menubar>
      </div>

      <ChartLine
        data={setChartData()}
        month={isMonth() ? "" : getWeekMonthRange(dates) + ", " + new Date().getFullYear()}
      />
    </>
  );
};

export default StatisticsMoneyFlow;
