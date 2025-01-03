import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import YearBudget from "@/models/Budget";

export async function POST(req: Request) {
  await connectDB();

  try {
    const { year, months } = await req.json();

    const newBudget = new YearBudget({
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
