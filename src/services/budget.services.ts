"use server";

import connectDB from "@/lib/db";
import Budget, { IBudget } from "@/models/schemas/Budget";

export const getOwnBudgets = async (userId: string) => {
  await connectDB();

  const budgets = await Budget.find({
    creator: userId,
  });

  return budgets;
};

export const getBudgetContributions = async (email: string) => {
  await connectDB();

  const budgets = await Budget.find({
    contributors: { $in: [email] },
  });

  return budgets;
};

export const createBudget = async (budget: IBudget) => {
  await connectDB();

  const newBudget = new Budget({
    ...budget,
  });

  const createdBudget = await newBudget.save();
  return createdBudget;
};

export const deleteBudget = async (budgetId: string, userId: string) => {
  const db = await connectDB();

  const budget = await Budget.findOne({ _id: budgetId, creator: userId });
  if (!budget) {
    throw new Error("Budget not found");
  }

  await budget.delete();
  return true;
};
