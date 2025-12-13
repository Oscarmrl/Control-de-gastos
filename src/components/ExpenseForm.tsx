import { useState } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../Data/Categories";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    expenseAmount: "",
    expenseName: "",
    expenseCategory: "",
    expenseDate: new Date(),
  });

  const { dispatch } = useBudget();

  const [error, setError] = useState("");

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      expenseDate: value,
    });
  };

  const handleChangeGasto = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isAmountField = name === "expenseAmount";

    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(expense).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }
    dispatch({ type: "add-expense", payload: { expense } });

    setExpense({
      expenseAmount: "",
      expenseName: "",
      expenseCategory: "",
      expenseDate: new Date(),
    });
  };

  return (
    <form action="" className=" space-y-5" onSubmit={handleSubmit}>
      <legend className=" uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
        Nuevo Gasto
      </legend>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Añade el nombre del Gasto"
          className="bg-slate-100 p-2 rounded-2xl "
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChangeGasto}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Cantidad Gasto:
        </label>
        <input
          type="number"
          id="expenseAmount"
          placeholder="Añade la cantidad del gasto eje. 300"
          className="bg-slate-100 p-2 rounded-2xl "
          name="expenseAmount"
          value={expense.expenseAmount}
          onChange={handleChangeGasto}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Categoria:
        </label>
        <select
          id="expenseCategory"
          className="bg-slate-100 p-2 rounded-2xl "
          name="expenseCategory"
          value={expense.expenseCategory}
          onChange={handleChangeGasto}
        >
          <option value="">--Seleccione--</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseDate" className="text-xl">
          Fecha Gasto:
        </label>
        <DatePicker
          className=" bg-slate-100 p-2 border-0"
          value={expense.expenseDate}
          onChange={handleChangeDate}
        />
      </div>
      <input
        type="submit"
        className=" bg-blue-600 cursor-pointer w-full rounded-lg p-2 text-white font-bold uppercase"
        value={"Registrar Gasto"}
      />
    </form>
  );
}
