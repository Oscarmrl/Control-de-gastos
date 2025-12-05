import React from "react";
import DisplayAmount from "./DisplayAmount";

export default function BudgetTraker() {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <img src="/grafico.jpg" alt="Grafica de gastos" />
      </div>
      <div className=" flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className=" bg-pink-600 w-full rounded-2xl p-2 text-white uppercase"
        >
          Resetear App
        </button>
        <DisplayAmount label="Presupuesto" amount={200} />
        <DisplayAmount label="Disponible" amount={200} />
        <DisplayAmount label="Gastado" amount={200} />
      </div>
    </div>
  );
}
