"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IBudget } from "@/models/Budget";
import { ClipboardPlus } from "lucide-react";
import React from "react";

interface BudgetLayoutProps {
  budgets: IBudget[];
  isCreator?: boolean;
}

const BudgetLayout = ({ budgets, isCreator }: BudgetLayoutProps) => {
  return (
    <Card className="flex flex-col gap-y-4 w-full">
      <CardHeader className="flex flex-row justify-between items-center w-full">
        <h1 className="text-left scroll-m-20 text-2xl font-bold">
          {isCreator ? "My Budgets" : "Participant Budgets"}
        </h1>
        {isCreator && (
          <Button className="ml-auto">
            <ClipboardPlus className="mr-2" /> Add
          </Button>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-4 w-full">
        {budgets.map((budget) => (
          <div key={budget._id as string}>{budget.year}</div>
        ))}
      </CardContent>
    </Card>
  );
};

export default BudgetLayout;
