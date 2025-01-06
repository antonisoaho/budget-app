"use server";

import connectDB from "@/lib/db";
import BudgetListResponse from "@/models/BudgetListResponse";
import { auth } from "@/auth";
import Budget from "@/models/Budget";
import { myBudgets } from "@/mock/mybudgets";
import { contributionBudgets } from "@/mock/contributorbudgets";
import CreateBudgetRequest from "@/models/CreateBudgetRequest";
import { getCurrentUser } from "@/services/auth.services";

export async function createBudget(data: CreateBudgetRequest) {
  await connectDB();
  const user = await getCurrentUser();

  if (!user) {
    return { status: 401, message: "Unauthorized" };
  }

  try {
    const { year, name } = data;

    const newBudget = new Budget({
      year,
      months: [],
      name: name,
      creator: user.id,
      creatorName: user.name,
      contributors: [],
    });

    await newBudget.save();

    return { status: 201, data: newBudget };
  } catch (error) {
    console.error("Error creating budget:", error);
    return { status: 500, message: "Failed to create budget" };
  }
}

export async function getBudgets() {
  await connectDB();
  const session = await auth();
  console.log("session", session);

  if (!session || !(session?.user?.email && session?.user?.id)) {
    return { status: 401, message: "Unauthorized" };
  }

  try {
    // const createdBudgets = await Budget.find({
    //   creater: session.user.id,
    // });

    // const contributionBudgets = await Budget.find({
    //   contributors: { $in: [session.user.email] },
    // });

    const result: BudgetListResponse = {
      created: JSON.parse(myBudgets),
      contributes: JSON.parse(contributionBudgets),
    };

    return { status: 200, data: result };
  } catch (error) {
    console.error("Error fetching budget:", error);
    return { status: 500, message: "Failed to fetch budget" };
  }
}
