import { createContext } from "react";
import type { BudgetActions } from "../reducers/budgetReducers";
import type { BudgetState } from "../reducers/budgetReducers";
export type BudgetContextProps = {
  state: BudgetState;
  dispatch: React.Dispatch<BudgetActions>;
};
export const BudgetContext = createContext<BudgetContextProps>(
  {} as BudgetContextProps
);
