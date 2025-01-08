import { myBudgets } from "@/mock/mybudgets";
import { IBudget } from "@/models/schemas/Budget";
import React from "react";

const BudgetPage = () => {
  const budget: IBudget = JSON.parse(myBudgets)[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {budget.months.map((month) => (
        <div
          key={month._id}
          className="flex flex-col gap-y-4"
        >
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-row justify-between items-center">
              <div className="text-left text-lg font-semibold leading-none">
                {month.month}
              </div>
              <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                {month.expenses
                  .map((expense) => expense.amount)
                  .reduce((a, b) => a + b, 0)}
              </div>
            </div>
            {month.expenses.map((expense) => (
              <div
                key={expense._id}
                className="flex flex-row justify-between items-center"
              >
                <div className="text-left text-lg font-semibold leading-none">
                  {expense.category}
                </div>
                <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                  {expense.amount}
                </div>
              </div>
            ))}
            {month.incomes.map((income) => (
              <div
                key={income._id}
                className="flex flex-row justify-between items-center"
              >
                <div className="text-left text-lg font-semibold leading-none">
                  {income.category}
                </div>
                <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                  {income.amount}
                </div>
              </div>
            ))}
            {month.savings.map((saving) => (
              <div
                key={saving._id}
                className="flex flex-row justify-between items-center"
              >
                <div className="text-left text-lg font-semibold leading-none">
                  {saving.category}
                </div>
                <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
                  {saving.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BudgetPage;
