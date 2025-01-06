import { createBudget, getBudgets } from "@/actions/budgets";
import BudgetLayout from "@/components/budget/budget-layout";
import CreateBudgetRequest from "@/models/CreateBudgetRequest";
import React from "react";

async function UserPage({ params }: { params: { userId: string } }) {
  const budgets = await getBudgets();

  if (budgets.status !== 200 || !budgets.data) {
    return <div>Error fetching budgets</div>;
  }

  return (
    <div className="flex flex-col md:flex-row h-full gap-4">
      <BudgetLayout
        budgets={budgets.data.created}
        isCreator
      />
      <BudgetLayout budgets={budgets.data.contributes} />
    </div>
  );
}

export default UserPage;
