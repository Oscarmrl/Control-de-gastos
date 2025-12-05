import { useReducer, type ReactNode } from "react";
import { BudgetContext } from "./BudgetContext";
import { budgetReducer, initialState } from "../reducers/budgetReducers";

type BudgetProviderProps = {
  children: ReactNode;
};

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
};
