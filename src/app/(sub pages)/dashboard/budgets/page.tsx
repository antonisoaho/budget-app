import { getBudgetsAction } from "@/actions/budgets";
import BudgetLayout from "@/components/budget/budget-layout";
import React from "react";

async function BudgetsPage() {
  const budgets = await getBudgetsAction();

  return (
    <div className="flex flex-col md:flex-row h-full">
      <BudgetLayout
        budgets={budgets?.data || []}
        isCreator
      />
    </div>
  );
}

export default BudgetsPage;
