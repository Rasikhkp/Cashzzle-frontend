import React from "react";
import ChartPie from "./chart-pie";
import { useSelector } from "react-redux";
import { getCategories, getTransactions } from "@/redux/store";

const StatisticsIncomeSpendingByCategories = () => {
  const transactions = useSelector(getTransactions);
  const categories = useSelector(getCategories);

  const dataByCategory = (type: string) => {
    const categoryData = categories.map((category) => {
      const categoryValue = transactions.reduce((acc, transaction) => {
        if (
          transaction.categoryId === category.id &&
          transaction.type === type
        ) {
          acc += Number(transaction.price);
        }

        return acc;
      }, 0);

      return {
        id: category.name,
        label: category.name,
        value: categoryValue,
      };
    });

    const unknownTransactionValue = transactions.reduce((acc, transaction) => {
      if (transaction.categoryId === "" && transaction.type === type) {
        acc += Number(transaction.price);
      }

      return acc;
    }, 0);

    if (unknownTransactionValue > 0) {
      categoryData.push({
        id: "Unknown Transaction",
        label: "Unknown Transaction",
        value: unknownTransactionValue,
      });
    }

    return categoryData;
  };

  return (
    <div className="flex gap-3">
      <ChartPie data={dataByCategory("spending")} label="Spending" />
      <ChartPie data={dataByCategory("income")} label="Income" />
    </div>
  );
};

export default StatisticsIncomeSpendingByCategories;
