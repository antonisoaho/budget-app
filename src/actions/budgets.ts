"use server";

import Budget from "@/models/schemas/Budget";
import { z } from "zod";
import { authActionClient } from "@/lib/safe-action";
import {
  createBudget,
  deleteBudget,
  getBudgetContributions,
  getOwnBudgets,
} from "@/services/budget.services";

const createBudgetSchema = z.object({
  year: z.number(),
  name: z.string(),
});

export const getBudgetsAction = authActionClient
  .metadata({ actionName: "getOwnBugets" })
  .action(async ({ ctx: { user } }) => {
    const budgets = await getOwnBudgets(user.id);

    return JSON.parse(JSON.stringify(budgets));
  });

export const getContributionBudgetsAction = authActionClient
  .metadata({ actionName: "getContributionBudgets " })
  .action(async ({ ctx: { user } }) => {
    const budgets = await getBudgetContributions(user.id);

    return JSON.parse(JSON.stringify(budgets));
  });

export const createBudgetAction = authActionClient
  .metadata({ actionName: "createBudget" })
  .schema(createBudgetSchema)
  .action(async ({ parsedInput: { year, name }, ctx: { user } }) => {
    const newBudget = new Budget({
      year,
      months: [],
      name: name,
      creator: user.id,
      creatorName: user.name,
      contributors: [],
    });

    const savedBudget = await createBudget(newBudget);
    return JSON.parse(JSON.stringify(savedBudget));
  });

export const deleteBudgetAction = authActionClient
  .metadata({ actionName: "deteleBudget" })
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput: { id }, ctx: { user } }) => {
    const success = await deleteBudget(id, user.id);

    return success;
  });
