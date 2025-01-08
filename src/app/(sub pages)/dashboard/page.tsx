import DashboardCard from "@/components/dashboard/dashboard-card";
import Link from "next/link";
import React from "react";

async function UserPage({ params }: { params: { userId: string } }) {
  return (
    <div className="flex flex-col md:flex-row h-full">
      <DashboardCard
        title={"My budgets"}
        subtitle="Your own created budgets"
      >
        <Link href={`/${params.userId}/budgets`}>Click me</Link>
      </DashboardCard>
    </div>
  );
}

export default UserPage;
