"use server";

import connectDB from "@/lib/db";
import BudgetListResponse from "@/models/interfaces/BudgetListResponse";
import Budget from "@/models/schemas/Budget";
import CreateBudgetRequest from "@/models/interfaces/CreateBudgetRequest";
import { getCurrentUser } from "@/services/auth.services";

export async function createBudget(data: CreateBudgetRequest) {
  await connectDB();
  const user = await getCurrentUser();
  if (!user) {
    return { status: 401, message: "Unauthorized" };
  }

  const { year, name } = data;

  const newBudget = new Budget({
    year,
    months: [],
    name: name,
    creator: user.id,
    creatorName: user.name,
    contributors: [],
  });

  try {
    const savedBudget = await newBudget.save();

    return { status: 201, data: JSON.parse(JSON.stringify(savedBudget)) };
  } catch (error) {
    console.error("Error creating budget:", error);
    return { status: 500, message: "Failed to create budget" };
  }
}

export async function getBudgets() {
  await connectDB();
  const user = await getCurrentUser();
  if (!user || !(user?.email && user?.id)) {
    return { status: 401, message: "Unauthorized" };
  }

  try {
    const createdBudgets = await Budget.find({
      creator: user.id,
    });

    const contributionBudgets = await Budget.find({
      contributors: { $in: [user.email] },
    });

    const result: BudgetListResponse = {
      created: JSON.parse(JSON.stringify(createdBudgets)),
      contributes: JSON.parse(JSON.stringify(contributionBudgets)),
    };

    return { status: 200, data: result };
  } catch (error) {
    console.error("Error fetching budget:", error);
    return { status: 500, message: "Failed to fetch budget" };
  }
}
