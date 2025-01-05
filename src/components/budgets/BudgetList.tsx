import BudgetInfo from "@/components/budgets/BudgetInfo";
import { IBudget } from "@/models/Budget";
import React from "react";

interface BudgetListProps {
  budgets: Array<IBudget>;
}

const BudgetList = ({ budgets }: BudgetListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {budgets.map((budget) => (
        <BudgetInfo Budget={budget} />
      ))}
    </div>
  );
};

export default BudgetList;
