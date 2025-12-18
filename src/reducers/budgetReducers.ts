import type { DraftExpense, Expense } from "../types";

export type BudgetActions =
  | { type: "add-budget"; payload: { budget: number } }
  | { type: "show_modal" }
  | { type: "close_modal" }
  | { type: "add-expense"; payload: { expense: DraftExpense } }
  | { type: "remove-expense"; payload: { id: Expense["id"] } }
  | { type: "get-expense-by-id"; payload: { id: Expense["id"] } }
  | { type: "update-expense"; payload: { expense: Expense } };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: Expense["id"];
};

export const initialState: BudgetState = {
  budget: 0,
  modal: false,
  expenses: [],
  editingId: "",
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

  if (action.type === "remove-expense") {
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      ),
    };
  }
  if (action.type === "get-expense-by-id") {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true,
    };
  }

  if (action.type === "update-expense") {
    return {
      ...state,
      expenses: state.expenses.map((expense) =>
        expense.id === action.payload.expense.id
          ? action.payload.expense
          : expense
      ),
      modal: false,
    };
  }
  return state;
};
