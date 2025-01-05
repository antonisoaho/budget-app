import connectDB from "@/lib/db";
import BudgetListResponse from "@/models/BudgetListResponse";
import { auth } from "@/auth";
import Budget from "@/models/Budget";
import { myBudgets } from "@/mock/mybudgets";
import { contributionBudgets } from "@/mock/contributorbudgets";

export async function createBudget(data: { year: number; months: any[] }) {
  await connectDB();

  try {
    const { year, months } = data;

    const newBudget = new Budget({
      year,
      months: months.map((month: any) => ({
        month: month.month,
        expenses: month.expenses.map((expense: any) => ({
          category: expense.category,
          amount: expense.amount,
        })),
        incomes: month.incomes.map((income: any) => ({
          category: income.category,
          amount: income.amount,
        })),
        savings: month.savings.map((saving: any) => ({
          category: saving.category,
          amount: saving.amount,
        })),
      })),
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
