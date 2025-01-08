"use client";
import BudgetCard from "@/components/budget/budget-card";
import BudgetDialog from "@/components/budget/budget-popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IBudget } from "@/models/schemas/Budget";
import React from "react";

interface BudgetLayoutProps {
  budgets: IBudget[];
  isCreator?: boolean;
}

const BudgetLayout = ({ budgets, isCreator }: BudgetLayoutProps) => {
  return (
    <Card className="flex flex-col gap-y-4 w-full p-6 border shadow h-full">
      <CardHeader className="flex flex-row justify-between items-center w-full h-[36px]">
        <CardTitle className="text-lg">
          {isCreator ? "My Budgets" : "Participant Budgets"}
        </CardTitle>
        {isCreator && <BudgetDialog />}
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {budgets.length > 0 ? (
          budgets.map((budget, index) => (
            <BudgetCard
              key={index}
              budget={budget}
            />
          ))
        ) : (
          <h4>No Budgets Yet</h4>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetLayout;
