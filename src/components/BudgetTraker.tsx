import DisplayAmount from "./DisplayAmount";
import { useBudget } from "../hooks/useBudget";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function BudgetTraker() {
  const { state, totalExpense, remainigBudget, dispatch } = useBudget();

  const percentage = +((totalExpense / state.budget) * 100).toFixed(2);

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: percentage === 100 ? "#DC2626" : "#3b82f6",
            trailColor: "F5f5F5",
            textSize: 10,
            textColor: percentage === 100 ? "#DC2626" : "#3b82f6",
          })}
          text={`${percentage}% Gastado`}
        />
      </div>
      <div className=" flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className=" bg-pink-600 w-full rounded-2xl p-2 text-white uppercase"
          onClick={() => dispatch({ type: "restart-application" })}
        >
          Resetear App
        </button>
        <DisplayAmount label="Presupuesto" amount={state.budget} />
        <DisplayAmount label="Disponible" amount={remainigBudget} />
        <DisplayAmount label="Gastado" amount={totalExpense} />
      </div>
    </div>
  );
}
