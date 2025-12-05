import BudgetForm from "./components/BudgetForm";
import BudgetTraker from "./components/BudgetTraker";
import { useBudget } from "./hooks/useBudget";
import { useMemo } from "react";

function App() {
  const { state } = useBudget();

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);
  console.log(state.budget);
  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className=" uppercase text-center font-black text-4xl text-white">
          Planificador de gastos
        </h1>
      </header>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? <BudgetTraker /> : <BudgetForm />}
      </div>
    </>
  );
}

export default App;
