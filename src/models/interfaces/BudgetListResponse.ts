import { IBudget } from "@/models/schemas/Budget";

export default interface BudgetCreationResponse {
  created: IBudget[];
  contributes: IBudget[];
}
