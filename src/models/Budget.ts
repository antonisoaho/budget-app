import { ExpenseEnum } from "@/enums/ExpenseEnum";
import { IncomeEnum } from "@/enums/IncomeEnum";
import { MonthEnum } from "@/enums/MonthEnum";
import { SavingsEnum } from "@/enums/SavingsEnum";
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IExpense {
  category: ExpenseEnum;
  amount: number;
  amortization?: number;
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

export interface IBudget extends Document {
  creator: Types.ObjectId;
  year: string;
  months: IMonth[];
  contributors: string[];
}

const ExpenseSchema = new Schema<IExpense>({
  category: { type: String, required: true },
  amortization: { type: Number },
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

const BudgetSchema = new Schema<IBudget>({
  year: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  months: [MonthSchema],
  contributors: [{ type: String, required: true }],
});

const Budget =
  mongoose.models.Budget || mongoose.model<IBudget>("Budget", BudgetSchema);

export default Budget;
