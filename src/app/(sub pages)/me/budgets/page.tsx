import { getBudgets } from "@/actions/budgets";
import BudgetLayout from "@/components/budget/budget-layout";
import React from "react";

async function BudgetsPage() {
  const budgets = await getBudgets();

  if (!budgets.data) {
    return <div>Error fetching budgets</div>;
  }

  return (
    <div className="flex flex-col md:flex-row h-full">
      <BudgetLayout
        budgets={budgets.data.created}
        isCreator
      />
      <BudgetLayout budgets={budgets.data.contributes} />
    </div>
  );
}

export default BudgetsPage;
