import { Progress } from "@/components/ui/progress";
import { formatToRupiah } from "@/lib/utils";
import { getSpending, getSpendingLimit } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const StatisticsProgress = () => {
  const spending = useSelector(getSpending);
  const spendingLimit = useSelector(getSpendingLimit);

  const spendingProgress = () => {
    const percentage = Math.floor((spending / spendingLimit) * 100);

    return percentage > 100 ? 100 : percentage;
  };

  const spendingMessage = () => {
    const percentage = spendingProgress();

    if (percentage < 25) {
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
        {formatToRupiah(spending)}/{formatToRupiah(spendingLimit)}
      </div>
    </>
  );
};

export default StatisticsProgress;
