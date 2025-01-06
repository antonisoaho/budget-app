import { getBudgets } from "@/actions/budgets";
import BudgetLayout from "@/components/budget/budget-layout";
import DashboardCard from "@/components/dashboard/dashboard-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

async function UserPage({ params }: { params: { userId: string } }) {
  const budgets = await getBudgets();

  if (budgets.status !== 200 || !budgets.data) {
    return <div>Error fetching budgets</div>;
  }

  return (
    <div className="flex flex-col md:flex-row h-full">
      <DashboardCard
        title={"My budgets"}
        subtitle="Your own created budgets"
      >
        <Link href={`/${params.userId}/budgets`}>Click me</Link>
      </DashboardCard>
      {/* <BudgetLayout
        budgets={budgets.data.created}
        isCreator
      />
      <BudgetLayout budgets={budgets.data.contributes} /> */}
    </div>
  );
}

export default UserPage;
