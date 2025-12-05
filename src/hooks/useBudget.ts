import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

export const useBudget = () => {
  const contex = useContext(BudgetContext);
  if (!contex) {
    throw new Error("se necesita el Budget Provider");
  }
  return contex;
};
