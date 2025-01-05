import { auth } from "@/auth";
import React from "react";

async function UserPage({ params }: { params: { userId: string } }) {
  const getBudgets = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/budgets`);
  };

  const session = await auth();
  console.log("session", session);
  await getBudgets();
  return (
    <div className="flex justify-center h-screen">
      Welcome, {session?.user?.name ?? ""}
    </div>
  );
}

export default UserPage;
