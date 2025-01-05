import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IBudget } from "@/models/Budget";
import React from "react";

interface BudgetInfoProps {
  Budget: IBudget;
}

const BudgetInfo = ({ Budget }: BudgetInfoProps) => {
  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default BudgetInfo;
