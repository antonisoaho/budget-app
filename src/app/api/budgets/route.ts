import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Budget from "@/models/Budget";
import BudgetListResponse from "@/models/BudgetListResponse";
import { auth } from "@/auth";
import getServerSession from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { authenticate } from "@/utils/auth";

export async function POST(req: Request) {
  await connectDB();

  try {
    const { year, months } = await req.json();

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

    return NextResponse.json(newBudget, { status: 201 });
  } catch (error) {
    console.error("Error creating budget:", error);
    return NextResponse.json(
      { message: "Failed to create budget" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest
): Promise<NextResponse<BudgetListResponse | any>> {
  await connectDB();
  // const s = authenticate(req);
  const s = await getServerSession(req, authConfig);

  const session = await auth();
  if (!session || !(session?.user?.email && session?.user?.id)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const createdBudgets = await Budget.find({
      creater: session.user.id,
    });

    const contributionBudgets = await Budget.find({
      contributors: { $in: [session.user.email] },
    });

    const result: BudgetListResponse = {
      created: createdBudgets,
      contributes: contributionBudgets,
    };

    console.log("result", result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching budget:", error);
    return NextResponse.json(
      { message: "Failed to fetch budget" },
      { status: 500 }
    );
  }
}
