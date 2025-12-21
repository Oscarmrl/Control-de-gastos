import { useReducer, type ReactNode } from "react";
import { BudgetContext } from "./BudgetContext";
import { budgetReducer, initialState } from "../reducers/budgetReducers";
import { useMemo } from "react";

type BudgetProviderProps = {
  children: ReactNode;
};

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalExpense = useMemo(() => {
    return state.expenses.reduce(
      (total, expense) => Number(expense.expenseAmount) + total,
      0
    );
  }, [state.expenses]);

  const remainigBudget = state.budget - totalExpense;

  return (
    <BudgetContext.Provider
      value={{ state, dispatch, totalExpense, remainigBudget }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
