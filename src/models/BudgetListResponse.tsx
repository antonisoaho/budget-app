import { IBudget } from "@/models/Budget";

export default interface BudgetCreationResponse {
  created: IBudget[];
  contributes: IBudget[];
}
