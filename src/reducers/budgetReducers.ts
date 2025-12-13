import type { DraftExpense, Expense } from "../types";

export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show_modal" }
  | { type: "close_modal" }
  | { type: "add-expense"; payload: { expense: DraftExpense } };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
};

export const initialState: BudgetState = {
  budget: 0,
  modal: false,
  expenses: [],
};

export const budgetReducer = (
  state: BudgetState,
  action: BudgetActions
): BudgetState => {
  if (action.type === "add-budget") {
    return { ...state, budget: action.payload.budget };
  }
  if (action.type === "show_modal") {
    return { ...state, modal: true };
  }
  if (action.type === "close_modal") {
    return { ...state, modal: false };
  }
  if (action.type === "add-expense") {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      ...action.payload.expense,
    };
    return {
      ...state,
      expenses: [...state.expenses, newExpense],
      modal: false,
    };
  }
  return state;
};
