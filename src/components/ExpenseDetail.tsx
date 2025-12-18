import { useMemo } from "react";
import { formatDate } from "../helpers";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import { useBudget } from "../hooks/useBudget";
import "react-swipeable-list/dist/styles.css";
import type { Expense } from "../types";
import DisplayAmount from "./DisplayAmount";
import { categories } from "../Data/Categories";

type ExpenseDetailProps = {
  expense: Expense;
};

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const { dispatch } = useBudget();
  const categoryInfo = useMemo(
    () => categories.find((cat) => cat.id === expense.expenseCategory),
    [expense.expenseCategory]
  );

  if (!categoryInfo) {
    return null; // o un fallback visual
  }

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() =>
          dispatch({ type: "get-expense-by-id", payload: { id: expense.id } })
        }
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() =>
          dispatch({ type: "remove-expense", payload: { id: expense.id } })
        }
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={30}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white shadow-lg p-10 w-full border-b border-b-gray-200 flex gap-5">
          <div className="">
            <img
              src={`/icono_${categoryInfo.icon}.svg`}
              alt={categoryInfo.name}
              className="w-20"
            />
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500">
              {categoryInfo.name}
            </p>
            <p>{expense.expenseName}</p>
            <p className=" text-slate-600 text-sm">
              {formatDate(expense.expenseDate!.toString())}
            </p>
          </div>
          <DisplayAmount amount={Number(expense.expenseAmount)} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}
