import { ExpenseEnum } from "@/enums/ExpenseEnum";
import { IncomeEnum } from "@/enums/IncomeEnum";
import { MonthEnum } from "@/enums/MonthEnum";
import { SavingsEnum } from "@/enums/SavingsEnum";
import mongoose, { Schema, Document } from "mongoose";

export interface IExpense {
  category: ExpenseEnum;
  amount: number;
}

export interface IIncome {
  category: IncomeEnum;
  amount: number;
}

export interface ISaving {
  category: SavingsEnum;
  amount: number;
}

export interface IMonth {
  month: MonthEnum;
  expenses: IExpense[];
  incomes: IIncome[];
  savings: ISaving[];
}

export interface IYearBudget extends Document {
  year: string;
  months: IMonth[];
}

const ExpenseSchema = new Schema<IExpense>({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
});

const IncomeSchema = new Schema<IIncome>({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
});

const SavingSchema = new Schema<ISaving>({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
});

const MonthSchema = new Schema<IMonth>({
  month: { type: String, required: true },
  expenses: [ExpenseSchema],
  incomes: [IncomeSchema],
  savings: [SavingSchema],
});

const YearBudgetSchema = new Schema<IYearBudget>({
  year: { type: String, required: true },
  months: [MonthSchema],
});

const YearBudget = mongoose.model<IYearBudget>("YearBudget", YearBudgetSchema);

export default YearBudget;
