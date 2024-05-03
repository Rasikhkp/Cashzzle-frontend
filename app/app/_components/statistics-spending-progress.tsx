import { Progress } from "@/components/ui/progress";
import { formatToRupiah } from "@/lib/utils";
import { getCurrentSpendingLimit, getSpending } from "@/redux/store";
import { ReceiptPercentIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useSelector } from "react-redux";

const StatisticsProgress = () => {
  const spending = useSelector(getSpending);
  const spendingLimit = useSelector(getCurrentSpendingLimit);

  const spendingProgress = () => {
    let percentage

    if (spendingLimit) {
      percentage = Math.floor((spending / Number(spendingLimit)) * 100);
    } else {
      percentage = 0
    }

    return percentage >= 100 ? 100 : percentage;
  };

  const spendingMessage = () => {
    const percentage = spendingProgress();

    if (!spendingLimit || spendingLimit === '0') {
      return "Spending limit has'nt set yet!"
    } else if (percentage < 25) {
      return "Staying on track. Keep managing expenses well.";
    } else if (percentage > 25 && percentage < 50) {
      return "Watch spending. Aim to stay within budget.";
    } else if (percentage > 50 && percentage < 75) {
      return "Approaching limit. Be mindful of expenses.";
    } else if (percentage > 75 && percentage < 100) {
      return "Almost there! Review spending to stay within limit.";
    } else {
      return "Limit exceeded. Immediate review and adjustment required.";
    }
  };

  return (
    <>
      <div className="text-xs text-muted-foreground">{spendingMessage()}</div>
      <Progress value={spendingProgress()} className="my-2" />
      <div className="text-xs text-muted-foreground">
        {formatToRupiah(spending)}/{formatToRupiah(Number(spendingLimit) || 0)}
      </div>
    </>
  );
};

export default StatisticsProgress;
